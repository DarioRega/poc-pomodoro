import _ from 'lodash'
import { SESSION_STATUS, STEPS_STATUS } from '@/constantes'

export default {
  SET_CURRENT_SESSION_AND_CURRENT_STEP(state, payload) {
    Object.assign(state, { current: payload })
  },
  MANUALLY_TRIGGER_PAUSE_ON_SESSION_UNTIL_WEB_SOCKET_RESPONSE(state, payload) {
    const clone = _.cloneDeep(state.current)
    clone.status = SESSION_STATUS.PAUSED
    clone.resting_time = payload.totalSessionRestingTime

    clone.current_step.status = STEPS_STATUS.PAUSED
    clone.current_step.resting_time = payload.currentStepRestingTime

    Object.assign(state, { current: clone })
  },
}
