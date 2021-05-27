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
      }
    },
  },
  template: `<task-grid-header-all-tasks :labels='getLabels' />`,
})

export const Default = Template.bind({})
