import Toggle from '../../../components/Atoms/Inputs/Toggle'

export default {
  title: 'Atoms/Toggle',
  component: Toggle,
  argTypes: {
    toggled: {
      control: { type: 'radio', options: [true, false] },
    },
    withIcon: {
      control: { type: 'radio', options: [false, true] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Toggle },
  methods: {
    toggle(value) {
      this.toggled = value
    },
  },
  template: `<toggle v-bind="$props" @toggle="toggle" />`,
})

export const UnToggled = Template.bind({})
UnToggled.args = {
  toggled: false,
}

export const Toggled = Template.bind({})
Toggled.args = {
  toggled: true,
}

export const UnToggledWithIcon = Template.bind({})
UnToggledWithIcon.args = {
  toggled: false,
  withIcon: true,
}

export const ToggledWithIcon = Template.bind({})
ToggledWithIcon.args = {
  toggled: true,
  withIcon: true,
}
