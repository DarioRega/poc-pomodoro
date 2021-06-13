export default {
  getTaskById: (state) => (taskId) => {
    const task = state.all.filter((x) => x.id === taskId)[0]
    return task || {}
  },
  isTaskIncludedInCurrentProjectSelected: (state) => (task) => {
    return state.currentProjectSelected.id === task.project_id
  },
  getCurrentTaskSelected: (state) => {
    return state.singles.currentTaskSelected
  },
}
