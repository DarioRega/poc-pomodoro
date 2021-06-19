import _ from 'lodash'

import { TIME_FORMAT_12H, TIME_FORMAT_24h } from '@/constantes'
import {
  POMODORO_DEFAULT_DURATION,
  USER_DEFAULT_SETTINGS,
} from '@/constantes/settings'
import { convertNumberInDuration } from '@/helpers/settings'
import { getNumberInAmountString } from '@/helpers/subscriptions'

export default {
  /*
    State mirroring
   */
  getUser: (state, getters, rootState) => {
    return rootState.auth.user || undefined
  },

  getUserSettingsValues: (state, getters) => {
    if (getters.getUser) {
      return getters.getUser.user_settings || USER_DEFAULT_SETTINGS
    }
  },

  getUserPomodoroSettingsValues: (state, getters) => {
    return getters.getUserSettingsValues.user_settings.pomodoro_session_setting
  },

  getUserAllPomodoroSettingsValues: (state, getters) => {
    if (getters.getUser.pomodoro_session_settings.length > 0) {
      return getters.getUser.pomodoro_session_settings
    }
    return []
  },

  /*
    Subscriptions
   */
  getUserReceipts: (state, getters) => {
    return getters.getUser.local_receipts || []
  },

  /*
    Specific property getters
   */
  getUserSettingTimezone: () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  },

  getTimeFormat: (state, getters) => {
    if (getters.getUser) {
      return getters.isUserUsing24HTimeFormat
        ? TIME_FORMAT_24h
        : TIME_FORMAT_12H
    }
    return TIME_FORMAT_24h
  },

  getUserNextConfigurationNumber(state, getters) {
    if (getters.getUser.pomodoro_session_settings) {
      return getters.getUser.pomodoro_session_settings.length + 1
    }
    return 1
  },

  getUserTheme: (state, getters) => {
    if (getters.getUser) {
      return getters.getUserSettingsValues.theme.toLowerCase()
    }
    return ''
  },

  getUserNameAndEmail: (state, getters) => {
    if (getters.getUser) {
      const { name, email } = getters.getUser
      return { name, email }
    }
    return ''
  },

  getUserPomodoroDuration: (state, getters) => {
    const user = getters.getUser
    if (user) {
      if (getters.getUserSettingsValues.pomodoro_session_setting) {
        const pomodoroDurationAsIntegerMinute =
          getters.getUserSettingsValues.pomodoro_session_setting
            .pomodoro_duration
        return convertNumberInDuration(pomodoroDurationAsIntegerMinute)
      }
    }
    return POMODORO_DEFAULT_DURATION
  },

  getCurrentInvoice: (state, getters) => {
    return getters.getUserReceipts[0]
  },

  /*
    Boolean
   */

  /*
    Subscription
   */
  isUserCurrentlyPremium: (state, getters) => {
    if (getters.getUser) {
      if (getters.getUser.subscriptions.length > 0) {
        return getters.getUser.subscriptions[0].stripe_status === 'active'
      }
      return false
    }
    return false
  },

  isCurrentSubscriptionMonthly: (state, getters) => {
    if (getters.getUser) {
      const currentSubscriptionAmount = getNumberInAmountString(
        getters.getCurrentInvoice.amount
      )
      if (currentSubscriptionAmount > 5) {
        return false
      }
      return true
    }
    return undefined
  },

  wasUserPremiumAtLeastOnce: (state, getters) => {
    if (getters.getUser) {
      return getters.getUser.subscriptions.length > 0
    }
    return false
  },

  /*
  Settings
 */
  areUserSettingsEmpty: (state, getters) => {
    if (getters.getUserSettingsValues) {
      return _.isEmpty(getters.getUserSettingsValues)
    }
    return true
  },

  isUserUsingPomodoroCustomSettings: (state, getters) => {
    if (getters.getUser) {
      if (getters.getUserSettingsValues.pomodoro_session_setting_id) {
        return true
      }
    }
    return false
  },

  isUserUsing24HTimeFormat: (state, getters) => {
    if (getters.getUser) {
      return getters.getUserSettingsValues.time_display_format === '24H'
    }
    return true
  },
}
