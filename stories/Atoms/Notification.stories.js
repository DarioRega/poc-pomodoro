import Notification from '../../components/Atoms/Notification/Notification'

export default {
  title: 'Atoms/Notification',
  component: Notification,
  argTypes: {
    type: {
      control: { type: 'select', options: ['info', 'success', 'error'] },
    },
    allowClose: {
      control: { type: 'radio', options: [true, false] },
    },
    lifeTime: {
      control: { type: 'number', defaultValue: 6 },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Notification },
  template: '<notification v-bind="$props" />',
})

export const Default = Template.bind({})
Default.args = {
  title: 'Default notification',
  shouldShow: true,
}

export const Info = Template.bind({})
Info.args = {
  shouldShow: true,
  title: 'Just to know',
  type: 'info',
}

export const Success = Template.bind({})
Success.args = {
  shouldShow: true,
  title: 'All good!',
  type: 'success',
}

export const Error = Template.bind({})
Error.args = {
  shouldShow: true,
  title: 'Oops, something went wrong',
  type: 'error',
}

export const WithDescription = Template.bind({})
WithDescription.args = {
  shouldShow: true,
  title: 'All good!',
  description: 'You will be redirect in a second.',
  type: 'success',
}

export const WithCloseOption = Template.bind({})
WithCloseOption.args = {
  shouldShow: true,
  title: 'Continue',
  type: 'info',
  allowClose: true,
  lifeTime: 12,
}
