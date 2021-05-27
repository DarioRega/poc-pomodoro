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
    getTaskArrayLength() {
      return args.tasks.length
    },
  },
  template: `<task-grid-all-tasks v-bind='$props' :labels='getLabels' :tasks-array-length='getTaskArrayLength' />`,
})

export const Default = Template.bind({})
Default.args = {
  currentTaskSelected: {
    id: 2,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  tasks: [
    {
      id: 1,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.IN_PROGRESS,
        name: FAKER_TASK_STATUS_NAMES.IN_PROGRESS,
      },
      name: 'Complete Wireframes',
      deadline: '19.06.2021',
    },
    {
      id: 2,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Fyl to Bangaloor',
      deadline: '19.06.2021',
    },
    {
      id: 3,
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

export const WithOverflow = Template.bind({})
WithOverflow.args = {
  currentTaskSelected: {
    id: 2,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  tasks: [
    {
      id: 1,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.IN_PROGRESS,
        name: FAKER_TASK_STATUS_NAMES.IN_PROGRESS,
      },
      name: 'Complete Wireframes',
      deadline: '19.06.2021',
    },
    {
      id: 2,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Fyl to Bangaloor',
      deadline: '19.06.2021',
    },
    {
      id: 3,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 3,
      status: {
        id: 1,
        value: TASK_STATUS_VALUES.DONE,
        name: FAKER_TASK_STATUS_NAMES.DONE,
      },
      name: 'Lorem Ipsum',
      deadline: '',
    },
    {
      id: 5,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 6,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 3,
      status: {
        id: 6,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 7,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 8,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 9,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 10,
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
