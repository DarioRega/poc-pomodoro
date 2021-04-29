import BrandButton from '../../components/Atoms/BrandButton'

export default {
  title: 'Atoms/Buttons',
  component: BrandButton,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BrandButton },
  argTypes: {
    type: {
      control: { type: 'select', options: ['primary', 'secondary', 'naked'] },
    },
    isDisabled: {
      control: { type: 'select', options: [true, false] },
    },
  },
  template: '<brand-button v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {
  label: 'Continue',
  type: 'primary',
}
