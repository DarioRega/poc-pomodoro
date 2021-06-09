import moment from 'moment-timezone'
import _ from 'lodash'

import { STEPS_STATUS } from '@/constantes'
import { calculateSessionEndTime } from '@/helpers/sessions'

export default {
  getTimerState: (state, getters) => {
    if (getters.hasCurrentSession) {
      return {
        isRunning: state.current.status.includes(STEPS_STATUS.IN_PROGRESS),
        isPaused: state.current.status.includes(STEPS_STATUS.PAUSED),
        isSessionStartedButPendingProcess:
          state.current.current_step.status.includes(STEPS_STATUS.PENDING) &&
          !state.current.status.includes(STEPS_STATUS.PENDING),
        isSessionCreated: true,
      }
    }

    return {
      isRunning: false,
      isPaused: false,
      isSessionStartedButPendingProcess: false,
      isSessionCreated: false,
    }
  },
  getCurrentSessionEndTime: (state, getters) => {
    if (getters.hasCurrentSession) {
      if (state.current.status.includes(STEPS_STATUS.PAUSED)) {
        // TODO backend give us resting time from the session directly
        // if i need to calculate set the state.current_end_time and in progress as first condition,
        // else give what i wrote already on the else
      } else if (state.current.end_time) {
        return moment(state.current).format('hh:mm A')
      } else {
        const calculatedEndTime = calculateSessionEndTime(state.current.steps)
        // TODO format depending user settings
        return moment(calculatedEndTime).format('hh:mm A')
      }
    }
    return ''
  },
  getSessionSteps: (state, getters) => {
    if (getters.hasCurrentSession) {
      return state.current.steps
    }
    return []
  },
  isSessionStarted: (state, getters) => {
    if (getters.hasCurrentSession) {
      return (
        state.current.status !== STEPS_STATUS.PENDING &&
        state.current.status !== STEPS_STATUS.DONE
      )
    }
    return false
  },

  isSessionPaused: (state, getters) => {
    if (getters.hasCurrentSession) {
      return state.current.status === STEPS_STATUS.PAUSED
    }
    return false
  },
  hasCurrentSession: (state) => {
    return !_.isEmpty(state.current)
  },
}
