import { SESSION_STATUS } from '@/constantes'
import { formatDuration } from '@/helpers/sessions'

export const onCurrentSessionEvent = (payload, store, i18n) => {
  const defaultSessionState = {}
  let session = defaultSessionState

  const notification = {
    title: i18n.t('Session aborted!'),
    type: 'success',
    description: i18n.t('The current session was successfully aborted'),
  }
  if (payload) {
    switch (payload.status) {
      case SESSION_STATUS.DONE: {
        notification.title = i18n.t('Session done')
        notification.description = i18n.t(
          "Well done ! You've finished the whole session"
        )
        store.dispatch('globalState/createNotification', notification)
        break
      }
      case SESSION_STATUS.ABORTED: {
        // TODO WITH USER VALUE
        store.commit('timers/SET_CURRENT_STEP_RESTING_TIME_AND_TIMER', {
          currentStepTimer: '25:00',
          currentStepRestingTime: '00:25:00',
        })
        store.dispatch('globalState/createNotification', notification)
        break
      }
      case SESSION_STATUS.PAUSED: {
        session = payload
        store.commit('timers/SET_CURRENT_STEP_RESTING_TIME_AND_TIMER', {
          currentStepTimer: formatDuration(session.current_step.resting_time),
          currentStepRestingTime: session.current_step.resting_time,
        })
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
