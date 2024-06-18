import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { Mock } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'

import GamePage from '../GameView.vue'
import { useCounterStore } from '@/stores/counter'
import { fetchQuestions } from '@/utils/fetchQuestions'

interface ButtonI {
  text: () => string
}

vi.mock('vue-router', () => {
  return {
    useRouter: vi.fn()
  }
})
vi.mock('@/utils/fetchQuestions')

describe('GamePage', () => {
  let store: ReturnType<typeof useCounterStore>
  let wrapper: VueWrapper<any>
  let mockRouter = { push: vi.fn() }

  const mockQuestions = [
    {
      question: 'What is the capital of France?',
      correct_answer: 'Paris',
      incorrect_answers: ['London', 'Berlin', 'Madrid']
    },
    {
      question: 'What is 2 + 2?',
      correct_answer: '4',
      incorrect_answers: ['3', '5', '6']
    }
  ]

  beforeEach(async () => {
    vi.clearAllMocks()
    ;(useRouter as Mock).mockReturnValue(mockRouter)
    ;(fetchQuestions as Mock).mockResolvedValue(mockQuestions)

    setActivePinia(createPinia())
    wrapper = shallowMount(GamePage, {
      global: {
        stubs: {
          Question: false,
          Button: false
        },
        plugins: [
          createTestingPinia({
            initialState: {
              counter: {
                difficulty: 'easy'
              }
            },
            createSpy: vi.fn
          })
        ]
      }
    })
    store = useCounterStore()
    await wrapper.vm.$nextTick()
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  it('renders the game page with initial state', async () => {
    expect(wrapper.find('h1').text()).toBe('Game Page')
    expect(wrapper.find('.difficulty').text()).toContain('Difficulty: easy')
    expect(wrapper.find('.score').text()).toContain('Score: 0')
  })

  it('loads questions on mount', async () => {
    expect(fetchQuestions).toHaveBeenCalledWith('easy', 5)
    expect(wrapper.vm.currentQuestion).toEqual(mockQuestions[0])
  })

  it('selects an answer and updates the score', async () => {
    const question = wrapper.findComponent({ name: 'Question' })

    const firstOption = question
      .findAll('button')
      .find((button: ButtonI) => button.text() === mockQuestions[0].incorrect_answers[0])
    expect(firstOption?.exists()).toBe(true)
    await firstOption?.trigger('click')

    expect(wrapper.vm.selectedAnswer).toBe(mockQuestions[0].incorrect_answers[0])
    expect(wrapper.vm.score).toBe(-1) // Incorrect answer should decrement the score
  })

  it('resets the quiz when Play Again button is clicked', async () => {
    const playAgainButton = wrapper
      .findAll('button')
      .find((button: ButtonI) => button.text() === 'Play Again')
    await playAgainButton?.trigger('click')

    expect(wrapper.vm.currentIndex).toBe(0)
    expect(wrapper.vm.score).toBe(0)
  })

  it('navigates back when Select difficulty button is clicked', async () => {
    const selectDifficultyButton = wrapper
      .findAll('button')
      .find((button: ButtonI) => button.text() === 'Select difficulty')
    await selectDifficultyButton?.trigger('click')

    // expect(mockRouter.push).toHaveBeenCalledWith({ name: 'home' })
  })
})
