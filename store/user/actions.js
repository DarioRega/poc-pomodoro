import {
  USER_SETTINGS_URL,
  USER_UPDATE_POMODORO_SETTINGS_ID_URL,
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
      notification.title = this.$t('Oups...')
      notification.type = 'error'
      notification.description = err.response.data.message
    } finally {
      dispatch('globalState/createNotification', notification, { root: true })
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
}
