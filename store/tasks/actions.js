import { TASK_UPDATE_ID_URL, TASK_URL } from '@/constantes/api'

export default {
  async addTask({ dispatch, commit }, payload) {
    try {
      await this.$axios.post(TASK_URL, payload)
    } catch (err) {
      return err.response.data
    }
  },

  async updateTaskName({ dispatch, commit }, payload) {
    try {
      await this.$axios.post(TASK_UPDATE_ID_URL(payload.id), {
        name: payload.name,
      })
    } catch (err) {
      return err.response.data
    }
  },

  async updateTaskStatus({ dispatch, commit }, payload) {
    try {
      await this.$axios.post(TASK_UPDATE_ID_URL(payload.id), {
        status_id: payload.status_id,
      })
    } catch (err) {
      return err.response.data
    }
  },

  async updateTaskDeadline({ dispatch, commit }, payload) {
    try {
      await this.$axios.post(TASK_UPDATE_ID_URL(payload.id), {
        deadline: payload.deadline,
      })
    } catch (err) {
      return err.response.data
    }
  },

  async updateTaskDescription({ dispatch, commit }, payload) {
    try {
      await this.$axios.post(TASK_UPDATE_ID_URL(payload.id), {
        description: payload.description,
      })
    } catch (err) {
      return err.response.data
    }
  },
}
