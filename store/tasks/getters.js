export default {
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
