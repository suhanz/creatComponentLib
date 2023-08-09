import {
  defineComponent,
  PropType,
  provide,
  Ref,
  shallowRef,
  watch,
  watchEffect,
  ref,
  computed,
} from 'vue'
import {
  Schema,
  UISchema,
  CustomFormat,
  CommonWidgetDefine,
  CustomKeyword,
} from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
import Ajv, { Options } from 'ajv'
import { validateFormData, ErrorSchema } from './validator'
import styles from './theme-default/commonStyle'

type A = typeof SchemaItem
interface ContextRef {
  doValidate: () => Promise<{
    errors: any[]
    valid: boolean
  }>
}

const defaultAjvOptions: Options = {
  allErrors: true,
  // jsonPointers: true,
} as any
export default defineComponent({
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
    // 传方法
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
    // 实现ajv校验
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String,
      default: 'zh',
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
    },
    uiSchema: {
      type: Object as PropType<UISchema>,
    },
    customFormats: {
      type: [Array, Object] as PropType<CustomFormat | CustomFormat[]>,
    },
    customKeywords: {
      type: [Array, Object] as PropType<CustomKeyword | CustomKeyword[]>,
    },
  },
  name: 'SchemaForm',
  setup(props, { slots, emit, attrs }) {
    const classesRef = styles()
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})
    const handleChange = (v: any) => {
      props.onChange(v)
    }
    // 可能存在问题
    const validatorRef: Ref<Ajv> = shallowRef() as any
    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats]
        customFormats.forEach((format) => {
          validatorRef.value.addFormat(format.name, format.definition)
        })
      }
      // 在生成instance的时候注册上去
      if (props.customKeywords) {
        const customKeywords = Array.isArray(props.customKeywords)
          ? props.customKeywords
          : [props.customKeywords]
        customKeywords.forEach((keyword) =>
          validatorRef.value.addKeyword(keyword.name, keyword.deinition as any),
        )
      }
    })

    const validateResolveRef = ref() // 保存返回校验结果的方式，而不是直接返回
    const validateIndex = ref(0) // index记录每次调validateFormData的上下文，index用来标记每次validate的值
    watch(
      () => props.value,
      () => {
        if (validateResolveRef.value) {
          doValidate()
        }
      },
      { deep: true },
    )
    async function doValidate() {
      const index = (validateIndex.value += 1)
      const result = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate,
      )
      if (index !== validateIndex.value) return // 说明中间值已经发生改变，所以之前的结果已经不需要
      errorSchemaRef.value = result.errorSchema
      validateResolveRef.value(result)
      validateResolveRef.value = undefined
    }
    watch(
      () => props.value,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            async doValidate() {
              const result = (await validateFormData(
                validatorRef.value,
                props.value,
                props.schema,
                props.locale,
                props.customValidate,
              )) as any
              errorSchemaRef.value = result.errorSchema
              return result
            },
          }
        }
      },
      {
        immediate: true,
      },
    )
    const formatMapRef = computed(() => {
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats]
        return customFormats.reduce((result, format) => {
          result[format.name] = format.component
          return result
        }, {} as { [key: string]: CommonWidgetDefine })
      } else {
        return {}
      }
    })
    // 通过context向下提供
    const transformSchemaRef = computed(() => {
      if (props.customKeywords) {
        const customKeywords = Array.isArray(props.customKeywords)
          ? props.customKeywords
          : [props.customKeywords]

        return (schema: Schema) => {
          let newSchema = schema
          customKeywords.forEach((keyword) => {
            if ((newSchema as any)[keyword.name]) {
              newSchema = keyword.transformSchema(schema)
            }
          })
          return newSchema
        }
      }
      return (s: Schema) => s
    })

    const context: any = {
      SchemaItem,
      formatMapRef,
      transformSchemaRef,
    }

    provide(SchemaFormContextKey, context)

    return () => {
      const { schema, value, uiSchema } = props
      const useStyles = classesRef.value
      return (
        <div>
          <div v-if={schema.title} class={useStyles.title}>
            {schema.title}
          </div>
          <SchemaItem
            schema={schema}
            rootSchema={schema}
            value={value}
            onChange={handleChange}
            uiSchema={uiSchema || {}}
            errorSchema={errorSchemaRef.value || {}}
          />
        </div>
      )
    }
  },
})
