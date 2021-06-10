// import { ACTION_TYPES } from '@/constantes'

import { STEPS_STATUS } from '@/constantes'

export default {
  SET_CURRENT_SESSION_AND_CURRENT_STEP(state, payload) {
    Object.assign(state, { current: payload })
  },
  SET_TEMPORARY_SESSION_PAUSE_TO_STOP_TIMER(state) {
    console.log('PAUSE SET')
    let currentStep = state.current_step.status
    currentStep = STEPS_STATUS.PAUSED
    Object.assign(state.current, {
      current_step: currentStep,
      status: STEPS_STATUS.PAUSED,
    })
  },
  REVERT_TEMPORARY_SESSION_PAUSE(state) {
    console.log('RESTARSTART SET')
    let currentStep = state.current_step.status
    currentStep = STEPS_STATUS.IN_PROGRESS
    // this.$set(state, 'current')
    // Object.assign(state.current, {
    //   current_step: currentStep,
    //   status: STEPS_STATUS.IN_PROGRESS,
    // })
    // const payload = {
    //   current_step:
    // }
    state.current = {
      ...state.current,
      payload,
    }
  },
}
