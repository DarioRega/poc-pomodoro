import _ from 'lodash'

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

  getUserNextConfigurationNumber(state, getters) {
    if (getters.getUser.pomodoro_session_settings) {
      return getters.getUser.pomodoro_session_settings.length + 1
    }
    return 1
  },

  getUserTheme: (state, getters, rootState) => {
    const userStorage = rootState.auth.$storage.getState('user')
    if (userStorage) {
      return userStorage.user_settings.theme.toLowerCase()
      // return getters.getUser.user_settings.theme.toLowerCase()
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
    if (getters.getUser.user_settings.pomodoro_session_setting_id) {
      return true
    }
    return false
  },

  isAppMuted(state, getters, rootState) {
    return false
  },

  isUserUsing24HTimeFormat: (state, getters) => {
    return getters.getUser.user_settings.time_display_format === '24H'
  },
}
