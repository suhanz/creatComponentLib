import { defineComponent, computed, ref } from 'vue'
import { CustomFormat, CommonWidgetPropsDefine } from '../../lib/types'

import { withFormItem } from '../../lib/theme-default/FormItem'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  btn: {
    border: '1px solid #999999',
    borderRadius: '8px',
    padding: '2px',
    margin: '8px',
    '&:hover': {
      background: '#cbc8c8',
    },
  },
})
const format: CustomFormat = {
  name: 'color',
  definition: {
    type: 'string',
    validate: /^#[0-9A-Fa-f]{6}$/,
  },
  component: withFormItem(
    defineComponent({
      name: 'ColorWidget',
      props: CommonWidgetPropsDefine,
      setup(props) {
        const classesRef = useStyles()
        let curColorRef: string
        const handleChange = (e: any) => {
          curColorRef = e.target.value
          const value = e.target.value
          e.target.value = props?.value
          props.onChange(value)
        }

        const styleRef = computed(() => {
          return {
            color: (props.options && props.options.color) || 'black',
          }
        })

        return () => {
          const classes = classesRef.value
          return (
            <div>
              <input
                type="color"
                value={props.value as any}
                onInput={handleChange}
                style={styleRef.value}
              />
              <button class={classes.btn}>应用颜色</button>
            </div>
          )
        }
      },
    }),
  ),
}

export default format
