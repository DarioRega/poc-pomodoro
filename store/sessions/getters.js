import moment from 'moment-timezone'
import _ from 'lodash'

import { STEPS_STATUS, STEPS_TYPES } from '@/constantes'

export default {
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

  getSessionSteps: (state, getters) => {
    if (getters.hasCurrentSession) {
      return state.current.steps
    }
    return []
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
  getCurrentStepEndTime: (state, getters) => {
    if (getters.hasCurrentSession) {
      return state.current.current_step.end_time
    }
    return null
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

  /*
   Next step
   */
  getNextStep: (state, getters) => {
    if (getters.hasCurrentSession) {
      const {
        current: { current_step, steps },
      } = state
      const currentStepId = current_step.id
      const currentStepIndex = steps.findIndex((x) => x.id === currentStepId)
      return steps[currentStepIndex + 1]
    }
    return []
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
        getters.getCurrentStepStatus === STEPS_STATUS.PAUSED ||
        getters.getCurrentStepStatus === STEPS_STATUS.PENDING
      )
    }
    return false
  },
}
