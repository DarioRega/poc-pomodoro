import ModalSettingsPanel from '@/components/Organisms/SettingsPanels/ModalSettingsPanel'

export default {
  title: 'Templates/ModalSettingsPanel',
  component: ModalSettingsPanel,
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
  components: { ModalSettingsPanel },
  template: `<modal-settings-panel v-bind='$props'/>`,
})

export const Open = Template.bind({})
Open.args = {
  isOpen: true,
}
