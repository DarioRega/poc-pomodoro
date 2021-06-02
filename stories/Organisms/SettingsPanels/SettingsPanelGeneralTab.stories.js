import SettingsPanelGeneralTab from '@/components/Organisms/SettingsPanels/SettingsPanelGeneralTab'
import { SETTINGS_PANEL_LABELS } from '@/constantes/labels'

export default {
  title: 'Organisms/SettingsPanels/GeneralTab',
  component: SettingsPanelGeneralTab,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SettingsPanelGeneralTab },
  computed: {
    getLabels() {
      return SETTINGS_PANEL_LABELS.generalTab
    },
    getCommonLabels() {
      return SETTINGS_PANEL_LABELS.commons
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
    mockOptions() {
      return {
        displayLanguages: [
          {
            id: 1434,
            value: 'en',
            name: 'English',
          },
          {
            id: 1324,
            value: 'fr',
            name: 'Français',
          },
          {
            id: 1324,
            value: 'it',
            name: 'Italiano',
          },
        ],
        timezones: [
          {
            id: 434,
            value: 'gmt+1',
            name: 'GMT + 1',
          },
          {
            id: 1354524,
            value: 'gmt+2',
            name: 'GMT + 2',
          },
          {
            id: 132544,
            value: 'gmt+3',
            name: 'GMT + 3',
          },
        ],
        timeDisplayFormats: [
          {
            id: 123,
            value: '12',
            name: 'AM/PM',
          },
          {
            id: 4123,
            value: '24',
            name: '24H',
          },
        ],
        themes: [
          {
            id: 2354,
            value: 'dusk',
            name: 'Dusk',
          },
          {
            id: 235454,
            value: 'light',
            name: 'Light',
          },
        ],
      }
    },
  },
  template: `
    <div class='max-w-3xl mx-auto bg-light-white dark:bg-darker-blue'>
    <div class="bg-lighter-white dark:bg-dark-blue p-6">
      <settings-panel-general-tab :labels='getLabels' :common-labels='getCommonLabels' :values='mockValues' :options='mockOptions' />
    </div>
    </div>
  `,
})

export const Default = Template.bind({})
