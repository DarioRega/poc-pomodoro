export default {
  onTimerClick({ dispatch, getters, commit, rootState }) {
    // }
    const {
      isSessionPending,
      isPaused,
      isRunning,
      isSessionStartedButPendingProcess,
    } = getters.getTimerState
    if (isSessionPending) {
      commit(
        'globalState/SET_CURRENT_MODAL_OPEN',
        rootState.globalState.modalsRefs.SELECT_RUNNING_TASK,
        { root: true }
      )
    } else if (isSessionStartedButPendingProcess) {
      // START ANY PROCESS
    } else if (isPaused) {
      // RESUME SESSION
    } else if (isRunning) {
      // PAUSE SESSION
    } else {
      // TODO CUSTOM ERROR throw new CustomErrorTimer
    }
  },
}
