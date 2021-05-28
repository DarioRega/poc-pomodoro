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
  data() {
    return {
      getLabels: {
        greeting: 'Reset my password',
        additionalInfo: "Fill these fields and you're good to go",
        emailError: 'Invalid email',
        passwordError: 'Password too short',
        confirmPasswordError: "Passwords don't match",
        emptyField: "Field can't be empty",
        loading: 'Loading your environment',
        alreadyHaveAnAccount: 'Already have an account ? Log in',
        placeholders: {
          email: 'Enter email',
          password: 'Set new password',
          confirmPassword: 'Confirm new password',
        },
      },
    }
  },
  template: '<page-reset-password v-bind="$props" :labels="getLabels" />',
})

export const Default = Template.bind({})
