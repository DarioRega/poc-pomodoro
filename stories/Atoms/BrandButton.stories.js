import BrandButton from '../../components/Atoms/BrandButton'

export default {
  title: 'Atoms/Buttons',
  component: BrandButton,
  argTypes: {
    type: {
      control: { type: 'select', options: ['primary', 'secondary', 'naked'] },
    },
    isDisabled: {
      control: { type: 'select', options: [true, false] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BrandButton },
  template: '<brand-button v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {
  label: 'Continue',
  type: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Continue',
  type: 'secondary',
}

export const Naked = Template.bind({})
Naked.args = {
  label: 'Continue',
  type: 'naked',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Continue',
  type: 'primary',
  isDisabled: true,
}
