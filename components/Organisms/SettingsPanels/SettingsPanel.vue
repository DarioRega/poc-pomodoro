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
        v-if="currentActiveTab === stepsValues.GENERAL"
        :values="settingsValues.generalTab"
        :options="settingsOptions"
        @onDisplayLanguageChange="handleDisplayLanguageChange"
        @onTimezoneChange="handleTimezoneChange"
        @onTimeDisplayFormatChange="handleTimeDisplayFormatChange"
        @onThemeChange="handleThemeChange"
        @onBugReportsChange="handleBugReportChange"
        @onAnalyticsChange="handleAnalyticsChange"
      />
      <settings-panel-account-tab
        v-if="currentActiveTab === stepsValues.ACCOUNT"
        :values="settingsValues.accountTab"
      />
      <settings-panel-pomodoro-config-tab
        v-if="currentActiveTab === stepsValues.POMODORO_CONFIG"
        :values="settingsValues.pomodoroConfigTab"
        @onPomodoroDurationChange="handlePomodoroDurationChange"
        @onSmallBreakDurationChange="handleBigBreakDurationChange"
        @onBigBreakDurationChange="handleBigBreakDurationChange"
        @onPomodoroQuantityChange="handlePomodoroQuantityChange"
        @onNoiseNotificationChange="handleNoiseNotificationChange"
        @onStartPomodoroAutoChange="handleStartPomodoroAutoChange"
        @onStartSmallBreakAutoChange="handleStartSmallBreakAutoCharge"
        @onStartBigBreakAutoChange="handleStartBigBreakAutoChange"
      />
      <settings-panel-current-subscription-tab
        v-if="currentActiveTab === stepsValues.SUBSCRIPTION"
        :values="settingsValues.subscriptionTab"
      />
    </div>
    <settings-panel-save-or-reset-settings
      v-show="isSaveOrResetPossible"
      :has-reset="isDefaultSettingsConfiguration"
      :is-loading="isLoading"
      :save-changes-label="$t('Save changes')"
      :reset-default-label="$t('Reset to defaults')"
      @onSave="handleSave"
      @onReset="handleResetDefault"
    />
  </section>
</template>

<script>
import _ from 'lodash'
import SettingsPanelMainTabs from '@/components/Organisms/SettingsPanels/SettingsPanelMainTabs'
import SettingsPanelGeneralTab from '@/components/Organisms/SettingsPanels/SettingsPanelGeneralTab'
import SettingsPanelAccountTab from '@/components/Organisms/SettingsPanels/SettingsPanelAccountTab'
import SettingsPanelPomodoroConfigTab from '@/components/Organisms/SettingsPanels/SettingsPanelPomodoroConfigTab'
import SettingsPanelCurrentSubscriptionTab from '@/components/Organisms/SettingsPanels/SettingsPanelCurrentSubscriptionTab'

import { SETTINGS_PANEL_STEPS_VALUES } from '@/constantes'
import SettingsPanelSaveOrResetSettings from '@/components/Organisms/SettingsPanels/SettingsPanelSaveOrResetSettings'

export default {
  name: 'SettingsPanel',
  components: {
    SettingsPanelMainTabs,
    SettingsPanelGeneralTab,
    SettingsPanelAccountTab,
    SettingsPanelPomodoroConfigTab,
    SettingsPanelCurrentSubscriptionTab,
    SettingsPanelSaveOrResetSettings,
  },
  data() {
    return {
      currentActiveTab: '',
      settingsValues: {},
      isLoading: false,
    }
  },
  computed: {
    isSaveOrResetPossible() {
      switch (this.currentActiveTab) {
        case this.stepsValues.GENERAL:
          return true
        case this.stepsValues.POMODORO_CONFIG:
          return true
        default:
          return false
      }
    },
    settingsOptions() {
      return this.$store.state.settings.settingsOptions
    },
    stepsValues() {
      return SETTINGS_PANEL_STEPS_VALUES
    },
    isDefaultSettingsConfiguration() {
      // TODO verify how to know if it's the default config or user one
      return true
    },
  },

  mounted() {
    this.settingsValues = _.cloneDeep(this.$store.state.settings.settingsValues)
    this.currentActiveTab = this.stepsValues.GENERAL
  },
  methods: {
    /*
      Global events
    */
    handleSave() {
      // TODO action vuex
    },
    handleResetDefault() {
      // TODO pop confirm
      // reset to default general settings to show only on default configuration not user config
    },
    /*
      General tab events
    */
    handleDisplayLanguageChange(value) {
      this.settingsValues.generalTab.displayLanguage = value
    },
    handleTimezoneChange(value) {
      this.settingsValues.generalTab.timezone = value
    },
    handleTimeDisplayFormatChange(value) {
      this.settingsValues.generalTab.displayLanguage = value
    },
    handleThemeChange(value) {
      this.settingsValues.generalTab.theme = value
    },
    handleBugReportChange(value) {
      this.settingsValues.generalTab.bugReports = value
    },
    handleAnalyticsChange(value) {
      this.settingsValues.generalTab.analytics = value
    },

    /*
      Pomodoro config events
     */
    handlePomodoroDurationChange(value) {
      this.settingsValues.pomodoroConfigTab.pomodoro_duration = value
    },
    handleBigBreakDurationChange(value) {
      this.settingsValues.pomodoroConfigTab.small_break_duration = value
    },
    handlePomodoroQuantityChange(value) {
      this.settingsValues.pomodoroConfigTab.pomodoro_quantity = value
    },
    handleNoiseNotificationChange(value) {
      this.settingsValues.pomodoroConfigTab.noise_notification_end_process =
        value
    },
    handleStartPomodoroAutoChange(value) {
      this.settingsValues.pomodoroConfigTab.start_pomodoro_auto = value
    },
    handleStartSmallBreakAutoCharge(value) {
      this.settingsValues.pomodoroConfigTab.start_small_break_auto = value
    },
    handleStartBigBreakAutoChange(value) {
      this.settingsValues.pomodoroConfigTab.start_big_break_auto = value
    },
  },
}
</script>
