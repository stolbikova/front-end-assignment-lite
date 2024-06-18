import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import Modal from '../Modal.vue'

describe('Modal.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(Modal, {
      propsData: {
        show: true
      },
      slots: {
        default: '<p>Modal content</p>'
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the modal content when show is true', () => {
    expect(wrapper.text()).toContain('Modal content')
  })

  it('emits close event when close icon is clicked', async () => {
    await wrapper.find('.close-icon').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('does not close modal content when clicked inside', async () => {
    await wrapper.find('.modal-content').trigger('click')
    expect(wrapper.emitted().close).toBeFalsy()
  })

  it('emits close event when clicking outside the modal content', async () => {
    await wrapper.find('.modal-overlay').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
