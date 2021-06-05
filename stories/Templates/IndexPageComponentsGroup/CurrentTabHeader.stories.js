import CurrentTabHeader from '@/components/Templates/IndexPageComponentsGroup/CurrentTabHeader'

export default {
  title: 'Templates/IndexPage/CurrentTabHeader',
  component: CurrentTabHeader,
  argType: {
    currentTabName: {
      control: {
        type: 'text',
      },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CurrentTabHeader },
  template: `<current-tab-header v-bind='$props'/>`,
})

export const Default = Template.bind({})
Default.args = {
  currentTabName: 'All Tasks',
}
