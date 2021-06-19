import {
  USER_DELETE_POMODORO_SETTINGS_ID_URL,
  USER_POMODORO_SETTINGS_URL,
  USER_SETTINGS_URL,
  USER_UPDATE_PASSWORD_URL,
  USER_UPDATE_POMODORO_SETTINGS_ID_URL,
  USER_UPDATE_PROFILE_INFORMATION_URL,
} from '@/constantes/api'

export default {
  async updateSettings({ dispatch }, payload) {
    const notification = {
      title: this.$i18n.t('Settings edited !'),
      type: 'success',
    }
    try {
      await this.$axios.post(USER_SETTINGS_URL, payload)
    } catch (err) {
      notification.title = this.$i18n.t('Oups...')
      notification.type = 'error'
      notification.description = err.response.data.message
    } finally {
      dispatch('globalState/createNotification', notification, {
        root: true,
      })
    }
  },

  async updatePomodoroSettings({ dispatch }, payload) {
    const notification = {
      title: this.$i18n.t('Pomodoro configuration edited !'),
      type: 'success',
    }
    try {
      await this.$axios.post(
        USER_UPDATE_POMODORO_SETTINGS_ID_URL(payload.id),
        payload
      )
    } catch (err) {
      notification.title = this.$i18n.t('Oups...')
      notification.type = 'error'
      notification.description = err.response.data.message
    } finally {
      dispatch('globalState/createNotification', notification, {
        root: true,
      })
    }
  },

  async createPomodoroSettings({ dispatch }, payload) {
    const notification = {
      title: this.$i18n.t('Pomodoro configuration created !'),
      type: 'success',
    }
    delete payload.id
    try {
      await this.$axios.post(USER_POMODORO_SETTINGS_URL, payload)
    } catch (err) {
      notification.title = this.$i18n.t('Oups...')
      notification.type = 'error'
      notification.description = err.response.data.message
    } finally {
      dispatch('globalState/createNotification', notification, {
        root: true,
      })
    }
  },

  onDeletePomodoroSettingClick({ dispatch }, id) {
    const notification = {
      title: this.$i18n.t('Delete configuration ?'),
      description: this.$i18n.t(
        "Are you sure to delete it  You can't reverse it afterward ?"
      ),
      actionRequired: true,
      confirmCallback: () => dispatch('deleteCustomPomodoroSetting', id),
    }
    dispatch('globalState/createNotification', notification, { root: true })
  },

  async deleteCustomPomodoroSetting({ dispatch }, id) {
    const notification = {
      title: this.$i18n.t('Pomodoro configuration deleted !'),
      type: 'success',
    }
    try {
      await this.$axios.delete(USER_DELETE_POMODORO_SETTINGS_ID_URL(id))
      await this.$auth.fetchUser()
    } catch (err) {
      notification.title = this.$i18n.t('Oups...')
      notification.type = 'error'
      notification.description = err.response.data.message
    } finally {
      dispatch('globalState/createNotification', notification, {
        root: true,
      })
    }
  },

  /*
    User profile
   */
  async updateUserProfileInformation({ dispatch }, payload) {
    const notification = {
      title: this.$i18n.t('Profile updated !'),
      type: 'success',
    }
    try {
      await this.$axios.put(`${USER_UPDATE_PROFILE_INFORMATION_URL}`, payload)
      await this.$auth.fetchUser()
    } catch (err) {
      notification.title = this.$i18n.t('Oups...')
      notification.type = 'error'
      notification.description = err.response.data.message
      return err.response
    } finally {
      dispatch('globalState/createNotification', notification, {
        root: true,
      })
    }
  },

  async updateUserPassword({ dispatch }, payload) {
    const notification = {
      title: this.$i18n.t('Password changed !'),
      type: 'success',
    }
    try {
      await this.$axios.put(`${USER_UPDATE_PASSWORD_URL}`, payload)
      await this.$auth.fetchUser()
    } catch (err) {
      notification.title = this.$i18n.t('Oups...')
      notification.type = 'error'
      notification.description = err.response.data.message
      return err.response
    } finally {
      dispatch('globalState/createNotification', notification, {
        root: true,
      })
    }
  },
}
