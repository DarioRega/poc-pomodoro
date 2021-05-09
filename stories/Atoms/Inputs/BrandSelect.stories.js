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
          { id: 3, name: 'Dark' },
        ],
      },
    },
    size: {
      control: { type: 'select', options: ['default', 'large'] },
    },
    type: {
      control: { type: 'select', options: ['primary', 'task'] },
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
        <template v-if="hasErrors" v-slot:errors>${args.errors}</template>
      </brand-select>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  name: 'myName',
  value: { id: 3, name: 'Dark' },
}

export const Large = Template.bind({})
Large.args = {
  name: 'myName',
  size: 'large',
  value: { id: 3, name: 'Dark' },
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  name: 'Theme',
  label: 'Theme',
  value: { id: 1, name: 'Light' },
}

// export const HasError = Template.bind({})
// HasError.args = {
//   name: 'myName',
//   errors: `
//     <p>
//       Field can't be empty
//     </p>
// `,
// }
//
// export const HasErrorWithLabel = Template.bind({})
// HasErrorWithLabel.args = {
//   name: 'theme',
//   label: 'Theme',
//   errors: `
//     <p>
//       Field can't be empty
//     </p>
// `,
// }
