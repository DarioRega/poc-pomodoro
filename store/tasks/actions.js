import {
  TASK_STATUSES_URL,
  TASK_UPDATE_ID_URL,
  TASK_URL,
} from '@/constantes/api'

export default {
  async getAndSetAllSingleTasks({ commit }) {
    try {
      const { data } = await this.$axios.get(TASK_URL)
      commit('SET_ALL_SINGLES_TASKS', data)
      return data
    } catch (err) {
      return err.response.data
    }
  },

  async getAndSetAllTaskStatuses({ commit }) {
    try {
      const { data } = await this.$axios.get(TASK_STATUSES_URL)
      commit('SET_ALL_TASKS_STATUSES', data)
      return data
    } catch (err) {
      return err.response.data
    }
  },

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
