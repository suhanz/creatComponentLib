import { CommonWidgetDefine, CommonWidgetPropsDefine } from '../types'
import { defineComponent, computed } from 'vue'
import { withFormItem } from './FormItem'

const TextWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'TextWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      console.log('-props--', props)
      const handleChange = (e: any) => {
        const value = e.target.value
        e.target.value = props.value
        props.onChange(value)
      }
      const styleRef = computed(() => {
        return {
          color: props.options?.color || 'black',
        }
      })
      return () => {
        const { value } = props
        return (
          <input
            type="text"
            value={value as any}
            placeholder={props.schema?.placeholder}
            onInput={handleChange}
            style={styleRef.value}
          />
        )
      }
    },
  }),
) as any
export default TextWidget
