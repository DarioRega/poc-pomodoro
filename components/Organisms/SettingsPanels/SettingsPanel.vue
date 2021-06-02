<template>
  <section class="w-full h-full">
    <settings-panel-main-tabs
      :current-active-tab="currentActiveTab"
      class="my-6"
      @onTabChange="currentActiveTab = $event"
    />
    <div
      class="
        bg-lighter-white
        dark:bg-dark-blue
        p-6
        rounded-md
        min-h-[40rem]
        max-h-[40rem]
        overflow-y-auto
      "
    >
      <settings-panel-general-tab
        v-if="currentActiveTab === steps.GENERAL"
        :labels="labels.generalTab"
        :common-labels="labels.commons"
        :values="mockValues.generalTab"
        :options="mockOptions"
      />
      <settings-panel-account-tab
        v-if="currentActiveTab === steps.ACCOUNT"
        :labels="labels.accountTab"
        :common-labels="labels.commons"
        :values="mockValues.accountTab"
      />
      <settings-panel-pomodoro-config-tab
        v-if="currentActiveTab === steps.POMODORO_CONFIG"
        :labels="labels.pomodoroConfigTab"
        :common-labels="labels.commons"
        :values="mockValues.pomodoroConfigTab"
      />
      <settings-panel-current-subscription-tab
        v-if="currentActiveTab === steps.SUBSCRIPTION"
        :labels="labels.subscriptionTab"
        :common-labels="labels.commons"
        :values="mockValues.subscriptionTab"
      />
    </div>
  </section>
</template>

<script>
import SettingsPanelMainTabs from '@/components/Organisms/SettingsPanels/SettingsPanelMainTabs'
import SettingsPanelGeneralTab from '@/components/Organisms/SettingsPanels/SettingsPanelGeneralTab'
import SettingsPanelAccountTab from '@/components/Organisms/SettingsPanels/SettingsPanelAccountTab'
import SettingsPanelPomodoroConfigTab from '@/components/Organisms/SettingsPanels/SettingsPanelPomodoroConfigTab'
import SettingsPanelCurrentSubscriptionTab from '@/components/Organisms/SettingsPanels/SettingsPanelCurrentSubscriptionTab'

import { SETTINGS_PANEL_STEPS, SETTINGS_PANEL_STEPS_VALUES } from '@/constantes'
import { SETTINGS_PANEL_LABELS } from '@/constantes/labels'

export default {
  name: 'SettingsPanel',
  components: {
    SettingsPanelMainTabs,
    SettingsPanelGeneralTab,
    SettingsPanelAccountTab,
    SettingsPanelPomodoroConfigTab,
    SettingsPanelCurrentSubscriptionTab,
  },
  data() {
    return {
      currentActiveTab: '',
    }
  },
  computed: {
    labels() {
      return SETTINGS_PANEL_LABELS
    },
    mockValues() {
      // TODO getter from store where settings are saved
      return {
        generalTab: {
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
        },
        accountTab: {
          fullName: 'Dario Regazzoni',
          email: 'dario.regazzoni@outlook.fr',
          password: 'proutkaka',
        },
        pomodoroConfigTab: {
          pomodoro_duration: 25,
          small_break_duration: 5,
          big_break_duration: 15,
          pomodoro_quantity: 5,
          noise_notification_end_process: false,
          start_pomodoro_auto: true,
          start_small_break_auto: true,
          start_big_break_auto: false,
        },
        subscriptionTab: {
          //
        },
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
            id: 132544,
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
    steps() {
      return SETTINGS_PANEL_STEPS_VALUES
    },
  },
  beforeMount() {
    this.currentActiveTab = SETTINGS_PANEL_STEPS[3].step
  },
}
</script>
