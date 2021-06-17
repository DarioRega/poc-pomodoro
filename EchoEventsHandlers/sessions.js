import { STEPS_STATUS } from '@/constantes'
import { isSessionDoneOrAborted } from '@/helpers/sessions'

export const onCurrentSessionEvent = (payload, store) => {
  const defaultSessionState = {}
  let sessionPayload = defaultSessionState

  if (payload) {
    if (!isSessionDoneOrAborted(payload.status)) {
      sessionPayload = payload
    }
    store.commit(
      'sessions/SET_CURRENT_SESSION_AND_CURRENT_STEP',
      sessionPayload,
      { root: true }
    )

    const { current_step } = payload

    switch (current_step.status) {
      case STEPS_STATUS.PAUSED:
        store.dispatch('timers/onSessionPause', payload, { root: true })
        break
      case STEPS_STATUS.IN_PROGRESS:
        store.dispatch('timers/onSessionRunning', payload, { root: true })
        break
    }
  } else {
    store.commit(
      'sessions/SET_CURRENT_SESSION_AND_CURRENT_STEP',
      defaultSessionState,
      { root: true }
    )
  }
}
