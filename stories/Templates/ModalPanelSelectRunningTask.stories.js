import ModalPanelSelectRunningTask from '@/components/Organisms/PanelSelectRunningTask/ModalPanelSelectRunningTask'

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
  template: `<modal-panel-select-running-task v-bind='$props' />`,
})

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
}
