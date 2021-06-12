import { TASK_URL } from '@/constantes/api'

export default {
  async addTask({ dispatch, commit }, payload) {
    try {
      await this.$axios.post(TASK_URL, payload)
    } catch (err) {
      return err.response.data
    }
  },
}
