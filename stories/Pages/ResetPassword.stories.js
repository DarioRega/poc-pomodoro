import PageResetPassword from '@/components/Pages/PageResetPassword'

export default {
  title: 'Pages/ResetPassword',
  component: PageResetPassword,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    PageResetPassword,
  },
  template: '<page-reset-password v-bind="$props"  />',
})

export const Default = Template.bind({})
