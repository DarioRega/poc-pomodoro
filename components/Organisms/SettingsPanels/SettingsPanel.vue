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
        :values="getUserNameAndEmail"
      />
      <settings-panel-pomodoro-config-tab
        v-if="currentActiveTab === settingPanelStepsValues.POMODORO_CONFIG"
        :values="getPomodoroSettingsValues"
        :is-pomodoro-setting-name-editable="isPomodoroSettingNameEditable"
        @onPomodoroConfigTabValueChange="onPomodoroConfigTabValueChange"
        @onCreateCustomSettings="createCustomSettings"
      />
      <settings-panel-current-subscription-tab
        v-if="currentActiveTab === settingPanelStepsValues.SUBSCRIPTION"
        :values="{}"
      />
    </div>

    <div
      v-show="shouldShowSaveButton"
      class="mt-6 w-64 w-full mx-auto text-center"
    >
      <brand-button
        name="save changes"
        class="w-full"
        :is-loading="isLoading"
        :is-disabled="isLoading || isButtonSaveShouldBeDisabled"
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

      userSettingsValues: {},

      pomodoroSessionSettingsValues: {},
      draftPomodoroSessionSettingsValues: {},

      isLoading: false,
      hasUserTriggeredCreationCustomSettings: false,
    }
  },

  computed: {
    ...mapGetters({
      // store property
      userSettings: 'user/getUserSettingsValues',
      pomodoroSettings: 'user/getUserPomodoroSettingsValues',

      // specific getters
      getUserAllPomodoroSettingsValues: 'user/getUserAllPomodoroSettingsValues',
      getUserNextConfigurationNumber: 'user/getUserNextConfigurationNumber',
      getSpecificNotification: 'globalState/getSpecificNotification',

      // specific getters only boolean
      areUserSettingsEmpty: 'user/areUserSettingsEmpty',
      getUserNameAndEmail: 'user/getUserNameAndEmail',
      isUserUsingPomodoroCustomSettings:
        'user/isUserUsingPomodoroCustomSettings',
    }),

    /*
      Pomodoro session settings related
    */
    // When user create a config we must feed the pomodoro config tab with the draft object , else the settingsValues
    getPomodoroSettingsValues() {
      if (this.hasUserTriggeredCreationCustomSettings) {
        return this.draftPomodoroSessionSettingsValues
      } else {
        return this.pomodoroSessionSettingsValues
      }
    },
    hasUserSelectedLocalDefaultPomodoroConfigurationOption() {
      return (
        this.userSettingsValues.pomodoro_session_setting_id ===
        DEFAULT_POMODORO_SETTINGS_OPTION_ID
      )
    },

    getSelectedPomodoroConfiguration() {
      if (this.userSettingsValues.pomodoro_session_setting_id) {
        const { id, name } = this.pomodoroSessionSettingsValues
        return { id, name }
      }
      return DEFAULT_POMODORO_SETTINGS_OPTION(this.$i18n)
    },

    /*
      Template conditional render
    */
    shouldShowSaveButton() {
      switch (this.currentActiveTab) {
        case this.settingPanelStepsValues.GENERAL:
          return true
        case this.settingPanelStepsValues.POMODORO_CONFIG:
          return true
        default:
          return false
      }
    },

    isButtonSaveShouldBeDisabled() {
      if (this.currentActiveTab === SETTINGS_PANEL_STEPS_VALUES.GENERAL) {
        return false
      }
      if (this.draftPomodoroSessionSettingsValues.id) {
        return false
      }
      return this.hasUserSelectedLocalDefaultPomodoroConfigurationOption
    },

    isPomodoroSettingNameEditable() {
      return (
        !this.hasUserSelectedLocalDefaultPomodoroConfigurationOption ||
        this.hasUserTriggeredCreationCustomSettings
      )
    },

    /*
      Modal tabs related
    */
    settingPanelStepsValues() {
      return SETTINGS_PANEL_STEPS_VALUES
    },
  },

  watch: {
    /*
      Store user settings value
      when it get updated, refresh the local userSettingsValues as did in mounted lifecycle (readonly)
     */
    'userSettings.pomodoro_session_setting_id'(newValue, oldValue) {
      this.setLocalUserSettingsWithStoreValues()
    },

    /*
      Local user settings value (editable)
    */
    'userSettingsValues.pomodoro_session_setting_id'(newValue, oldValue) {
      // to avoid triggering on mounted lifecycle, we make sure was had a value before
      if (newValue && newValue !== DEFAULT_POMODORO_SETTINGS_OPTION_ID) {
        this.findCustomPomodoroSettingAndSetAsValue(newValue)
      } else {
        this.setPomodoroSettingsWithDefaultValue()
      }
    },

    // if user create a pomodoro setting and then switch without saving, we erase it
    currentActiveTab() {
      if (this.draftPomodoroSessionSettingsValues.id) {
        this.resetCreationProcess()
      }
    },
  },

  mounted() {
    this.currentActiveTab = this.settingPanelStepsValues.GENERAL

    if (!this.areUserSettingsEmpty) {
      this.setLocalUserSettingsWithStoreValues()
    }

    this.verifyIfUserHasNoPomodoroSettingsAndSetUserSettingPomodoroIdToDefault()
    this.initPomodoroSettingsValues()
  },
  methods: {
    ...mapActions({
      createNotification: 'globalState/createNotification',
      createPomodoroSettings: 'user/createPomodoroSettings',
      updateUserSettings: 'user/updateSettings',
      updatePomodoroSettings: 'user/updatePomodoroSettings',
      onDeletePomodoroSettingClick: 'user/onDeletePomodoroSettingClick',
      deleteCustomPomodoroSetting: 'user/deleteCustomPomodoroSetting',
    }),

    /*
      Global events related
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
      Global methods related
    */
    verifyIfUserHasNoPomodoroSettingsAndSetUserSettingPomodoroIdToDefault() {
      if (!this.isUserUsingPomodoroCustomSettings) {
        this.userSettingsValues.pomodoro_session_setting_id =
          DEFAULT_POMODORO_SETTINGS_OPTION_ID
      }
    },

    resetCreationProcess() {
      this.hasUserTriggeredCreationCustomSettings = false
      this.draftPomodoroSessionSettingsValues = {}
    },

    setLocalUserSettingsWithStoreValues() {
      this.userSettingsValues = _.cloneDeep(this.userSettings)
      this.verifyIfUserHasNoPomodoroSettingsAndSetUserSettingPomodoroIdToDefault()
    },

    initPomodoroSettingsValues() {
      if (this.isUserUsingPomodoroCustomSettings) {
        this.pomodoroSessionSettingsValues = _.cloneDeep(this.pomodoroSettings)
      } else {
        this.setPomodoroSettingsWithDefaultValue()
      }
    },

    setPomodoroSettingsWithDefaultValue() {
      this.pomodoroSessionSettingsValues = {
        ...POMODORO_DEFAULT_SETTINGS,
        ...DEFAULT_POMODORO_SETTINGS_OPTION(this.$i18n),
      }
    },

    findCustomPomodoroSettingAndSetAsValue(id) {
      this.pomodoroSessionSettingsValues = _.cloneDeep(
        this.getUserAllPomodoroSettingsValues.find((x) => x.id === id)
      )
    },

    /*
      General tab related
    */
    onGeneralTabValueChange(value, property) {
      if (typeof value === 'object') {
        this.userSettingsValues[property] = value.id
      }
    },

    async handleUpdateUserSettings() {
      this.isLoading = true
      const payload = this.userSettingsValues
      if (this.hasUserSelectedLocalDefaultPomodoroConfigurationOption) {
        payload.pomodoro_session_setting_id = null
      }

      await this.updateUserSettings(this.userSettingsValues)
      await this.$auth.fetchUser()

      this.isLoading = false
    },

    /*
      Pomodoro config related
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

    async handleCreatePomodoroSettings() {
      this.isLoading = true

      await this.createPomodoroSettings(this.draftPomodoroSessionSettingsValues)
      await this.$auth.fetchUser()

      this.resetCreationProcess()
      this.isLoading = false
    },

    async handleUpdatePomodoroSettings() {
      this.isLoading = true

      await this.updatePomodoroSettings(this.pomodoroSessionSettingsValues)
      await this.$auth.fetchUser()

      this.isLoading = false
    },

    createCustomSettings() {
      // TODO kill notificatin if exist
      const customSettingDefaultName = `${this.$t(
        'My custom configuration'
      )} #${this.getUserNextConfigurationNumber}`

      this.hasUserTriggeredCreationCustomSettings = true

      this.draftPomodoroSessionSettingsValues = {
        ...POMODORO_DEFAULT_SETTINGS,
        id: getRandomNumber(),
        name: customSettingDefaultName,
      }
    },
  },
}
</script>
