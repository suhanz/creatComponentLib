import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { NumberField } from '../../lib'
import TestComponent from './utils/TestComponent'

describe('TestComponent', () => {
  it('should render correct number field', async () => {
    let value = ''
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'number',
        },
        value: value,
        onChange: (v: string) => {
          value = v
        },
      },
    })
    const NumberFiled1 = wrapper.findComponent(NumberField)
    expect(NumberFiled1.exists()).toBeTruthy()
  })
})
