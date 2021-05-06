import Notification from '../../components/Atoms/Notification/Notification'

export default {
  title: 'Atoms/Notification/Alerts',
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
  components: { Notification },
  props: Object.keys(argTypes),
  data() {
    return {
      show: true,
    }
  },
  methods: {
    handleClose() {
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 1000)
    },
  },
  template:
    '<notification v-bind="$props" :should-show="show" @onClose="handleClose" />',
})

export const Info = Template.bind({})
Info.args = {
  title: 'Just to know',
  type: 'info',
}

export const Success = Template.bind({})
Success.args = {
  title: 'All good!',
  type: 'success',
}

export const Error = Template.bind({})
Error.args = {
  title: 'Oops, something went wrong',
  type: 'error',
}

export const WithDescription = Template.bind({})
WithDescription.args = {
  title: 'All good!',
  description: 'You will be redirect in a second.',
  type: 'success',
}

export const WithCloseOption = Template.bind({})
WithCloseOption.args = {
  title: 'All good!',
  type: 'success',
  description: 'You will be redirect in a second.',
  allowClose: true,
  lifeTime: 12,
}

export const WithActionDefault = Template.bind({})
WithActionDefault.args = {
  type: 'info',
  actionRequired: true,
  title: 'Confirmation!',
  description: 'Are you sure to delete this task ?',
}

export const WithActionCustomText = Template.bind({})
WithActionCustomText.args = {
  type: 'info',
  actionRequired: true,
  title: 'Confirmation!',
  description: 'Are you sure to delete this task ?',
  actionText: 'Yes i do',
}
