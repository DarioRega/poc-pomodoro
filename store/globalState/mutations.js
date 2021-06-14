export default {
  SET_CURRENT_MODAL_OPEN(state, modalRef) {
    state.currentModalOpen = modalRef
  },
  RESET_CURRENT_MODAL_OPEN(state) {
    state.currentModalOpen = ''
  },
  TOGGLE_STACKED_LAYOUT(state) {
    state.isLayoutStacked = !state.isLayoutStacked
  },
  CREATE_NOTIFICATION(state, payload) {
    state.currentNotifications.push(payload)
  },
  REMOVE_NOTIFICATION(state, payload) {
    state.currentNotifications = state.currentNotifications.filter(
      (x) => x.notificationId !== payload
    )
  },
  SET_LAUNCH_TIMER_VISIBILITY(state, payload) {
    state.isLaunchTimerVisible = payload
  },
  SET_ENV_LOADING(state, payload) {
    state.isEnvLoading = payload
  },
  SET_REFRESH_LOADING(state, payload) {
    state.isRefreshLoading = payload
  },
  SET_HAS_SKIPPED_ACTION(state, payload) {
    state.hasSkippedAction = payload
  },
  FORCE_RERENDER_TASK_TABLES(state) {
    state.taskTablesKey += 1
  },
}
