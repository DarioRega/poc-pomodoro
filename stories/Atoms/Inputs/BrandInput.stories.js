import Icon from '../../../components/Atoms/Icon'
import BrandInput from '../../../components/Atoms/BrandInput'
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

export const Default = Template.bind({})

export const Large = Template.bind({})
Large.args = {
  size: 'large',
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  icon: `$`,
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: 'Accounts',
}

export const HasError = Template.bind({})
HasError.args = {
  errors: `
    <p>
      Field can't be empty
    </p>
`,
}

export const HasErrorWithLabel = Template.bind({})
HasErrorWithLabel.args = {
  label: 'Accounts',
  errors: `
    <p>
      Field can't be empty
    </p>
`,
}

export const HasErrorWithIcon = Template.bind({})
HasErrorWithIcon.args = {
  label: 'Accounts',
  icon: `$`,
  errors: `
    <p>
      Field can't be empty
    </p>
`,
}
