export default {
  /*
  Global
   */
  onTimerClick({ dispatch, getters, commit, rootState }) {
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
      dispatch('startCurrentStep')
    } else if (isPaused) {
      dispatch('resumeCurrentStep')
    } else if (isRunning) {
      dispatch('pauseCurrentStep')
    } else {
      // TODO CUSTOM ERROR throw new CustomErrorTimer
    }
  },

  /*
    Session
   */
  startSession() {
    // TODO axios call
  },
  onAbortClick({ dispatch }) {
    const notification = {
      title: 'Abort session ?',
      description: 'Are you sure to abort the current session ?',
      actionRequired: true,
      confirmCallback: () => dispatch('abortSession'),
    }
    dispatch('globalState/createNotification', notification, { root: true })
  },

  /*
    Abort
   */
  abortSession() {
    // TODO axios call
  },

  /*
   Skip
  */
  onSkipCurrentStepClick({ dispatch }) {
    const notification = {
      title: 'Skip process ?',
      description: 'Are you sure to skip the current process ?',
      actionRequired: true,
      confirmCallback: () => dispatch('skipCurrentStep'),
    }
    dispatch('globalState/createNotification', notification, { root: true })
  },
  skipCurrentStep() {
    // TODO axios call
  },

  /*
    Pause
  */
  pauseCurrentStep({ dispatch }, payload) {
    // TODO axios call with resting time
  },

  /*
    Resume
  */
  resumeCurrentStep() {
    // TODO axios call
  },

  /*
    Start current step
 */
  startCurrentStep() {
    // TODO axios call
  },
}
