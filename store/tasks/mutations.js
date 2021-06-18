import Vue from 'vue'

export default {
  /*
    Singles current task selected
   */
  SET_SINGLES_TASKS_CURRENT_TASK_SELECTED_ID(state, id) {
    state.singles.currentTaskSelectedId = id
  },
  SET_SINGLES_TASKS_CURRENT_ARCHIVED_TASK_SELECTED_ID(state, id) {
    state.singles.currentArchivedTaskSelectedId = id
  },
  RESET_SINGLES_TASKS_CURRENT_TASK_SELECTED_ID(state) {
    state.singles.currentTaskSelectedId = ''
  },
  RESET_SINGLES_TASKS_CURRENT_ARCHIVED_TASK_SELECTED_ID(state) {
    state.singles.currentArchivedTaskSelectedId = ''
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
  SET_ALL_SINGLES_TASKS(state, payload) {
    state.singles.all = payload
  },

  SET_ALL_TASKS_STATUSES(state, payload) {
    state.statuses = payload
  },
}
