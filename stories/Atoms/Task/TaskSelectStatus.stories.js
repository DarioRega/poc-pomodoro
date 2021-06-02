import TaskSelectStatus from '../../../components/Atoms/Task/TaskSelectStatus'
import { FAKER_TASK_STATUS_NAMES, TASK_STATUS_VALUES } from '~/constantes'
import TaskCurrentStatus from '~/components/Atoms/Task/TaskCurrentStatus'

export default {
  title: 'Atoms/Task/SelectStatus',
  component: TaskSelectStatus,
  argTypes: {
    value: {
      control: {
        type: 'select',
        options: [
          {
            id: 1,
            name: FAKER_TASK_STATUS_NAMES.TODO,
            value: TASK_STATUS_VALUES.TODO,
          },
          {
            id: 2,
            name: FAKER_TASK_STATUS_NAMES.IN_PROGRESS,
            value: TASK_STATUS_VALUES.IN_PROGRESS,
          },
          {
            id: 3,
            name: FAKER_TASK_STATUS_NAMES.DONE,
            value: TASK_STATUS_VALUES.DONE,
          },
          {
            id: 4,
            name: FAKER_TASK_STATUS_NAMES.ARCHIVED,
            value: TASK_STATUS_VALUES.ARCHIVED,
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
        { id: 1, name: 'todo', value: TASK_STATUS_VALUES.TODO },
        { id: 2, name: 'in progress', value: TASK_STATUS_VALUES.IN_PROGRESS },
        { id: 4, name: 'done', value: TASK_STATUS_VALUES.DONE },
        { id: 5, name: 'archived', value: TASK_STATUS_VALUES.ARCHIVED },
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
  value: { id: 1, name: 'todo', value: TASK_STATUS_VALUES.TODO },
}
