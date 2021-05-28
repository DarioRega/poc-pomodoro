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
  data() {
    return {
      getLabels: {
        greeting: 'Welcome',
        additionalInfo: 'Fill these steps to create an account',
        emailError: 'Invalid email',
        passwordError: 'Password too short',
        fullNameError: "Full name can't be that short",
        confirmPasswordError: "Passwords don't match",
        emptyField: "Field can't be empty",
        loading: 'Loading your environment',
        register: 'Sign up',
        alreadyHaveAnAccount: 'Already have an account ? Log in',
        placeholders: {
          fullName: 'Enter full name',
          email: 'Enter email',
          password: 'Create password',
          confirmPassword: 'Confirm password',
        },
      },
    }
  },
  template: '<page-register v-bind="$props" :labels="getLabels" />',
})

export const Default = Template.bind({})
