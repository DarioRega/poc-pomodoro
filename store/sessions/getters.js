import moment from 'moment-timezone'
import { STEPS_STATUS } from '@/constantes'
import { calculateSessionEndTime } from '@/helpers/sessions'

export default {
  getTimerState: (state) => {
    return {
      isRunning: state.currentStep.status.includes(STEPS_STATUS.IN_PROGRESS),
      isPaused: state.currentStep.status.includes(STEPS_STATUS.PAUSED),
      isPending: state.currentStep.status.includes(STEPS_STATUS.PENDING),
      isSessionPending: state.session.status.includes(STEPS_STATUS.PENDING),
      isSessionStartedButPendingProcess:
        state.currentStep.status.includes(STEPS_STATUS.PENDING) &&
        !state.session.status.includes(STEPS_STATUS.PENDING),
    }
  },
  getCurrentSessionEndTime: (state) => {
    if (state.session.status.includes(STEPS_STATUS.PAUSED)) {
      // TODO renato give us resting time from the session directly or i need to calculate from steps ?
      // if i need to calculate set the state.session_end_time and in progress as first condition,
      // else give what i wrote already on the else
    } else if (state.session.end_time) {
      return moment(state.session).format('hh:mm A')
    } else {
      const calculatedEndTime = calculateSessionEndTime(state.session.steps)
      // TODO format depending user settings
      return moment(calculatedEndTime).format('hh:mm A')
    }
  },
  getSessionSteps: (state) => {
    return state.session.steps
  },
  isSessionStarted: (state) =>
    state.session.status === STEPS_STATUS.IN_PROGRESS ||
    STEPS_STATUS.IN_PROGRESS,

  isSessionPaused: (state) => state.session.status === STEPS_STATUS.PAUSED,
}
