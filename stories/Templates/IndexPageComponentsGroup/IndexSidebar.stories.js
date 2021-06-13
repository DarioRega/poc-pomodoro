import IndexSidebar from '@/components/Templates/IndexPageComponentsGroup/IndexSidebar'

export default {
  title: 'Templates/IndexPage/Sidebar',
  component: IndexSidebar,
  argType: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { IndexSidebar },
  template: `<index-sidebar v-bind='$props' /> `,
})

export const Default = Template.bind({})
