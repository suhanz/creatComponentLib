// import { mount } from '@vue/test-utils'
// import { defineComponent } from 'vue'
// import JsonSchemaForm, { NumberField, StringField } from '../../lib'

// describe('ObjectField', () => {
//   it('should render properties to correct fields', async () => {
//     interface Value {
//       name?: string
//       age?: number
//     }
//     let value: Value = {
//       name: '',
//       age: 0,
//     }

//     const wrapper = mount(JsonSchemaForm, {
//       props: {
//         schema: {
//           type: 'object',
//           properties: {
//             name: {
//               type: 'string',
//             },
//             age: {
//               type: 'number',
//             },
//           },
//         },
//         value: value,
//         onChange: (v: object) => {
//           value = v
//         },
//       },
//     })
//     const strField = wrapper.findComponent(StringField)
//     const numberField = wrapper.findComponent(NumberField)
//     // expect(strField.exists()).toBeTruthy()
//     // expect(numberField.exists()).toBeTruthy()
//     await strField.props('onChange')('lisa')
//     console.log('value', value.name)
//     expect(value.name).toBe('lisa')
//     await numberField.props('onChange')(1)
//     expect(value.age).toEqual(1)
//   })
// })
