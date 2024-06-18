import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import Button from '../Button.vue'

describe('Button', () => {
  it('renders with default props', () => {
    const wrapper = mount(Button)
    const button = wrapper.find('button')

    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Play again')
    expect(button.attributes('disabled')).toBe(undefined)
  })

  it('renders with custom props', () => {
    const wrapper = mount(Button, {
      props: {
        buttonText: 'Try again',
        isDisabled: true
      }
    })
    const button = wrapper.find('button')

    expect(button.text()).toBe('Try again')
    expect(button.attributes()).toHaveProperty('disabled')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button)
    const button = wrapper.find('button')

    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        isDisabled: true
      }
    })
    const button = wrapper.find('button')

    await button.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
