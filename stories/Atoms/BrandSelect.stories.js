import BrandSelect from '../../components/Atoms/BrandSelect'

export default {
  title: 'Atoms/Select',
  component: BrandSelect,
  argTypes: {
    defaultValue: {
      control: {
        type: 'select',
        options: [
          { id: 1, name: 'Light' },
          { id: 2, name: 'Dusk' },
          { id: 3, name: 'Dark' },
        ],
      },
    },
    size: {
      type: 'select',
      options: ['default', 'large'],
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BrandSelect },
  data() {
    return {
      list: [
        { id: 1, name: 'Light' },
        { id: 2, name: 'Dusk' },
        { id: 3, name: 'Dark' },
      ],
    }
  },
  computed: {
    hasLabel() {
      return args.label
    },
    hasErrors() {
      return args.errors
    },
  },
  template: `
    <div class="max-w-xs">
      <brand-select v-bind="$props" :options="list">
        <template v-if="hasLabel" v-slot:label>${args.label}</template>
        <template v-if="hasErrors" v-slot:errors>${args.errors}</template>
      </brand-select>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  defaultValue: { id: 3, name: 'Dark' },
}

export const Large = Template.bind({})
Large.args = {
  defaultValue: { id: 3, name: 'Dark' },
  size: 'large',
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  defaultValue: { id: 1, name: 'Light' },
  label: 'Theme',
}

export const HasError = Template.bind({})
HasError.args = {
  errors: `
    <p>
      Please select a value
    </p>
`,
}

export const HasErrorWithLabel = Template.bind({})
HasErrorWithLabel.args = {
  label: 'Theme',
  errors: `
    <p>
      Please select a value
    </p>
`,
}
