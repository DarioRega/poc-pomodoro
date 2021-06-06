import { STEPS_STATUS } from '@/constantes'

export default {
  getCurrentTimer: (state, getters, rootState) => {
    // TODO check here if paused, give resting time, if not paused give timer
    // TODO PARSE TO mm:ss
    if (rootState.sessions.currentStep.status.includes(STEPS_STATUS.PAUSED)) {
      // display resting time
      return rootState.sessions.currentStep.resting_time
    } else {
      return state.currentTimer
    }
  },
}
