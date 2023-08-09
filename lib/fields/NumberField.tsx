import { FiledPropsDefine, CommonWidgetNames } from '../types'
import { defineComponent } from 'vue'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'NumberFeild',
  props: FiledPropsDefine,
  setup(props) {
    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget)
    const handleChange = (v: string) => {
      const num = Number(v)

      if (Number.isNaN(num)) {
        props.onChange(undefined)
      } else {
        props.onChange(num)
      }
    }

    return () => {
      const NumberWidget = NumberWidgetRef.value
      const { schema, rootSchema, errorSchema, ...rest } = props
      return (
        <NumberWidget
          errors={errorSchema.__errors}
          schema={schema}
          {...rest}
          onChange={handleChange}
        />
      )
      // return <input value={value as any} type="number" onInput={handleChange} />
    }
  },
})
