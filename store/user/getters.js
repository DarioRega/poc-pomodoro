import _ from 'lodash'
import { TIME_FORMAT_12H, TIME_FORMAT_24h } from '@/constantes'

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

  /*
    Boolean
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
