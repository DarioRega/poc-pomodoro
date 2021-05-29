import TaskGridHeaderActions from '../../../components/Atoms/Task/TaskGridHeaderActions'

export default {
  title: 'Atoms/Task/GridHeaderActions',
  component: TaskGridHeaderActions,
  argTypes: {
    isToggled: {
      type: 'radio',
      options: [true, false],
    },
    label: {
      type: 'text',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TaskGridHeaderActions },
  template: '<task-grid-header-actions class="max-w-md" v-bind="$props" />',
})

export const Default = Template.bind({})
Default.args = {
  label: 'Show completed tasks',
}

export const Toggled = Template.bind({})
Toggled.args = {
  label: 'Show completed tasks',
  isToggled: true,
}
