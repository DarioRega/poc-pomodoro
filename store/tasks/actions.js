import {
  TASK_DELETE_ID_URL,
  TASK_STATUSES_URL,
  TASK_UPDATE_ID_URL,
  TASK_URL,
} from '@/constantes/api'

export default {
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

  async deleteTask({ dispatch, commit }, id) {
    try {
      await this.$axios.delete(TASK_DELETE_ID_URL(id))
    } catch (err) {
      // TODO notification
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
        task_status_id: payload.task_status_id,
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

  /*
    Single tasks
   */
  async getAndSetAllSingleTasks({ commit }) {
    try {
      const { data } = await this.$axios.get(TASK_URL)
      commit('SET_ALL_SINGLES_TASKS', data)
      return data
    } catch (err) {
      return err.response.data
    }
  },

  updateSingleTask({ dispatch, commit, getters }, payload) {
    if (getters.getSinglesCurrentTaskSelected.id === payload.id) {
      commit('UPDATE_CURRENT_TASK_SELECTED', payload)
    } else if (
      getters.getSinglesCurrentArchivedTaskSelected.id === payload.id
    ) {
      commit('UPDATE_CURRENT_ARCHIVED_TASK_SELECTED', payload)
    }

    commit('UPDATE_SINGLE_TASK', payload)
  },

  deleteSingleTask({ dispatch, commit, getters }, payload) {
    if (getters.getSinglesCurrentTaskSelected.id === payload.id) {
      commit('RESET_SINGLES_TASKS_CURRENT_TASK_SELECTED')
    } else if (
      getters.getSinglesCurrentArchivedTaskSelected.id === payload.id
    ) {
      commit('RESET_SINGLES_TASKS_CURRENT_ARCHIVED_TASK_SELECTED')
    }

    commit('DELETE_SINGLE_TASK', payload.id)
  },
}
