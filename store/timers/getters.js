import { STEPS_STATUS } from '@/constantes'
import { formatDuration } from '@/helpers/sessions'

export default {
  getCurrentStepTimer: (state, getters, rootState, rootGetters) => {
    if (rootGetters['sessions/hasCurrentSession']) {
      const {
        sessions: {
          current: {
            current_step: { status, resting_time },
          },
        },
      } = rootState
      if (status.includes(STEPS_STATUS.PAUSED)) {
        return formatDuration(resting_time)
      }
    }
    return state.currentStepTimer
  },
  getSessionTimer: (state, getters, rootState, rootGetters) => {
    if (rootGetters['sessions/getSessionState'].isRunning) {
      return rootGetters['sessions/getCurrentRunningSessionEndTime']
    }
    return state.currentSessionTimer
  },
}
