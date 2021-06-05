import PageLogin from '@/components/Pages/PageLogin'

export default {
  title: 'Pages/Login',
  component: PageLogin,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    PageLogin,
  },
  template: '<page-login v-bind="$props" />',
})

export const Default = Template.bind({})
