import TaskGridAllTasks from '@/components/Organisms/TaskGrid/TaskGridAllTasks'
import { FAKER_TASK_STATUS_NAMES, TASK_STATUS_VALUES } from '@/constantes'

export default {
  title: 'Organisms/TaskGrid/GridAllTasks',
  component: TaskGridAllTasks,
  argTypes: {
    labels: {
      control: { type: 'object' },
    },
    tasks: {
      control: { type: 'array' },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TaskGridAllTasks },
  computed: {
    getLabels() {
      return {
        header: {
          all: 'All',
          status: 'Status',
          deadline: 'Deadline',
          description: 'Description',
        },
        body: {
          taskName: 'Task name',
          taskStatusName: 'Task status',
          taskDescription: 'Task description',
          closeCalendar: 'Close',
        },
      }
    },
  },
  template: `<task-grid-all-tasks v-bind='$props' :labels='getLabels' />`,
})

export const Default = Template.bind({})
Default.args = {
  currentTaskSelected: {
    id: 4,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  tasks: [
    {
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.IN_PROGRESS,
        name: FAKER_TASK_STATUS_NAMES.IN_PROGRESS,
      },
      name: 'Complete Wireframes',
      deadline: '19.06.2021',
    },
    {
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Fyl to Bangaloor',
      deadline: '19.06.2021',
    },
    {
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
  ],
}
