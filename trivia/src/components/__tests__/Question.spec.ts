import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import QuestionItem from '../Question.vue'

describe('QuestionItem', () => {
  const question = {
    question: 'What is the capital of France?',
    correct_answer: 'Paris',
    incorrect_answers: ['London', 'Berlin', 'Madrid']
  }

  it('renders the question and answers', () => {
    const wrapper = mount(QuestionItem, {
      props: { question }
    })

    const questionText = wrapper.find('p')
    expect(questionText.text()).toBe(question.question)

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(4)
    const answers = buttons.map((button) => button.text())
    expect(answers).toContain(question.correct_answer)
    expect(answers).toEqual(expect.arrayContaining(question.incorrect_answers))
  })

  it('emits select event when an answer is clicked', async () => {
    const wrapper = mount(QuestionItem, {
      props: { question }
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')

    expect(wrapper.emitted()).toHaveProperty('select')
    expect(wrapper.emitted('select')?.[0]).toEqual([buttons[0].text()])
  })

  it('applies the correct class for the selected correct answer', async () => {
    const wrapper = mount(QuestionItem, {
      props: { question, selectedAnswer: 'Paris' }
    })

    const buttons = wrapper.findAll('button')
    const correctButton = buttons.find((button) => button.text() === 'Paris')
    expect(correctButton?.classes()).toContain('correct-answer')
  })

  it('applies the correct class for the selected wrong answer', async () => {
    const wrapper = mount(QuestionItem, {
      props: { question, selectedAnswer: 'London' }
    })

    const buttons = wrapper.findAll('button')
    const wrongButton = buttons.find((button) => button.text() === 'London')
    expect(wrongButton?.classes()).toContain('wrong-answer')
  })
})
