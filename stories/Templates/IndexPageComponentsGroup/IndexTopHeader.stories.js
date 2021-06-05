import IndexTopHeader from '@/components/Templates/IndexPageComponentsGroup/IndexTopHeader'

export default {
  title: 'Templates/IndexPage/TopHeader',
  component: IndexTopHeader,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { IndexTopHeader },
  template: `<index-top-header v-bind='$props'/>`,
})

export const Default = Template.bind({})
