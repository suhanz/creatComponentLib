//  Node.js require
const Ajv = require('ajv')
// 在ajv中转换错误语言，自定义关键字，自定义错误信息
const localize = require('ajv-i18n')
// const addFormats = require('ajv-formats')
// addFormats(ajv)
const ajv = new Ajv({ allErrors: true, jsonPointers: true })
// 自定义关键字1
require('ajv-errors')(ajv)
ajv.addKeyword({
  keyword: 'test',
  macro() {
    return {
      minLength: 10, // 相当于添加到应用(name)里的规则校验
    }
  },
  // validate: function fun(schema, data) {
  //   fun.errors = [
  //     {
  //       instancePath: '/name',
  //       schemaPath: '#/properties/name/test',
  //       keyword: 'test',
  //       params: {},
  //       message: 'hello error message',
  //     },
  //   ]
  //   return false
  // },
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
      //   test: true, // 使用自定义关键字
      errorMessage: {
        type: '必须是字符串',
        minLength: '长度不能小于10',
      },
      minLength: 10,
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    isWorker: {
      type: 'boolean',
    },
  },
  required: ['name', 'age'],
}

const validate = ajv.compile(schema)
const valid = validate({
  name: 'haha',
  age: 11,
  pets: ['lll', '12'],
  isWorker: true,
})

if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}
