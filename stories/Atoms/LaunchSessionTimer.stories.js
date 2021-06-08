import LaunchSessionTimer from '@/components/Atoms/LaunchSessionTimer'

export default {
  title: 'Atoms/LaunchSessionTimer',
  component: LaunchSessionTimer,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LaunchSessionTimer },
  template: '<launch-session-timer v-bind="$props" />',
})

export const Default = Template.bind({})
