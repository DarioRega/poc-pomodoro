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
        v-if="currentActiveTab === settingPanelStepsValues.GENERAL"
        :values="userSettingsValues"
        :selected-pomodoro-configuration="getSelectedPomodoroConfiguration"
        @onGeneralTabValueChange="onGeneralTabValueChange"
      />
      <settings-panel-account-tab
        v-if="currentActiveTab === settingPanelStepsValues.ACCOUNT"
        :values="{ name: user.name, email: user.email }"
      />
      <settings-panel-pomodoro-config-tab
        v-if="currentActiveTab === settingPanelStepsValues.POMODORO_CONFIG"
        :values="getPomodoroSettingsValues"
        :is-default-configuration="isDefaultPomodoroSettingsConfiguration"
        @onPomodoroConfigTabValueChange="onPomodoroConfigTabValueChange"
        @onCreateCustomSettings="createCustomSettings"
      />
      <settings-panel-current-subscription-tab
        v-if="currentActiveTab === settingPanelStepsValues.SUBSCRIPTION"
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
import {
  DEFAULT_POMODORO_SETTINGS_OPTION,
  DEFAULT_POMODORO_SETTINGS_OPTION_ID,
  POMODORO_DEFAULT_SETTINGS,
} from '@/constantes/settings'

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
      draftPomodoroSessionSettingsValues: {},
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
      isPomodoroSettingsIdNull: 'user/isPomodoroSettingsIdNull',
      userSettings: 'user/getUserSettingsValues',
      pomodoroSettings: 'user/getUserPomodoroSettingsValues',
      getUserAllPomodoroSettingsValues: 'user/getUserAllPomodoroSettingsValues',
      getUserNextConfigurationNumber: 'user/getUserNextConfigurationNumber',
    }),

    // When user create a config we must feed the pomodoro config tab with the draft object , else the settingsValues
    getPomodoroSettingsValues() {
      if (this.hasUserTriggeredCreationCustomSettings) {
        return this.draftPomodoroSessionSettingsValues
      } else {
        return this.pomodoroSessionSettingsValues
      }
    },

    getSelectedPomodoroConfiguration() {
      if (this.userSettingsValues.pomodoro_session_setting_id) {
        const { id, name } = this.pomodoroSessionSettingsValues
        return { id, name }
      }
      return DEFAULT_POMODORO_SETTINGS_OPTION(this.$i18n)
    },
    user() {
      return this.$auth.user
    },
    canSave() {
      switch (this.currentActiveTab) {
        case this.settingPanelStepsValues.GENERAL:
          return true
        case this.settingPanelStepsValues.POMODORO_CONFIG:
          return true
        default:
          return false
      }
    },
    settingPanelStepsValues() {
      return SETTINGS_PANEL_STEPS_VALUES
    },

    isDefaultPomodoroSettingsConfiguration() {
      return (
        !this.userSettingsValues.pomodoro_session_setting_id ||
        this.userSettingsValues.pomodoro_session_setting_id ===
          DEFAULT_POMODORO_SETTINGS_OPTION_ID
      )
    },
  },
  watch: {
    'userSettingsValues.pomodoro_session_setting_id'(newValue, oldValue) {
      // to avoid triggering on mounted lifecycle, we make sure was had a value before
      if (oldValue) {
        if (newValue !== DEFAULT_POMODORO_SETTINGS_OPTION_ID) {
          this.pomodoroSessionSettingsValues = _.cloneDeep(
            this.getUserAllPomodoroSettingsValues.find((x) => x.id === newValue)
          )
        } else {
          this.pomodoroSessionSettingsValues = {
            ...this.pomodoroSessionSettingsValues,
            ...DEFAULT_POMODORO_SETTINGS_OPTION(this.$i18n),
          }
        }

        // once the user change the select value, we reset the variable to be able to update again,
        // otherwise it will post everytime, see fn handleSave for detail
        if (this.hasUserTriggeredCreationCustomSettings) {
          this.hasUserTriggeredCreationCustomSettings = false
        }
      }
    },
  },

  mounted() {
    this.currentActiveTab = this.settingPanelStepsValues.GENERAL
    if (!this.areUserSettingsEmpty) {
      this.userSettingsValues = _.cloneDeep(this.userSettings)
    }
    if (!this.arePomodoroSettingsEmpty) {
      this.pomodoroSessionSettingsValues = _.cloneDeep(this.pomodoroSettings)
    } else {
      this.pomodoroSessionSettingsValues = {
        ...POMODORO_DEFAULT_SETTINGS,
        ...DEFAULT_POMODORO_SETTINGS_OPTION(this.$i18n),
      }
    }
    setTimeout(() => {
      this.shouldWatchChange = true
    }, 1000)
  },
  methods: {
    ...mapActions({
      createNotification: 'globalState/createNotification',
      createPomodoroSettings: 'user/createPomodoroSettings',
      updateUserSettings: 'user/updateSettings',
      updatePomodoroSettings: 'user/updatePomodoroSettings',
    }),

    /*
      Global events
    */
    handleSave() {
      if (this.currentActiveTab === this.settingPanelStepsValues.GENERAL) {
        this.handleUpdateUserSettings()
      }
      if (
        this.currentActiveTab === this.settingPanelStepsValues.POMODORO_CONFIG
      ) {
        if (this.hasUserTriggeredCreationCustomSettings) {
          this.handleCreatePomodoroSettings()
        } else {
          this.handleUpdatePomodoroSettings()
        }
      }
    },
    /*
      General tab events
    */
    onGeneralTabValueChange(value, property) {
      if (typeof value === 'object') {
        this.userSettingsValues[property] = value.id
      }
    },
    async handleUpdateUserSettings() {
      this.isLoading = true
      const payload = this.userSettingsValues
      if (this.isDefaultPomodoroSettingsConfiguration) {
        payload.pomodoro_session_setting_id = null
      }
      await this.updateUserSettings(this.userSettingsValues)
      this.isLoading = false
    },

    /*
      Pomodoro config events
     */
    onPomodoroConfigTabValueChange(value, property) {
      let settingsTarget = 'pomodoroSessionSettingsValues'
      if (this.hasUserTriggeredCreationCustomSettings) {
        settingsTarget = 'draftPomodoroSessionSettingsValues'
      }
      if (typeof value === 'object') {
        this[settingsTarget][property] = value.id
      } else {
        this[settingsTarget][property] = value
      }
    },
    async handleUpdatePomodoroSettings() {
      this.isLoading = true
      await this.updatePomodoroSettings(this.pomodoroSessionSettingsValues)
      this.isLoading = false
    },
    createCustomSettings() {
      // TODO kill notificatin if exist
      this.hasUserTriggeredCreationCustomSettings = true
      this.draftPomodoroSessionSettingsValues = {
        ...POMODORO_DEFAULT_SETTINGS,
        id: getRandomNumber(),
        name: `${this.$t('My custom configuration')} #${
          this.getUserNextConfigurationNumber
        }`,
      }
    },
  },
}
</script>
