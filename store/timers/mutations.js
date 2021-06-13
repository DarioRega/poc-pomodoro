export default {
  SET_CURRENT_STEP_RESTING_TIME_AND_TIMER(state, payload) {
    state.currentStepTimer = payload.currentStepTimer
    state.currentStepRestingTime = payload.currentStepRestingTime
  },
  SET_CURRENT_SESSION_TIMER(state, payload) {
    state.currentSessionTimer = payload
  },
  SET_CURRENT_STEP_TIMER_MATCH_NEXT_STEP_DURATION(state, payload) {
    state.currentStepTimer = payload
  },
}
