import { aMinuteInMilliseconds, aSecondInMilliseconds } from '@/constantes'

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
  SET_INTERVAL_SESSION_END_TIME(state, callback) {
    state = {
      ...state,
      intervalSessionEndTime: setInterval(() => {
        callback()
      }, aMinuteInMilliseconds),
    }
  },
  REMOVE_INTERVAL_SESSION_END_TIME(state) {
    clearInterval(state.intervalSessionEndTime)
    state = { ...state, intervalSessionEndTime: null }
  },

  SET_INTERVAL_CURRENT_STEP_TIMER(state, callback) {
    state = {
      ...state,
      intervalCurrentStepTimer: setInterval(() => {
        callback()
      }, aSecondInMilliseconds),
    }
  },
  REMOVE_INTERVAL_CURRENT_STEP_TIMER(state) {
    clearInterval(state.intervalCurrentStepTimer)
    state = { ...state, intervalCurrentStepTimer: null }
  },

  SET_CURRENT_STEP_TIMER_MATCH_NEXT_STEP_DURATION(state, payload) {
    state.currentStepTimer = payload
  },
}
