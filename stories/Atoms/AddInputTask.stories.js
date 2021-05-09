import AddTaskInput from '../../components/Atoms/AddTaskInput'

export default {
  title: 'Atoms/Input/AddTask',
  component: AddTaskInput,
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
    isDisabled: {
      control: { type: 'select', options: [true, false] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AddTaskInput },
  template: '<div class="w-48"><add-task-input v-bind="$props" /></div>',
})

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Add a task...',
}

export const WithError = Template.bind({})
WithError.args = {
  placeholder: 'Add a task',
  errorText: 'Name is too short',
}
