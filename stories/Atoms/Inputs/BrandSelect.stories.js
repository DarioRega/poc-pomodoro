import BrandSelect from '../../../components/Atoms/Inputs/BrandSelect'

export default {
  title: 'Atoms/Select',
  component: BrandSelect,
  argTypes: {
    value: {
      control: {
        type: 'select',
        options: [
          { id: 1, name: 'Light' },
          { id: 2, name: 'Dusk' },
          { id: 4, name: 'Yellow' },
          { id: 5, name: 'Pink' },
          { id: 6, name: 'Red' },
        ],
      },
    },
    size: {
      type: 'select',
      options: ['default', 'large'],
    },
    type: {
      type: 'select',
      options: ['primary', 'large'],
    },
    label: {
      type: 'text',
    },
    shouldShowSelected: {
      type: 'radio',
      options: [true, false],
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
        { id: 4, name: 'Yellow' },
        { id: 5, name: 'Pink' },
        { id: 6, name: 'Red' },
      ],
    }
  },
  computed: {
    hasErrors() {
      return args.errors
    },
  },
  template: `
    <div class="max-w-xs">
    <brand-select v-bind="$props" name="test" :options="list">
      <template v-if="hasErrors" v-slot:errors>${args.errors}</template>
    </brand-select>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  name: 'myName',
  value: { id: 3, name: 'Dark' },
  placeholder: 'Please select',
}

export const Large = Template.bind({})
Large.args = {
  name: 'myName',
  size: 'large',
  value: { id: 3, name: 'Dark' },
  placeholder: 'Please select',
}

export const Small = Template.bind({})
Small.args = {
  name: 'myName',
  size: 'small',
  value: { id: 2, name: 'Dusk' },
  placeholder: 'Please select',
}

export const WithoutCheckMark = Template.bind({})
WithoutCheckMark.args = {
  name: 'myName',
  shouldShowSelected: false,
  value: { id: 2, name: 'Dusk' },
  placeholder: 'Please select',
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: 'Theme',
  value: { id: 1, name: 'Light' },
  placeholder: 'Please select',
}

export const HasError = Template.bind({})
HasError.args = {
  name: 'myName',
  errorText: 'A value is required',
  placeholder: 'Please select',
}

export const HasErrorWithLabel = Template.bind({})
HasErrorWithLabel.args = {
  name: 'myName',
  label: 'Theme',
  errorText: 'A value is required',
  placeholder: 'Please select',
}
