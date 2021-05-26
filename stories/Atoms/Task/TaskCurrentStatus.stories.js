import TaskCurrentStatus from '../../../components/Atoms/Task/TaskCurrentStatus'
import { TASK_STATUS_VALUES } from '../../../constantes'

export default {
  title: 'Atoms/Task/Status',
  component: TaskCurrentStatus,
  argTypes: {
    currentStatus: {
      control: {
        type: 'select',
        options: [
          TASK_STATUS_VALUES.DONE,
          TASK_STATUS_VALUES.IN_PROGRESS,
          TASK_STATUS_VALUES.TODO,
          TASK_STATUS_VALUES.ARCHIVED,
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

export const Done = Template.bind({})
Done.args = {
  currentStatus: TASK_STATUS_VALUES.DONE,
  statusText: 'DONE',
}

export const DefaultTodo = Template.bind({})
DefaultTodo.args = {
  currentStatus: TASK_STATUS_VALUES.TODO,
  statusText: 'TODO',
}

export const InProgress = Template.bind({})
InProgress.args = {
  currentStatus: TASK_STATUS_VALUES.IN_PROGRESS,
  statusText: 'IN PROGRESS',
}
export const Archived = Template.bind({})
Archived.args = {
  currentStatus: TASK_STATUS_VALUES.ARCHIVED,
  statusText: 'ARCHIVED',
}
