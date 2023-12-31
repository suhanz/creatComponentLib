import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '../types'

import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  container: {},
  label: {
    display: 'block',
    color: '#777',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    margin: '5px 0',
    padding: 0,
    paddingLeft: 20,
  },
})

const FormItem = defineComponent({
  name: 'FormItem',
  props: CommonWidgetPropsDefine,
  setup(props, { slots }) {
    const classRef = useStyles()
    return () => {
      const { schema, errors } = props
      console.log('kkkkkkk', props)
      const classes = classRef.value
      return (
        <div class={classes.container}>
          <label class={classes.label}>{schema?.title}</label>
          {slots.default && slots.default()}
          <ul class={classes.errorText}>
            {errors?.map((err) => (
              <li>{err}</li>
            ))}
          </ul>
        </div>
      )
    }
  },
})

// 将FormItem 加到每一个widget上，对应field上都要加新增的props,props或者内容变了都要改，耦合度高
// 高阶组件，解耦，
export function withFormItem(Widget: any) {
  return defineComponent({
    name: `Wrapped${Widget.name}`,
    props: CommonWidgetPropsDefine,
    setup(props, { attrs }) {
      return () => {
        // console.log('--props--', props)

        // if (props.schema?.format == 'color') {
        // }

        return (
          <FormItem {...props}>
            <Widget {...props} {...attrs} />
          </FormItem>
        )
      }
    },
  }) as any
}

export default FormItem
