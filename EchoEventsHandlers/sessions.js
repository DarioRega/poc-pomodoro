import { SESSION_STATUS } from '@/constantes'
import { formatDuration } from '@/helpers/sessions'

export const onCurrentSessionEvent = (payload, store) => {
  const defaultSessionState = {}
  let session = defaultSessionState

  const notification = {
    title: 'Session aborted!',
    type: 'success',
    description: 'The current session was successfully aborted',
  }
  if (payload) {
    switch (payload.status) {
      case SESSION_STATUS.DONE: {
        notification.title = 'Session done'
        notification.description =
          "Well done ! You've finished the whole session"
        store.dispatch('globalState/createNotification', notification)
        break
      }
      case SESSION_STATUS.ABORTED: {
        const timerPayload = getFirstStepDurations(store)
        store.commit(
          'timers/SET_CURRENT_STEP_RESTING_TIME_AND_TIMER',
          timerPayload
        )
        store.dispatch('globalState/createNotification', notification)
        break
      }
      default:
        session = payload
    }
  } else {
    session = defaultSessionState
  }
  store.commit('sessions/SET_CURRENT_SESSION_AND_CURRENT_STEP', session)
}

export const getFirstStepDurations = (store) => {
  const firstStep = store.getters['sessions/getFirstStep']
  return {
    currentStepTimer: formatDuration(firstStep.duration),
    currentStepRestingTime: firstStep.duration,
  }
}
