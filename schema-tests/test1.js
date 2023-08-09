//  Node.js require
const Ajv = require('ajv')
// const addFormats = require('ajv-formats')
const ajv = new Ajv()
// addFormats(ajv)

// format 只针对于string/number才有
// 自定义format，扩展
// ajv.addFormat('test', (data) => {
//   console.log('dadadad', data)
//   return data === 'haha'
// })

// 自定义关键字1:valiadation
// ajv.addKeyword({
//   keyword: 'test',
//   validate(schema) {
//     console.log(schema)
//     if (schema === true) return true
//     else return schema.length === 6
//   },
// })
// 自定义关键字2compile ==》传入compile方法，在调用ajv.compile时被调用
// ajv.addKeyword({
//   keyword: 'test',
//   compile: function (sch, parentSchema) {
//     console.log(sch, parentSchema)
//     // return 一个函数该函数可根据compile里传参返回不同的结构，这个函数就是validate数据校验的函数
//     return () => true
//   },
//   metaSchema: {
//     // 定义的是关键字（test）与接收的值
//     type: 'boolean',
//   },
// })

// 自定义关键字3 macor，可以用来写一些通用的schema
ajv.addKeyword({
  keyword: 'test',
  macro() {
    return {
      minLength: 10, // 相当于添加到应用(name)里的规则校验
    }
  },
})
// const schema = {
//   type: 'string',
//   minLength: 10,
// }
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      //   format: 'email',
      //   format: 'test',  // 使用自定义format
      test: true, // 使用自定义关键字
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
      },
      //   items: [
      //     {
      //       type: 'string',
      //     },
      //     {
      //       type: 'number',
      //     },
      //   ],
    },
    isWorker: {
      type: 'boolean',
    },
  },
  required: ['name', 'age'],
}

const validate = ajv.compile(schema)
const valid = validate({
  name: '12',
  age: 18,
  pets: ['mini', '12'],
})
if (!valid) console.log(validate.errors)
