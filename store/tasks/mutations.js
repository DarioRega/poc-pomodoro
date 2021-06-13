import Vue from 'vue'

export default {
  /*
    Current task selected
   */
  SET_SINGLES_TASKS_CURRENT_TASK_SELECTED(state, task) {
    state.singles.currentTaskSelected = task
  },
  SET_SINGLES_TASKS_CURRENT_ARCHIVED_TASK_SELECTED(state, task) {
    state.singles.currentArchivedTaskSelected = task
  },

  /*
    Current project selected
   */
  SET_CURRENT_SELECTED_PROJECT(state, projectId) {
    // TODO v2
  },

  PUSH_TASK_IN_CURRENT_PROJECT_SELECTED(state, task) {
    state.allCurrentProject.push(task)
  },
  UPDATE_TASK_IN_CURRENT_PROJECT_SELECTED(state, task) {
    const taskToUpdateIndex = state.currentProjectSelected.all.findIndex(
      (x) => x.id === task.id
    )
    Vue.set(state.currentProjectSelected.all, taskToUpdateIndex, task)
  },
  UPDATE_CURRENT_TASK_SELECTED(state, task) {
    state.singles.currentTaskSelected = {
      ...state.singles.currentTaskSelected,
      task,
    }
  },

  /*
  Tasks CRUD
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

  SET_ALL_SINGLES_TASKS(state, payload) {
    state.singles.all = payload
  },

  SET_ALL_TASKS_STATUSES(state, payload) {
    state.statuses = payload
  },
}
