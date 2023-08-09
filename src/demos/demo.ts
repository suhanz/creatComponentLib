import PasswordWidget from '@/components/PasswordWidget'

export default {
  name: 'Demo',
  required: ['pass1'],
  schema: {
    type: 'object',
    title: 'demo',
    properties: {
      firstName: {
        type: 'string',
        title: 'first-name',
        minLength: 3,
        required: true,
      },
      lastName: {
        type: 'string',
        title: 'last-name',
        maxLength: '5',
      },
      color: {
        type: 'string',
        format: 'color',
        title: 'Input Color',
      },
      pass1: {
        type: 'string',
        test: true,
        title: 'password',
        require: true,
        placeholder: '请输入您的密码',
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: 're try password',
        placeholder: '输入框案例',
      },
    },
  },

  async customValidate(data: any, errors: any) {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        if (data.pass1 !== data.pass2) {
          errors.pass2.addError('密码必须相同')
        }
        resolve()
      }, 0)
    })
  },
  uiSchema: {
    properties: {
      pass1: {
        widget: PasswordWidget,
      },
      pass2: {
        color: 'red',
      },
    },
  },
  default: 1,
}
