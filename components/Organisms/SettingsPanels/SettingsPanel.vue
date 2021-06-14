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
        :values="{ name: user.name, email: user.email }"
      />
      <settings-panel-pomodoro-config-tab
        v-if="currentActiveTab === stepsValues.POMODORO_CONFIG"
        :values="settingsValues.pomodoroConfigTab"
        @onPomodoroDurationChange="handlePomodoroDurationChange"
        @onSmallBreakDurationChange="handleSmallBreakDurationChange"
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

    <div v-show="canSave" class="mt-6 w-64 w-full mx-auto text-center">
      <brand-button
        name="save changes"
        class="w-full"
        :is-loading="isLoading"
        :is-disabled="isLoading"
        @click="handleSave"
      >
        {{ $t('Save changes') }}
      </brand-button>
    </div>
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
import { mapActions, mapGetters } from 'vuex'
import BrandButton from '@/components/Atoms/BrandButton'

const NOTIFICATION_ID_WARNING_CANNOT_EDIT_DEFAULT_SETTINGS =
  'settingsPanelNotificationWarningDefaultEdit'
export default {
  name: 'SettingsPanel',
  components: {
    SettingsPanelMainTabs,
    SettingsPanelGeneralTab,
    SettingsPanelAccountTab,
    SettingsPanelPomodoroConfigTab,
    SettingsPanelCurrentSubscriptionTab,
    BrandButton,
  },
  data() {
    return {
      currentActiveTab: '',
      settingsValues: {},
      hasUserTriggeredCreationCustomSettings: false,
      newSettingsPomodoro: {
        name: this.$t('My custom configuration'),
        values: {},
      },
      isLoading: false,
      shouldWatchChange: false,
    }
  },
  computed: {
    ...mapGetters({
      getSpecificNotification: 'globalState/getSpecificNotification',
      areStoreSettingsEmpty: 'settings/areSettingsEmpty',
      userSettingsValues: 'settings/getUserSettingsValues',
    }),
    user() {
      return this.$auth.user
    },
    canSave() {
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
    isWarningCannotEditDefaultSettingsNotificationExisting() {
      return this.getSpecificNotification(
        NOTIFICATION_ID_WARNING_CANNOT_EDIT_DEFAULT_SETTINGS
      )
    },
    isDefaultSettingsConfiguration() {
      // TODO verify how to know if it's the default config or user one
      return true
    },
  },
  watch: {
    areStoreSettingsEmpty(newValue, oldValue) {
      if (!newValue && !this.shouldWatchChange) this.shouldWatchChange = true
    },
    settingsValues: {
      deep: true,
      handler() {
        if (this.isDefaultSettingsConfiguration && this.shouldWatchChange) {
          if (!this.isWarningCannotEditDefaultSettingsNotificationExisting) {
            this.createWarningNotificationCantChangeDefaultSettings()
          }
        } else {
          this.$store.commit(
            'globalState/REMOVE_NOTIFICATION',
            NOTIFICATION_ID_WARNING_CANNOT_EDIT_DEFAULT_SETTINGS
          )
        }
      },
    },
  },

  mounted() {
    this.currentActiveTab = this.stepsValues.GENERAL
    if (!this.areStoreSettingsEmpty) {
      this.settingsValues = _.cloneDeep(this.userSettingsValues)

      // to avoid fire the watcher on mounted state, when no settings has been modified by user
      setTimeout(() => {
        this.shouldWatchChange = true
      }, 1000)
    }
  },
  methods: {
    ...mapActions({
      createNotification: 'globalState/createNotification',
    }),
    createWarningNotificationCantChangeDefaultSettings() {
      const notification = {
        notificationId: NOTIFICATION_ID_WARNING_CANNOT_EDIT_DEFAULT_SETTINGS,
        title: this.$t('Hold up...'),
        description: this.$t(
          "Your changes won't be saved, because you're editing the default settings."
        ),
        actionRequired: true,
        actionText: this.$t('Create custom settings'),
        confirmCallback: this.createCustomSettings,
        closeCallback: this.restoreEditedValues,
      }
      this.createNotification(notification)
    },
    restoreEditedValues() {
      this.shouldWatchChange = false
      this.settingsValues.pomodoroConfigTab = _.cloneDeep(
        this.userSettingsValues.pomodoroConfigTab
      )
      // to avoid fire the watcher on when we reset the data manually
      setTimeout(() => {
        this.shouldWatchChange = true
      }, 1000)
    },
    createCustomSettings() {
      this.hasUserTriggeredCreationCustomSettings = true
      this.newSettingsPomodoro.values = this.settingsValues.pomodoroConfigTab
    },
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
      this.settingsValues.generalTab.timeDisplayFormat = value
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
    handleSmallBreakDurationChange(value) {
      this.settingsValues.pomodoroConfigTab.small_break_duration = value
    },
    handleBigBreakDurationChange(value) {
      this.settingsValues.pomodoroConfigTab.big_break_duration = value
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
