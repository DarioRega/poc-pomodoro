import BrandInput from '../../../components/Atoms/Inputs/BrandInput'
export default {
  title: 'Atoms/Inputs/Input',
  component: BrandInput,
  argTypes: {
    size: {
      control: { type: 'select', options: ['default', 'large'] },
    },
    type: {
      control: { type: 'select', options: ['primary', 'task'] },
    },
    value: {
      control: { type: 'text' },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BrandInput },
  data() {
    return {
      model: args.value,
    }
  },
  template: `
    <div class="max-w-xs">
      <brand-input v-bind="$props" />
    </div>`,
})

export const Default = Template.bind({})
Default.args = {
  name: 'myName',
  value: 'Create deployment plan',
}

export const Large = Template.bind({})
Large.args = {
  value: 'Create deployment plan',
  size: 'large',
  name: 'myName',
}

export const TypeTask = Template.bind({})
TypeTask.args = {
  type: 'task',
  name: 'task-name',
  value: 'Create deployment plan',
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  value: 'Josef',
  label: 'Name',
  name: 'name',
}

export const HasError = Template.bind({})
HasError.args = {
  name: 'myName',
  errorText: "Field can't be empty",
}

export const HasErrorWithLabel = Template.bind({})
HasErrorWithLabel.args = {
  name: 'account',
  label: 'Account',
  errorText: "Field can't be empty",
}

export const HasErrorTypeTask = Template.bind({})
HasErrorTypeTask.args = {
  name: 'myName',
  type: 'task',
  errorText: "Field can't be empty",
}
