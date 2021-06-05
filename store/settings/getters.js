import {
  SETTINGS_PANEL_STEPS_VALUES,
  SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES,
} from '@/constantes'

export default {
  getIsUserSettings24hTimeFormatDisplay: (state) => {
    return false
  },
  getUserSettingTimezone: (state) => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  },
  isAppMuted: (state) => {
    return state.settingsValues.pomodoroConfigTab.noise_notification_end_process
  },
  getSettingsPanelSteps: (state) => (i18n) => {
    // TODO try to be able to use i18n in state of getter for settings panel tabs

    return [
      {
        step: SETTINGS_PANEL_STEPS_VALUES.GENERAL,
        name: i18n.t('General'),
      },
      {
        step: SETTINGS_PANEL_STEPS_VALUES.ACCOUNT,
        name: i18n.t('Account'),
      },
      {
        step: SETTINGS_PANEL_STEPS_VALUES.POMODORO_CONFIG,
        name: i18n.t('Pomodoro configuration'),
      },
      {
        step: SETTINGS_PANEL_STEPS_VALUES.SUBSCRIPTION,
        name: i18n.t('Subscription'),
      },
      // NOT AN MVP FEATURE, but have to be implemented on v2
      //   step: SETTINGS_PANEL_STEPS_VALUES.ABOUT,
      //   name: i18n.t('About'),
      // },
      // {
      //   step: SETTINGS_PANEL_STEPS_VALUES.HELP,
      //   name: i18n.t('Help'),
      // },
    ]
  },
  getSubscriptionsSettingsPanelSteps: (state) => (i18n) => {
    return [
      {
        step: SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES.OVERVIEW,
        name: i18n.t('Overview'),
      },
      {
        step: SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES.ESTIMATE_OF_INVOICE,
        name: i18n.t('Estimate of the invoice'),
      },
      {
        step: SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES.INVOICE_INFORMATIONS,
        name: i18n.t('Invoice informations'),
      },
      {
        step: SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES.BILLING_HISTORY,
        name: i18n.t('Billing history'),
      },
      {
        step: SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES.CURRENT_SUBSCRIPTION,
        name: i18n.t('Current subscription'),
      },
    ]
  },
}
