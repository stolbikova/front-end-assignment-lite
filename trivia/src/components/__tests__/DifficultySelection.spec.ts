import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import DifficultySelection from '../DifficultySelection.vue'

describe('DifficultySelection', () => {
  it('renders difficulty buttons', () => {
    const wrapper = mount(DifficultySelection)
    const buttons = wrapper.findAll('.difficulty-button')

    expect(buttons.length).toBe(3)
    expect(buttons[0].text()).toBe('Easy')
    expect(buttons[1].text()).toBe('Medium')
    expect(buttons[2].text()).toBe('Hard')
  })

  it('selects a difficulty when a button is clicked', async () => {
    const wrapper = mount(DifficultySelection)
    const buttons = wrapper.findAll('.difficulty-button')

    await buttons[1].trigger('click')

    expect(buttons[1].classes()).toContain('selected')
    expect(wrapper.emitted('difficultySelected')).toBeTruthy()
    expect(wrapper.emitted('difficultySelected')?.[0]).toEqual(['Medium'])
  })

  it('emits the correct event when a difficulty is selected', async () => {
    const wrapper = mount(DifficultySelection)
    const buttons = wrapper.findAll('.difficulty-button')

    await buttons[2].trigger('click')

    expect(wrapper.emitted()).toHaveProperty('difficultySelected')
    expect(wrapper.emitted('difficultySelected')?.[0]).toEqual(['Hard'])
  })

  it('changes selection when another button is clicked', async () => {
    const wrapper = mount(DifficultySelection)
    const buttons = wrapper.findAll('.difficulty-button')

    await buttons[0].trigger('click')
    expect(buttons[0].classes()).toContain('selected')
    expect(wrapper.emitted('difficultySelected')?.[0]).toEqual(['Easy'])

    await buttons[2].trigger('click')
    expect(buttons[0].classes()).not.toContain('selected')
    expect(buttons[2].classes()).toContain('selected')
    expect(wrapper.emitted('difficultySelected')?.[1]).toEqual(['Hard'])
  })
})
