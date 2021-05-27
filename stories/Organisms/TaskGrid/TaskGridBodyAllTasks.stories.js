import TaskGridBodyAllTasks from '@/components/Organisms/TaskGrid/TaskGridBodyAllTasks'
import { FAKER_TASK_STATUS_NAMES, TASK_STATUS_VALUES } from '@/constantes'

export default {
  title: 'Organisms/TaskGrid/Body',
  component: TaskGridBodyAllTasks,
  argTypes: {
    labels: {
      control: { type: 'object' },
    },
    isSelected: {
      control: { type: 'radio', options: [true, false] },
    },
    isStacked: {
      control: { type: 'radio', options: [true, false] },
    },
    isFirstRow: {
      control: { type: 'radio', options: [true, false] },
    },
    currentTaskSelected: {
      control: { type: 'object' },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TaskGridBodyAllTasks },
  computed: {
    getLabels() {
      return {
        taskName: 'Task name',
        taskStatusName: 'Task status',
        taskDescription: 'Task description',
        closeCalendar: 'Close',
      }
    },
  },
  template: `<task-grid-body-all-tasks v-bind='$props' :labels='getLabels' />`,
})

export const Default = Template.bind({})
Default.args = {
  isFirstRow: true,
  currentTaskSelected: {
    id: 4,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  task: {
    status: {
      id: 3,
      value: TASK_STATUS_VALUES.TODO,
      name: FAKER_TASK_STATUS_NAMES.TODO,
    },
    name: 'Complete Wireframes',
    deadline: '19.06.2021',
  },
}

export const StackedLayout = Template.bind({})
StackedLayout.args = {
  isStacked: true,
  isFirstRow: true,
  currentTaskSelected: {
    id: 4,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  task: {
    status: {
      id: 3,
      value: TASK_STATUS_VALUES.TODO,
      name: FAKER_TASK_STATUS_NAMES.TODO,
    },
    name: 'Complete Wireframes',
    deadline: '19.06.2021',
  },
}

export const Selected = Template.bind({})
Selected.args = {
  isSelected: true,
  isFirstRow: true,
  currentTaskSelected: {
    id: 3,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  task: {
    status: {
      id: 3,
      value: TASK_STATUS_VALUES.TODO,
      name: FAKER_TASK_STATUS_NAMES.TODO,
    },
    name: 'Complete Wireframes',
  },
}

export const TaskDone = Template.bind({})
TaskDone.args = {
  isFirstRow: true,
  currentTaskSelected: {
    id: 2,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  task: {
    status: {
      id: 1,
      value: TASK_STATUS_VALUES.DONE,
      name: TASK_STATUS_VALUES.DONE,
    },
    name: 'Complete Wireframes',
  },
}

export const SelectedDoneTask = Template.bind({})
SelectedDoneTask.args = {
  isSelected: true,
  isFirstRow: true,
  currentTaskSelected: {
    id: 1,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  task: {
    status: {
      id: 1,
      value: TASK_STATUS_VALUES.DONE,
      name: TASK_STATUS_VALUES.DONE,
    },
    name: 'Complete Wireframes',
  },
}
