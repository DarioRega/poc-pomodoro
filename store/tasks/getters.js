export default {
  isTaskIncludedInCurrentProjectSelected: (state) => (task) => {
    return state.currentProjectSelected.id === task.project_id
  },
  /*
    Singles tasks only
   */
  getSinglesCurrentTaskSelected: (state) => {
    return state.singles.currentTaskSelected
  },
  getSinglesCurrentArchivedTaskSelected: (state) => {
    return state.singles.currentArchivedTaskSelected
  },
}
