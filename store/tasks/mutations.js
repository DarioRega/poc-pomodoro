import Vue from 'vue'

export default {
  /*
    Singles current task selected
   */
  SET_SINGLES_TASKS_CURRENT_TASK_SELECTED(state, task) {
    state.singles.currentTaskSelected = task
  },
  SET_SINGLES_TASKS_CURRENT_ARCHIVED_TASK_SELECTED(state, task) {
    state.singles.currentArchivedTaskSelected = task
  },
  RESET_SINGLES_TASKS_CURRENT_TASK_SELECTED(state) {
    state.singles.currentTaskSelected = {}
  },
  RESET_SINGLES_TASKS_CURRENT_ARCHIVED_TASK_SELECTED(state) {
    state.singles.currentArchivedTaskSelected = {}
  },

  UPDATE_CURRENT_TASK_SELECTED(state, task) {
    state.singles.currentTaskSelected = {
      ...state.singles.currentTaskSelected,
      task,
    }
  },
  UPDATE_CURRENT_ARCHIVED_TASK_SELECTED(state, task) {
    state.singles.currentArchivedTaskSelected = {
      ...state.singles.currentArchivedTaskSelected,
      task,
    }
  },

  /*
  Singles Tasks CRUD
   */
  ADD_SINGLE_TASK(state, task) {
    state.singles.all.push(task)
  },

  UPDATE_SINGLE_TASK(state, task) {
    const taskToUpdateIndex = state.singles.all.findIndex(
      (x) => x.id === task.id
    )
    Vue.set(state.singles.all, taskToUpdateIndex, task)
  },

  DELETE_SINGLE_TASK(state, id) {
    const taskToUpdateIndex = state.singles.all.findIndex((x) => x.id === id)
    state.singles.all.splice(taskToUpdateIndex, 1)
  },

  /*
    Global
   */
  SET_ALL_TASKS(state, payload) {
    state.all = payload
  },

  SET_ALL_SINGLES_TASKS(state, payload) {
    state.singles.all = payload
  },

  SET_ALL_TASKS_STATUSES(state, payload) {
    state.statuses = payload
  },
}
