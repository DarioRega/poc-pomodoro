import { SETTINGS_PANEL_LABELS } from '@/constantes/labels'
import SettingsPanelAccountTab from '@/components/Organisms/SettingsPanels/SettingsPanelAccountTab'

export default {
  title: 'Organisms/SettingsPanels/AccountTab',
  component: SettingsPanelAccountTab,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SettingsPanelAccountTab },
  computed: {
    getLabels() {
      return SETTINGS_PANEL_LABELS.accountTab
    },
    mockValues() {
      return {
        fullName: 'Dario Regazzoni',
        email: 'dario.regazzoni@outlook.fr',
        password: 'proutkaka',
      }
    },
  },
  template: `
    <div class='max-w-3xl mx-auto bg-light-white dark:bg-darker-blue'>
    <div class="bg-lighter-white dark:bg-dark-blue p-6">
      <settings-panel-account-tab :labels='getLabels' :values='mockValues' />
    </div>
    </div>
  `,
})

export const Default = Template.bind({})
