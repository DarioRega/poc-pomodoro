import TaskSelectStatus from '../../../components/Atoms/Task/TaskSelectStatus'
import { TASK_STATUS } from '~/constantes'
import TaskCurrentStatus from '~/components/Atoms/Task/TaskCurrentStatus'

export default {
  title: 'Atoms/Task/SelectStatus',
  component: TaskSelectStatus,
  argTypes: {
    value: {
      control: {
        type: 'select',
        options: [
          { id: 1, name: 'todo', status: TASK_STATUS.TODO },
          { id: 2, name: 'in progress', status: TASK_STATUS.IN_PROGRESS },
          { id: 4, name: 'completed', status: TASK_STATUS.COMPLETED },
          { id: 5, name: 'archived', status: TASK_STATUS.ARCHIVED },
        ],
      },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TaskSelectStatus, TaskCurrentStatus },
  data() {
    return {
      list: [
        { id: 1, name: 'todo', status: TASK_STATUS.TODO },
        { id: 2, name: 'in progress', status: TASK_STATUS.IN_PROGRESS },
        { id: 4, name: 'completed', status: TASK_STATUS.COMPLETED },
        { id: 5, name: 'archived', status: TASK_STATUS.ARCHIVED },
      ],
    }
  },

  template: `
    <div class="w-56">
    <task-select-status v-bind="$props" name="test" :options="list" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  name: 'myName',
  value: { id: 1, name: 'todo', status: TASK_STATUS.TODO },
}
