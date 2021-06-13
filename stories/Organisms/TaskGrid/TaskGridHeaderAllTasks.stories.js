import TaskGridHeaderAllTasks from '@/components/Organisms/TaskGrid/All/TaskGridHeaderAllTasks'

export default {
  title: 'Organisms/TaskGrid/Header',
  component: TaskGridHeaderAllTasks,
  argTypes: {
    isToggled: {
      control: { type: 'radio', options: [true, false] },
    },
    isLayoutStacked: {
      control: { type: 'radio', options: [true, false] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TaskGridHeaderAllTasks },
  template: `<task-grid-header-all-tasks v-bind='$props' />`,
})

export const Default = Template.bind({})

export const Toggled = Template.bind({})
Toggled.args = {
  isToggled: true,
}
