import BrandInput from '../../../components/Atoms/BrandInput'
import Icon from '../../../components/Atoms/Icon'
export default {
  title: 'Atoms/Input',
  component: BrandInput,
  argTypes: {
    size: {
      control: { type: 'select', options: ['default', 'large'] },
    },
    type: {
      control: { type: 'select', options: ['text', 'number'] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BrandInput, Icon },
  computed: {
    hasLabel() {
      return args.label
    },
    hasIcon() {
      return args.icon
    },
    hasErrors() {
      return args.errors
    },
  },
  template: `
    <div class="max-w-xs">
      <brand-input v-bind="$props" name="test">
        <template v-if="hasLabel" v-slot:label>${args.label}</template>
        <template v-if="hasIcon" v-slot:icon>${args.icon}</template>
        <template v-if="hasErrors" v-slot:errors>${args.errors}</template>
      </brand-input>
  </div>`,
})

export const BrandInputDefault = Template.bind({})

export const BrandInputLarge = Template.bind({})
BrandInputLarge.args = {
  size: 'large',
}

export const BrandInputWithIcon = Template.bind({})
BrandInputWithIcon.args = {
  icon: `$`,
}

export const BrandInputWithLabel = Template.bind({})
BrandInputWithLabel.args = {
  label: 'Accounts',
}

export const InputHasError = Template.bind({})
InputHasError.args = {
  errors: `
    <p>
      Field can't be empty
    </p>
`,
}

export const InputHasErrorWithLabel = Template.bind({})
InputHasErrorWithLabel.args = {
  label: 'Accounts',
  errors: `
    <p>
      Field can't be empty
    </p>
`,
}

export const InputHasErrorWithIcon = Template.bind({})
InputHasErrorWithLabel.args = {
  label: 'Accounts',
  icon: `$`,
  errors: `
    <p>
      Field can't be empty
    </p>
`,
}

export const InputNumber = Template.bind({})
InputNumber.args = {
  type: 'number',
}
export const InputNumberAllowFractions = Template.bind({})
InputNumberAllowFractions.args = {
  type: 'number',
  allowFractions: true,
}
