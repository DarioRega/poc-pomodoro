import ButtonPrimary from '../../components/ButtonPrimary'

export default {
  title: 'Atoms/Buttons',
  component: ButtonPrimary,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ButtonPrimary },
  template: '<button-primary v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {
  label: 'Continue',
}
