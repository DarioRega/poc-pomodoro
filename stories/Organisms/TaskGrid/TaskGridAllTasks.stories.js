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
          showCompletedTasks: 'Show completed tasks',
          showCompletedTasksCut: 'Show completed',
        },
        body: {
          taskName: 'Task name',
          taskStatusName: 'Task status',
          taskDescription: 'Task description',
          closeCalendar: 'Close',
        },
        general: {
          amountOfTasksToDisplay: 'Tasks to display',
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
    id: 322,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    status: {
      id: 3,
      value: TASK_STATUS_VALUES.TODO,
      name: FAKER_TASK_STATUS_NAMES.TODO,
    },
  },
  currentTaskRunning: {
    id: 441,
  },
  tasks: [
    {
      id: 441,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.IN_PROGRESS,
        name: FAKER_TASK_STATUS_NAMES.IN_PROGRESS,
      },
      name: 'Complete Wireframes',
      deadline: '19.06.2021',
    },
    {
      id: 322,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Fyl to Bangaloor',
      deadline: '19.06.2021',
    },
    {
      id: 343,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 4654,
      status: {
        id: 1,
        value: TASK_STATUS_VALUES.DONE,
        name: FAKER_TASK_STATUS_NAMES.DONE,
      },
      name: 'Draw a car',
      deadline: '',
    },
  ],
}

/*
  To preview, you have to toggle manually the "Show completed tasks"
*/
export const CompleteTask = Template.bind({})
CompleteTask.args = {
  currentTaskSelected: {
    id: 2,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    status: {
      id: 1,
      value: TASK_STATUS_VALUES.DONE,
      name: FAKER_TASK_STATUS_NAMES.DONE,
    },
  },
  currentTaskRunning: {
    id: 3,
  },
  tasks: [
    {
      id: 441,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.IN_PROGRESS,
        name: FAKER_TASK_STATUS_NAMES.IN_PROGRESS,
      },
      name: 'Complete Wireframes',
      deadline: '19.06.2021',
    },
    {
      id: 322,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Fyl to Bangaloor',
      deadline: '19.06.2021',
    },
    {
      id: 343,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 4654,
      status: {
        id: 1,
        value: TASK_STATUS_VALUES.DONE,
        name: FAKER_TASK_STATUS_NAMES.DONE,
      },
      name: 'Draw a car',
      deadline: '',
    },
  ],
}

export const WithPagination = Template.bind({})
WithPagination.args = {
  currentTaskSelected: {
    id: 342,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    status: {
      id: 2,
      value: TASK_STATUS_VALUES.TODO,
      name: FAKER_TASK_STATUS_NAMES.TODO,
    },
  },
  currentTaskRunning: {
    id: 1231,
  },
  tasks: [
    {
      id: 1231,
      status: {
        id: 2,
        value: TASK_STATUS_VALUES.IN_PROGRESS,
        name: FAKER_TASK_STATUS_NAMES.IN_PROGRESS,
      },
      name: 'Complete Wireframes',
      deadline: '19.06.2021',
    },
    {
      id: 342,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Fyl to Bangaloor',
      deadline: '19.06.2021',
    },
    {
      id: 5453,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 4563,
      status: {
        id: 1,
        value: TASK_STATUS_VALUES.DONE,
        name: FAKER_TASK_STATUS_NAMES.DONE,
      },
      name: 'Lorem Ipsum',
      deadline: '',
    },
    {
      id: 4565,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 4566,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 3456,
      status: {
        id: 6,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 7456,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 8456,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 94566,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 14560,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 14561,
      status: {
        id: 2,
        value: TASK_STATUS_VALUES.IN_PROGRESS,
        name: FAKER_TASK_STATUS_NAMES.IN_PROGRESS,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 1456652,
      status: {
        id: 2,
        value: TASK_STATUS_VALUES.IN_PROGRESS,
        name: FAKER_TASK_STATUS_NAMES.IN_PROGRESS,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 14563,
      status: {
        id: 1,
        value: TASK_STATUS_VALUES.DONE,
        name: FAKER_TASK_STATUS_NAMES.DONE,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 14453,
      status: {
        id: 2,
        value: TASK_STATUS_VALUES.IN_PROGRESS,
        name: FAKER_TASK_STATUS_NAMES.IN_PROGRESS,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 1534234,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 134236,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 17234,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 13458,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 19345,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 23450,
      status: {
        id: 3,
        value: TASK_STATUS_VALUES.TODO,
        name: FAKER_TASK_STATUS_NAMES.TODO,
      },
      name: 'Draw a car',
      deadline: '',
    },
    {
      id: 23451,
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
