import _ from 'lodash'
import { TIME_FORMAT_12H, TIME_FORMAT_24h } from '@/constantes'
import { getNumberInAmountString } from '@/helpers/subscriptions'

export default {
  /*
    State mirroring
   */
  getUser: (state, getters, rootState) => {
    return rootState.auth.user
  },

  getUserSettingsValues: (state, getters) => {
    return getters.getUser.user_settings
  },

  getUserPomodoroSettingsValues: (state, getters, rootState) => {
    return getters.getUser.user_settings.pomodoro_session_setting
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
    return [
      {
        id: 2,
        user_id: '93b0a25a-12d8-4493-900a-04c2abf4b23f',
        provider_id: 'in_1J3fLTJEbl1PKejzGFhWhLdl',
        amount: 'CHF 44.27',
        tax: 'CHF 0',
        paid_at: '2021-06-18 10:54:43',
        created_at: '2021-06-18T10:54:48.000000Z',
        updated_at: '2021-06-18T10:54:48.000000Z',
      },
      {
        id: 1,
        user_id: '93b0a25a-12d8-4493-900a-04c2abf4b23f',
        provider_id: 'in_1J363fJEbl1PKejzsxaU9gmI',
        amount: 'CHF 4.99',
        tax: 'CHF 0',
        paid_at: '2021-06-16 21:13:59',
        created_at: '2021-06-16T21:14:03.000000Z',
        updated_at: '2021-06-16T21:14:03.000000Z',
      },
    ]
  },

  /*
    Specific property getters
   */
  getUserSettingTimezone: (state) => {
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
      return getters.getUser.user_settings.theme.toLowerCase()
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
    if (getters.getUser.user_settings) {
      return _.isEmpty(getters.getUser.user_settings)
    }
    return true
  },

  isUserUsingPomodoroCustomSettings: (state, getters) => {
    if (getters.getUser) {
      if (getters.getUser.user_settings.pomodoro_session_setting_id) {
        return true
      }
    }
    return false
  },

  isUserUsing24HTimeFormat: (state, getters) => {
    if (getters.getUser) {
      return getters.getUser.user_settings.time_display_format === '24H'
    }
    return true
  },
}
