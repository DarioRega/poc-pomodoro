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
      // in v2 we will let the user the possibility to select a task to be ran
      // the SET_LAUNCH_TIMER_VISIBILITY will have to be removed and called after the user selected a task from the modal
      // commit(
      //   'globalState/SET_CURRENT_MODAL_OPEN',
      //   rootState.globalState.modalsRefs.SELECT_RUNNING_TASK,
      //   { root: true }
      // )
      commit('globalState/SET_LAUNCH_TIMER_VISIBILITY', true, { root: true })
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
  createAndStartSession({ dispatch, commit }) {
    // TODO axios call create session
    // TODO axios call start session
    commit('globalState/SET_LAUNCH_TIMER_VISIBILITY', false, { root: true })
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
