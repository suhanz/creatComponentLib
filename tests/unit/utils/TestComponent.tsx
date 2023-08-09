// 将测试渲染的目标组件封装一下，更好的测试

import { PropType, defineComponent } from 'vue'
import defaultTheme from '../../../lib/theme-default'
import JsonSchemaForm, { Schema, ThemeProvider } from '../../../lib'
// 该组件是为了简化代码
export const ThemeDefaultProvider = defineComponent({
  setup(p, { slots }) {
    return () => {
      ;<ThemeProvider theme={defaultTheme}>
        {slots.default && slots.default()}
      </ThemeProvider>
    }
  },
})
export default defineComponent({
  name: 'TestComponent',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      ;<ThemeDefaultProvider>
        <JsonSchemaForm {...props}></JsonSchemaForm>
      </ThemeDefaultProvider>
      // ;<ThemeProvider theme={defaultTheme}>
      //   <JsonSchemaForm {...props}></JsonSchemaForm>
      // </ThemeProvider>
    }
  },
})
