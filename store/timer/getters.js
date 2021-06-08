import { STEPS_STATUS } from '@/constantes'
import { getOnlyHoursAndMinutes } from '@/helpers/sessions'

export default {
  getCurrentTimer: (state, getters, rootState) => {
    if (rootState.sessions.currentStep.status.includes(STEPS_STATUS.PAUSED)) {
      return getOnlyHoursAndMinutes(rootState.sessions.currentStep.resting_time)
    } else {
      console.log('CURRENT TIMER', state.currentTimer)
      return state.currentTimer
    }
  },
}
