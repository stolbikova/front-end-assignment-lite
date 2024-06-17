import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import type { Mock } from 'vitest'
import { useRouter } from 'vue-router'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'

import HomePage from '../HomeView.vue'
import { useCounterStore } from '@/stores/counter'

vi.mock('vue-router', () => {
  return {
    useRouter: vi.fn()
  }
})

describe('HomePage', () => {
  let store: any
  let wrapper: any
  let mockRouter = { push: vi.fn() }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRouter as Mock).mockReturnValue(mockRouter)
    setActivePinia(createPinia())

    wrapper = shallowMount(HomePage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              difficulty: 'easy'
            },
            createSpy: vi.fn
          })
        ]
      }
    })
    store = useCounterStore()
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  it('renders the home page with initial state', () => {
    expect(wrapper.find('p').text()).toContain('Selected Difficulty: easy')
    expect(wrapper.findComponent({ name: 'DifficultySelection' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Button' }).exists()).toBe(true)
  })

  it('updates difficulty when difficulty is selected', async () => {
    const difficultySelection = wrapper.findComponent({ name: 'DifficultySelection' })

    await difficultySelection.vm.$emit('difficultySelected', 'hard')

    expect(store.setDifficulty).toHaveBeenCalledWith('hard')
  })

  it('navigates to game page when Play button is clicked', async () => {
    const wrapper = mount(HomePage)

    const playButton = wrapper.findComponent({ name: 'Button' })
    await playButton.trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'game' })
  })
})
