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
        closeCalendar: 'Close',
      }
    },
  },
  template: `<task-grid-body-all-tasks v-bind='$props' :labels='getLabels' />`,
})

export const Default = Template.bind({})
Default.args = {
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
  task: {
    status: {
      id: 1,
      value: TASK_STATUS_VALUES.DONE,
      name: TASK_STATUS_VALUES.DONE,
    },
    name: 'Complete Wireframes',
  },
}
