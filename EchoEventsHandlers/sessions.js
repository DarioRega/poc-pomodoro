import { SESSION_STATUS } from '@/constantes'

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
