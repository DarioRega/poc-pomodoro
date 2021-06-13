import TaskSelectStatus from '../../../components/Atoms/Task/TaskSelectStatus'
import { TASK_STATUS_VALUES } from '~/constantes'
import TaskCurrentStatus from '~/components/Atoms/Task/TaskCurrentStatus'

export default {
  title: 'Atoms/Task/SelectStatus',
  component: TaskSelectStatus,
  argTypes: {
    options: {
      control: {
        type: 'select',
        options: [
          {
            id: 1,
            name: TASK_STATUS_VALUES.TODO,
          },
          {
            id: 2,
            name: TASK_STATUS_VALUES.IN_PROGRESS,
          },
          {
            id: 3,
            name: TASK_STATUS_VALUES.DONE,
          },
          {
            id: 4,
            name: TASK_STATUS_VALUES.ARCHIVED,
          },
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
        { id: 1, name: TASK_STATUS_VALUES.TODO },
        { id: 2, name: TASK_STATUS_VALUES.IN_PROGRESS },
        { id: 4, name: TASK_STATUS_VALUES.DONE },
        { id: 5, name: TASK_STATUS_VALUES.ARCHIVED },
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
  status: { id: 1, name: TASK_STATUS_VALUES.TODO },
}

export const Loading = Template.bind({})
Loading.args = {
  name: 'myName',
  status: { id: 1, name: TASK_STATUS_VALUES.TODO },
  isLoading: true,
}
