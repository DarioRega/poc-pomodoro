import moment from 'moment-timezone'
import _ from 'lodash'

import { STEPS_STATUS } from '@/constantes'

export default {
  getSessionState: (state, getters) => {
    if (getters.hasCurrentSession) {
      return {
        isRunning: getters.getCurrentStepStatus.includes(
          STEPS_STATUS.IN_PROGRESS
        ),
        isPaused: state.current.status.includes(STEPS_STATUS.PAUSED),
        isSessionStartedButHasPendingProcess:
          getters.getCurrentStepStatus.includes(STEPS_STATUS.PENDING) &&
          !state.current.status.includes(STEPS_STATUS.PENDING),
        isSessionStarted:
          !state.current.status.includes(STEPS_STATUS.PENDING) &&
          !state.current.status.includes(STEPS_STATUS.DONE),
        isSessionCreated: true,
      }
    }

    return {
      isRunning: false,
      isPaused: false,
      isSessionStartedButHasPendingProcess: false,
      isSessionStarted: false,
      isSessionCreated: false,
    }
  },
  getCurrentRunningSessionEndTime: (state, getters) => {
    if (getters.hasCurrentSession) {
      const {
        current: { status, end_time },
      } = state

      if (status === STEPS_STATUS.IN_PROGRESS) {
        return moment(end_time).format('hh:mm A')
      }
    }
  },
  getSessionRestingTime: (state, getters) => {
    if (getters.hasCurrentSession) {
      return state.current.resting_time
    }
    return '00:00:00'
  },
  getCurrentStepEndTime: (state, getters) => {
    if (getters.hasCurrentSession) {
      return state.current.current_step.end_time
    }
    return ''
  },

  getSessionSteps: (state, getters) => {
    if (getters.hasCurrentSession) {
      return state.current.steps
    }
    return []
  },

  hasCurrentSession: (state) => {
    return !_.isEmpty(state.current)
  },

  /*
    Action validations getters
   */
  canResume: (state, getters) => {
    if (getters.hasCurrentSession) {
      return getters.getCurrentStepStatus === STEPS_STATUS.PAUSED
    }
    return false
  },
  canPause: (state, getters) => {
    if (getters.hasCurrentSession) {
      return getters.getCurrentStepStatus === STEPS_STATUS.IN_PROGRESS
    }
    return false
  },
  canSkip: (state, getters) => {
    if (getters.hasCurrentSession) {
      return (
        getters.getCurrentStepStatus === STEPS_STATUS.IN_PROGRESS ||
        getters.getCurrentStepStatus === STEPS_STATUS.PENDING
      )
    }
    return false
  },
  getCurrentStepStatus: (state) => {
    const {
      current: {
        current_step: { status: statusValue },
      },
    } = state
    return statusValue
  },
}
