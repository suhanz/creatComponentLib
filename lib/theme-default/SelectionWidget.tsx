import { defineComponent, ref, watch } from 'vue'
import { SelectionWidgetPropsDefine } from '../types'
import type { SelectionWidgetDefine } from '../types'
import { withFormItem } from './FormItem'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  select: {
    padding: '8px',
    marginLeft: '16px',
    marginBottom: '8px',
    display: 'block',
  },
})
const Selection: SelectionWidgetDefine = withFormItem(
  defineComponent({
    name: 'SelectionWidget',
    props: SelectionWidgetPropsDefine,
    setup(props) {
      const classRef = useStyles()
      const currentValueRef = ref(props.value)

      watch(currentValueRef, (newValue, oldValue) => {
        if (newValue !== props.value) {
          props.onChange(newValue)
        }
      })
      watch(
        () => props.value,
        (value) => {
          if (value !== currentValueRef.value) {
            currentValueRef.value = value
          }
        },
      )

      return () => {
        const { options } = props
        const classes = classRef.value
        return (
          <div>
            <select
              class={classes.select}
              multiple={true}
              v-model={currentValueRef.value}
            >
              {options.map((op) => (
                <option value={op.value}>{op.key}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="选择后的值为"
              value={currentValueRef.value}
            />
          </div>
        )
      }
    },
  }),
) as any
export default Selection
