import SettingsPanelCurrentSubscriptionTab from '@/components/Organisms/SettingsPanels/SettingsPanelCurrentSubscriptionTab'
import { SETTINGS_PANEL_LABELS } from '@/constantes/labels'

export default {
  title: 'Organisms/SettingsPanels/CurrentSubscriptionTab',
  component: SettingsPanelCurrentSubscriptionTab,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SettingsPanelCurrentSubscriptionTab },
  computed: {
    getLabels() {
      return SETTINGS_PANEL_LABELS.subscriptionTab
    },
    getCommonLabels() {
      return SETTINGS_PANEL_LABELS.sub
    },
    mockValues() {
      return {
        displayLanguage: {
          id: 1434,
          value: 'en',
          name: 'English',
        },
        timezone: {
          id: 143434,
          value: 'gmt+1',
          name: 'GMT+1',
        },
        timeDisplayFormat: {
          id: 123,
          value: 'am/pm',
          name: 'AM/PM',
        },
        theme: {
          id: 2354,
          value: 'dusk',
          name: 'Dusk',
        },
        bugReports: false,
        analytics: true,
      }
    },
  },
  template: `
    <div class='max-w-3xl mx-auto bg-light-white dark:bg-darker-blue'>
    <div class="bg-lighter-white dark:bg-dark-blue p-6">
      <settings-panel-current-subscription-tab :labels='getLabels' :common-labels='getCommonLabels' :values='mockValues'  />
    </div>
    </div>
  `,
})

export const Default = Template.bind({})
