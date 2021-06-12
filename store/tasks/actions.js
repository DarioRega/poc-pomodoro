import { TASK_URL } from '@/constantes/api'

export default {
  async addTask({ dispatch, commit }, payload) {
    try {
      const { data } = await this.$axios.post(TASK_URL, payload)
      return data
    } catch (err) {
      return err
    }
  },
}
