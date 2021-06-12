export default {
  /*
    Current task selected
   */
  SET_CURRENT_SELECTED_TASK(state, task) {
    state.currentTaskSelected = task
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

  /*
  Tasks CRUD
   */
  ADD_SINGLE_TASK(state, task) {
    state.allSingles.push(task)
  },

  UPDATE_SINGLE_TASK(state, task) {
    state.allSingles = state.allSingles.map((stateTask) => {
      if (stateTask.id === task.id) {
        return task
      }
      return stateTask
    })
  },
}
