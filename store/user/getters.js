import _ from 'lodash'

export default {
  getUser: (state, getters, rootState) => {
    return rootState.auth.user
  },
  getIsUserSettings24hTimeFormatDisplay: (state, getters) => {
    return getters.getUser.user_settings.time_display_format === '24H'
  },
  getUserSettingTimezone: (state) => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  },
  getUserSettingsValues: (state, getters) => {
    return getters.getUser.user_settings
  },
  getUserAllPomodoroSettingsValues: (state, getters) => {
    if (getters.getUser.pomodoro_session_settings.length > 0) {
      return getters.getUser.pomodoro_session_settings
    }
    return []
  },
  getUserPomodoroSettingsValues: (state, getters, rootState) => {
    return getters.getUser.user_settings.pomodoro_session_setting
  },
  areUserSettingsEmpty: (state, getters) => {
    if (getters.getUser.user_settings) {
      return _.isEmpty(getters.getUser.user_settings)
    }
    return true
  },
  arePomodoroSettingsEmpty: (state, getters) => {
    if (getters.getUser.pomodoro_session_setting) {
      return false
    }
    return true
  },
  isPomodoroSettingsIdNull: (state, getters) => {
    if (getters.getUser.pomodoro_session_setting_id) {
      return false
    }
    return true
  },

  getUserNextConfigurationNumber(state, getters) {
    if (getters.getUser.pomodoro_session_settings) {
      return getters.getUser.pomodoro_session_settings.length + 1
    }
    return 1
  },

  isAppMuted(state, getters, rootState) {
    return false
  },
}
