import moment from 'moment-timezone'
import { POMODORO_STATUS, STEPS_STATUS } from '@/constantes'

export default {
  getTimerState: (state) => {
    return {
      isRunning: state.currentStatus.includes(STEPS_STATUS.IN_PROGRESS),
      isPaused: state.currentStatus.includes(STEPS_STATUS.PAUSED),
      isPending: state.currentStatus.includes(STEPS_STATUS.PENDING),
      isSessionPending: state.currentStatus.includes(
        POMODORO_STATUS.SESSION.PENDING
      ),
      isSessionStartedButPendingProcess:
        state.currentStatus.includes(STEPS_STATUS.PENDING) &&
        !state.currentStatus.includes(POMODORO_STATUS.SESSION.PENDING),
    }
  },
  getCurrentTimer: (state) => {
    // TODO check here if paused, give resting time, if not paused give timer
    return state.currentTimer
  },
  getCurrentSessionEndTime: (state) => {
    // TODO check here if paused, give resting time + date currentSessionEndtime (addition), or else format date moment
    return moment(state.currentSessionEndTime).format('hh:mm A')
  },
  getSessionSteps: (state) => {
    return state.sessionSteps
  },
}
