export default {
  /*
    Timers related
   */
  SET_CURRENT_STEP_RESTING_TIME_AND_TIMER(state, payload) {
    state.currentStepTimer = payload.currentStepTimer
    state.currentStepRestingTime = payload.currentStepRestingTime
  },
  SET_CURRENT_SESSION_END_TIME(state, payload) {
    state.currentSessionEndTime = payload
  },

  /*
    Intervals related
 */
  SET_INTERVAL_SESSION_END_TIME(state, interval) {
    clearInterval(state.intervalSessionEndTime)
    state.intervalSessionEndTime = null
    state.intervalSessionEndTime = interval
  },
  REMOVE_INTERVAL_SESSION_END_TIME(state) {
    clearInterval(state.intervalSessionEndTime)
    state.intervalSessionEndTime = null
  },

  SET_INTERVAL_CURRENT_STEP_TIMER(state, interval) {
    clearInterval(state.intervalCurrentStepTimer)
    state.intervalCurrentStepTimer = null
    state.intervalCurrentStepTimer = interval
  },
  REMOVE_INTERVAL_CURRENT_STEP_TIMER(state) {
    clearInterval(state.intervalCurrentStepTimer)
    state.intervalCurrentStepTimer = null
  },

  SET_CURRENT_STEP_TIMER_MATCH_NEXT_STEP_DURATION(state, payload) {
    state.currentStepTimer = payload
  },
}
