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
  template: '<brand-button v-bind="$props">{{ slotcontent }}</brand-button>',
})

export const Primary = Template.bind({})
Primary.args = {
  slotcontent: 'Continue',
  type: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  slotcontent: 'Continue',
  type: 'secondary',
}

export const Naked = Template.bind({})
Naked.args = {
  slotcontent: 'Continue',
  type: 'naked',
}

export const Disabled = Template.bind({})
Disabled.args = {
  slotcontent: 'Continue',
  type: 'primary',
  isDisabled: true,
}
