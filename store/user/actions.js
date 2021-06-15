import { USER_SETTINGS_URL } from '@/constantes/api'

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

}
