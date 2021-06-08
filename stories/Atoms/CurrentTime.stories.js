import CurrentTime from '../../components/Atoms/CurrentTime'

export default {
  title: 'Atoms/CurrentTime',
  component: CurrentTime,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CurrentTime },
  computed: {
    shouldStack() {
      return args.isLayoutStacked
    },
  },
  template: `
    <div :class="shouldStack && 'w-16'">
      <current-time v-bind="$props"/>
    </div>`,
})

export const AmPmDefault = Template.bind({})

export const AmPmDefaultEurope = Template.bind({})

export const NotAmPm = Template.bind({})

export const StackedAmPm = Template.bind({})
StackedAmPm.args = {
  isLayoutStacked: true,
}

export const StackedNotAmPm = Template.bind({})
StackedNotAmPm.args = {
  isLayoutStacked: true,
}
