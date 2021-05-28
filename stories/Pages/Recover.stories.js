import PageRecover from '@/components/Pages/PageRecover'

export default {
  title: 'Pages/Recovery',
  component: PageRecover,
  argTypes: {
    isDisabled: {
      control: { type: 'select', options: [true, false] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    PageRecover,
  },
  data() {
    return {
      getLabels: {
        greeting: "Can't log in ?",
        sendRecoveryLinkTo: "We'll send a recovery link to",
        successProcessSendRecoveryLinkTo: 'We sent a recovery link to you at',
        resendRecoveryLink: 'Resend recovery link',
        emailError: 'Invalid email',
        emptyField: "Field can't be empty",
        loading: 'Loading your environment',
        sendRecoveryLink: 'Send recovery link',
        returnToLogin: 'Return to log in',
        register: 'Sign up instead',
        cantLogin: "Can't log in ?",
        placeholders: {
          email: 'Enter email',
        },
      },
    }
  },
  template: '<page-recover v-bind="$props" :labels="getLabels" />',
})

export const Default = Template.bind({})
