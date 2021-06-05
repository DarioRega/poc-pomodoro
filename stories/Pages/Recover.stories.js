import PageRecover from '@/components/Pages/PageRecover'

export default {
  title: 'Pages/Recovery',
  component: PageRecover,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    PageRecover,
  },
  template: '<page-recover v-bind="$props"  />',
})

export const Default = Template.bind({})
