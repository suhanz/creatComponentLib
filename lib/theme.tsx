// 将写在schemaForm里的逻辑提取出来，实现theme和schemaForm的解耦
// const context:any{
//     SchemaItem,
//     theme:props.theme
// }
import {
  ComputedRef,
  PropType,
  computed,
  defineComponent,
  inject,
  provide,
  ref,
  ExtractPropTypes,
} from 'vue'
import {
  Theme,
  SelectionWidgetNames,
  CommonWidgetNames,
  UISchema,
  CommonWidgetDefine,
  FiledPropsDefine,
} from './types'
import { isObject } from './utils'
import { useVJSFContext } from './context'

const THEME_PROVIDER_KEY = Symbol()
const ThemeProvider = defineComponent({
  name: 'VJSFThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      // require: true,
    },
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme) // 实现响应式更新
    provide(THEME_PROVIDER_KEY, context)
    return () => {
      return slots.default && slots.default()
    } // 在app.tsx中作为默认插槽传到themeProvider,这里渲染
  },
})
// 提供一些工具函数让我们更方便调用这些组件
// getWidget 函数是在具体的field组件里具体使用
export function getWidget<T extends SelectionWidgetNames | CommonWidgetNames>(
  name: T,
  props?: ExtractPropTypes<typeof FiledPropsDefine>,
) {
  const formContext = useVJSFContext()
  if (props) {
    const { schema, uiSchema } = props
    if (uiSchema?.widget && isObject(uiSchema.widget)) {
      return ref(uiSchema.widget as CommonWidgetDefine)
    }
    if (schema.format) {
      if (formContext.formatMapRef.value[schema.format]) {
        return ref(formContext.formatMapRef.value[schema.format])
      }
    }
  }
  const context: ComputedRef<Theme> | undefined = // inject也有可能返回undefined
    inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY) // 获取 inject 注入，如果是undefined报错
  if (!context) {
    throw new Error('VJSF theme required')
  }
  const widgetRef = computed(() => {
    // 响应式
    return context.value.widgets[name]
  })
  return widgetRef
}
export default ThemeProvider
