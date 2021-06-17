import _ from 'lodash'

import { STEPS_STATUS, STEPS_TYPES } from '@/constantes'

export default {
  /*
    Session
   */
  getSessionState: (state, getters) => {
    if (getters.hasCurrentSession) {
      const {
        current: { status },
      } = state

      const currentStepStatus = getters.getCurrentStepStatus
      return {
        isRunning: currentStepStatus.includes(STEPS_STATUS.IN_PROGRESS),
        isPaused:
          status.includes(STEPS_STATUS.PAUSED) ||
          currentStepStatus.includes(STEPS_STATUS.PAUSED),

        isSessionStartedButHasPendingProcess:
          currentStepStatus.includes(STEPS_STATUS.PENDING) &&
          !status.includes(STEPS_STATUS.PENDING),
        isSessionStarted:
          !status.includes(STEPS_STATUS.PENDING) &&
          !status.includes(STEPS_STATUS.DONE),
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

  getSessionRestingTime: (state, getters) => {
    if (getters.hasCurrentSession) {
      return state.current.resting_time
    }
    return '00:00:00'
  },

  getSessionStepsOnlyPomodoro: (state, getters) => {
    if (getters.hasCurrentSession) {
      return state.current.steps.filter(
        (step) => step.type === STEPS_TYPES.POMODORO
      )
    }
    return []
  },
  hasCurrentSession: (state) => {
    return !_.isEmpty(state.current)
  },

  /*
    Current step
   */
  getCurrentStep: (state, getters) => {
    if (getters.hasCurrentSession) {
      return state.current.current_step
    }
    return {}
  },

  getCurrentStepStatus: (state, getters) => {
    if (getters.hasCurrentSession) {
      const {
        current: {
          current_step: { status },
        },
      } = state
      return status
    }
  },
}
