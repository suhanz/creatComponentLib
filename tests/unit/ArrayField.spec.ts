import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import TestComponent from './utils/TestComponent'
import JsonSchemaForm, {
  NumberField,
  StringField,
  SelectionWidget,
  ArrayField,
} from '../../lib'
/**
 * 测试三种用例：1.多种数组类型会渲染成多种类型节点
 * 2.单类型确定长度：ArrayItemWrapper(增删改查)
 * 3.多选：selectionWidget
 */
describe('ArrayField', () => {
  it('should render multi type', () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        theme: {},
        value: [],
        onChange: () => {
          console.log('arrayField')
        },
      },
    })
    // const arr = wrapper.findComponent(ArrayField)
    // const str = arr.findComponent(StringField)
    // const num = arr.findComponent(NumberField)
    // expect(str.exists()).toBeTruthy()
    // expect(num.exists()).toBeTruthy()
  })
})
