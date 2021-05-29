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
  template: `<brand-button :class="${args.makeBigger} && 'min-w-[10rem]'" v-bind="$props">{{ slotcontent }}</brand-button>`,
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

export const PrimaryLoading = Template.bind({})
PrimaryLoading.args = {
  slotcontent: 'Continue',
  type: 'primary',
  isLoading: true,
}

export const SecondaryLoading = Template.bind({})
SecondaryLoading.args = {
  slotcontent: 'Continue',
  type: 'secondary',
  isLoading: true,
}

export const NakedLoading = Template.bind({})
NakedLoading.args = {
  slotcontent: 'Continue',
  type: 'naked',
  isLoading: true,
}

export const ExampleBiggerButtonLoading = Template.bind({})
ExampleBiggerButtonLoading.args = {
  slotcontent: 'Continue',
  type: 'primary',
  makeBigger: true,
  isLoading: true,
}
