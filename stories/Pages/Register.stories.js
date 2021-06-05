import PageRegister from '@/components/Pages/PageRegister'

export default {
  title: 'Pages/Register',
  component: PageRegister,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    PageRegister,
  },
  template: '<page-register v-bind="$props" />',
})

export const Default = Template.bind({})
