import { TASK_STATUS_VALUES } from '@/constantes'

export default {
  getUserTotalTasksAmount: (state) => {
    return state.all.length
  },

  /*
    Singles tasks only
   */
  getSinglesCurrentTaskSelected: (state) => {
    return (
      state.singles.all.find(
        (x) => x.id === state.singles.currentTaskSelectedId
      ) || {}
    )
  },
  getSinglesCurrentArchivedTaskSelected: (state) => {
    return (
      state.singles.all.find(
        (x) => x.id === state.singles.currentArchivedTaskSelectedId
      ) || {}
    )
  },
  getCurrentTaskRunning: (state) => {
    return state.currentTaskRunning
  },

  getAllCurrentTabTasks: (state) => {
    return state.singles.all.filter(
      (x) => x.task_status.name !== TASK_STATUS_VALUES.ARCHIVED
    )
  },

  getAllCurrentTabTasksArchived: (state) => {
    return state.singles.all.filter(
      (x) => x.task_status.name === TASK_STATUS_VALUES.ARCHIVED
    )
  },
}
