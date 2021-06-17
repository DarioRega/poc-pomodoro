import { STEPS_STATUS } from '@/constantes'
import { isSessionDoneOrAborted } from '@/helpers/sessions'

export const onCurrentSessionEvent = (payload, store) => {
  if (payload) {
    if (!isSessionDoneOrAborted(payload.status)) {
      store.commit('sessions/SET_CURRENT_SESSION_AND_CURRENT_STEP', payload, {
        root: true,
      })

      const { current_step } = payload
      switch (current_step.status) {
        case STEPS_STATUS.PAUSED:
          store.dispatch('timers/currentStepIsNotRunning', payload, {
            root: true,
          })
          break
        case STEPS_STATUS.PENDING:
          store.dispatch('timers/currentStepIsNotRunning', payload, {
            root: true,
          })
          break
        case STEPS_STATUS.IN_PROGRESS:
          store.dispatch('timers/currentStepIsRunning', payload, { root: true })
          break
      }
    } else {
      setEmptySessionState(store)
    }
  } else {
    setEmptySessionState(store)
  }
}

const setEmptySessionState = (store) => {
  store.commit(
    'sessions/SET_CURRENT_SESSION_AND_CURRENT_STEP',
    {},
    { root: true }
  )
  store.dispatch('timers/sessionIsDoneOrAborted', null, {
    root: true,
  })
}
