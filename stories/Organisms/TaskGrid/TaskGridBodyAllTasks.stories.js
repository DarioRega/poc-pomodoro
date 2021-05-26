import TaskGridBodyAllTasks from '@/components/Organisms/TaskGrid/TaskGridBodyAllTasks'
import { TASK_STATUS } from '@/constantes'

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
      }
    },
  },
  template: `<task-grid-body-all-tasks v-bind='$props' :labels='getLabels' />`,
})

export const Default = Template.bind({})
Default.args = {
  task: {
    status: {
      id: 0,
      value: TASK_STATUS.TODO,
      name: TASK_STATUS.TODO,
    },
    name: 'Complete Wireframes',
  },
}

export const Selected = Template.bind({})
Selected.args = {
  isSelected: true,
  task: {
    status: {
      id: 0,
      value: TASK_STATUS.TODO,
      name: TASK_STATUS.TODO,
    },
    name: 'Complete Wireframes',
  },
}

export const CompleteTask = Template.bind({})
CompleteTask.args = {
  task: {
    status: {
      id: 3,
      value: TASK_STATUS.COMPLETED,
      name: TASK_STATUS.COMPLETED,
    },
    name: 'Complete Wireframes',
  },
}

export const SelectedCompleteTask = Template.bind({})
SelectedCompleteTask.args = {
  isSelected: true,
  task: {
    status: {
      id: 3,
      value: TASK_STATUS.COMPLETED,
      name: TASK_STATUS.COMPLETED,
    },
    name: 'Complete Wireframes',
  },
}
