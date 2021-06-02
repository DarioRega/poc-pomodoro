import TaskGridHeaderAllTasks from '@/components/Organisms/TaskGrid/TaskGridHeaderAllTasks'

export default {
  title: 'Organisms/TaskGrid/Header',
  component: TaskGridHeaderAllTasks,
  argTypes: {
    labels: {
      control: { type: 'object' },
    },
    isToggled: {
      control: { type: 'radio', options: [true, false] },
    },
    isStacked: {
      control: { type: 'radio', options: [true, false] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TaskGridHeaderAllTasks },
  computed: {
    getLabels() {
      return {
        all: 'All',
        status: 'Status',
        deadline: 'Deadline',
        description: 'Description',
        showCompletedTasks: 'Show completed tasks',
        showCompletedTasksCut: 'Show complete',
      }
    },
  },
  template: `<task-grid-header-all-tasks v-bind='$props' :labels='getLabels' />`,
})

export const Default = Template.bind({})

export const Toggled = Template.bind({})
Toggled.args = {
  isToggled: true,
}
