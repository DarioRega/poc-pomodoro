import IconButton from '../../components/Atoms/IconButton'

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
  argTypes: {
    iconName: {
      control: { type: 'text' },
    },
    classes: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { IconButton },
  template: '<icon-button v-bind="$props" />',
})

export const DefaultMedium = Template.bind({})
DefaultMedium.args = {
  iconName: 'checkMark',
}

export const Large = Template.bind({})
Large.args = {
  iconName: 'arrowRight',
  size: 'large',
}

export const Small = Template.bind({})
Small.args = {
  iconName: 'arrowRight',
  size: 'small',
}

export const CustomColorSuccess = Template.bind({})
CustomColorSuccess.args = {
  iconName: 'checkMark',
  classes: 'text-celeste bg-success',
}
export const CustomColorError = Template.bind({})
CustomColorError.args = {
  iconName: 'close',
  classes: 'text-celeste bg-error',
}
