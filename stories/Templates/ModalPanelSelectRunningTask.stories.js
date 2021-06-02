import ModalPanelSelectRunningTask from '@/components/Organisms/PanelSelectRunningTask/ModalPanelSelectRunningTask'
import { PANEL_SELECT_RUNNING_TASK_LABELS } from '@/constantes/labels'

export default {
  title: 'Templates/ModalPanelSelectRunningTask',
  component: ModalPanelSelectRunningTask,
  argType: {
    isOpen: {
      control: {
        type: 'radio',
        options: [true, false],
      },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ModalPanelSelectRunningTask },
  computed: {
    mockTasks() {
      return [
        {
          id: 12315,
          name: 'Do Wireframes',
          project: 'Nike',
          subProject: 'Design',
        },
        {
          id: 1322315,
          name: 'Prepare hot water',
          project: 'Cooking Class',
          subProject: 'Preparation',
        },
        {
          id: 4312315,
          name: 'Post letter',
          subProject: 'Chores',
        },
      ]
    },
    getLabels() {
      return PANEL_SELECT_RUNNING_TASK_LABELS
    },
    mockPreviousTask() {
      return args.withPreviousTask
        ? {
            id: 12315,
            name: 'Do Wireframes',
            project: 'Nike',
            subProject: 'Design',
          }
        : {}
    },
  },
  template: `<modal-panel-select-running-task v-bind='$props' :tasks='mockTasks' :previousTask='mockPreviousTask' :labels='getLabels'/>`,
})

export const DefaultWithoutPreviousTask = Template.bind({})
DefaultWithoutPreviousTask.args = {
  isOpen: true,
  withPreviousTask: false,
}

export const DefaultWithPreviousTask = Template.bind({})
DefaultWithPreviousTask.args = {
  isOpen: true,
  withPreviousTask: true,
}
