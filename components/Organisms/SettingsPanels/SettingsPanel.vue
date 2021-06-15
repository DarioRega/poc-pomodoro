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
        :values="userSettingsValues"
        :options="settingsOptions"
        :selected-pomodoro-configuration="getSelectedPomodoroConfiguration"
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
        :values="{}"
        :configuration-name="configurationName"
        :is-default-configuration="isDefaultPomodoroSettingsConfiguration"
        @change="configurationName = $event"
        @onCreateCustomSettings="createCustomSettings"
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
        :values="{}"
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
import { mapActions, mapGetters } from 'vuex'

import SettingsPanelMainTabs from '@/components/Organisms/SettingsPanels/SettingsPanelMainTabs'
import SettingsPanelGeneralTab from '@/components/Organisms/SettingsPanels/SettingsPanelGeneralTab'
import SettingsPanelAccountTab from '@/components/Organisms/SettingsPanels/SettingsPanelAccountTab'
import SettingsPanelPomodoroConfigTab from '@/components/Organisms/SettingsPanels/SettingsPanelPomodoroConfigTab'
import SettingsPanelCurrentSubscriptionTab from '@/components/Organisms/SettingsPanels/SettingsPanelCurrentSubscriptionTab'
import BrandButton from '@/components/Atoms/BrandButton'
import { SETTINGS_PANEL_STEPS_VALUES } from '@/constantes'
import { getRandomNumber } from '@/helpers'

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
      configurationName: '',
      userSettingsValues: {},
      pomodoroSessionSettingsValues: {},
      hasUserTriggeredCreationCustomSettings: false,
      newSettingsPomodoroValues: {},
      isLoading: false,
      shouldWatchChange: false,
    }
  },
  computed: {
    ...mapGetters({
      getSpecificNotification: 'globalState/getSpecificNotification',
      areUserSettingsEmpty: 'user/areUserSettingsEmpty',
      arePomodoroSettingsEmpty: 'user/arePomodoroSettingsEmpty',
      userSettings: 'user/getUserSettingsValues',
      pomodoroSettings: 'user/getUserPomodoroSettingsValues',
    }),
    getSelectedPomodoroConfiguration() {
      if (
        this.arePomodoroSettingsEmpty &&
        _.isEmpty(this.pomodoroSessionSettingsValues)
      ) {
        return {
          id: getRandomNumber(),
          name: this.$t('Default configuration'),
        }
      } else {
        const { id, name } = this.pomodoroSessionSettingsValues
        return { id, name }
      }
    },
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
      // TODO constantes with enums values for settings
      return []
    },
    stepsValues() {
      return SETTINGS_PANEL_STEPS_VALUES
    },

    isDefaultPomodoroSettingsConfiguration() {
      return this.userSettingsValues.pomodoro_session_setting_id === null
    },
  },

  mounted() {
    this.currentActiveTab = this.stepsValues.GENERAL
    if (!this.areUserSettingsEmpty) {
      this.userSettingsValues = _.cloneDeep(this.userSettings)
    }
    if (!this.arePomodoroSettingsEmpty) {
      this.pomodoroSessionSettingsValues = _.cloneDeep(this.pomodoroSettings)
    }
    setTimeout(() => {
      this.shouldWatchChange = true
    }, 1000)
  },
  methods: {
    ...mapActions({
      createNotification: 'globalState/createNotification',
      createPomodoroSettings: 'user/createPomodoroSettings',
      updateUserSettingsWithCustomPomodoroConfig:
        'user/updateUserSettingsWithCustomPomodoroConfig',
      updateUserSettingsWithDefaultPomodoroConfig:
        'user/updateUserSettingsWithDefaultPomodoroConfig',
    }),

    /*
      Global events
    */
    handleSave() {
      // TODO action vuex
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
