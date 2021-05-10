import TaskCurrentStatus from '../../../components/Atoms/Task/TaskCurrentStatus'
import { TASK_STATUS } from '../../../constantes'

export default {
  title: 'Atoms/Task/Status',
  component: TaskCurrentStatus,
  argTypes: {
    currentStatus: {
      control: {
        type: 'select',
        options: [
          TASK_STATUS.COMPLETED,
          TASK_STATUS.IN_PROGRESS,
          TASK_STATUS.TODO,
          TASK_STATUS.ARCHIVED,
        ],
      },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TaskCurrentStatus },
  template: `<task-current-status v-bind="$props" />`,
})

export const Completed = Template.bind({})
Completed.args = {
  currentStatus: TASK_STATUS.COMPLETED,
  statusText: 'COMPLETED',
}

export const DefaultTodo = Template.bind({})
DefaultTodo.args = {
  currentStatus: TASK_STATUS.TODO,
  statusText: 'TODO',
}

export const InProgress = Template.bind({})
InProgress.args = {
  currentStatus: TASK_STATUS.IN_PROGRESS,
  statusText: 'IN PROGRESS',
}
export const Archived = Template.bind({})
Archived.args = {
  currentStatus: TASK_STATUS.ARCHIVED,
  statusText: 'ARCHIVED',
}
