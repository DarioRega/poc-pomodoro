import PageLogin from '@/components/Pages/PageLogin'

export default {
  title: 'Pages/Login',
  component: PageLogin,
  argTypes: {
    isDisabled: {
      control: { type: 'select', options: [true, false] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    PageLogin,
  },
  data() {
    return {
      getLabels: {
        greeting: 'Welcome back',
        email: 'Enter your email to continue',
        password: 'Enter your password to log in',
        lostEmail: 'I lost my email',
        lostPassword: 'I lost my password',
        emailError: 'Invalid email',
        emptyField: "Field can't be empty",
        loading: 'Loading your environment',
        continue: 'Continue',
        login: 'Log In',
        register: 'Sign up instead',
        cantLogin: "Can't log in ?",
        placeholders: {
          email: 'Email',
          password: 'Password',
        },
      },
    }
  },
  template: '<page-login v-bind="$props" :labels="getLabels" />',
})

export const Default = Template.bind({})
