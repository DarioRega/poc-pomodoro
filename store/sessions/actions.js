import { ACTION_TYPES } from '@/constantes'
import {
  ABORT_USER_CURRENT_SESSION_URL,
  CURRENT_STEP_ACTION_URL,
  CURRENT_USER_SESSION_URL,
  START_SESSION_ID_URL,
  USER_SESSION_URL,
} from '@/constantes/api'
import { onCurrentSessionEvent } from '@/EchoEventsHandlers/sessions'

export default {
  /*
  Global
   */
  onTimerClick({ dispatch, getters, commit }) {
    const {
      isSessionCreated,
      isPaused,
      isRunning,
      isSessionStartedButHasPendingProcess,
    } = getters.getSessionState
    if (!isSessionCreated) {
      commit('globalState/SET_LAUNCH_TIMER_VISIBILITY', true, { root: true })
    } else if (isSessionStartedButHasPendingProcess) {
      dispatch('startCurrentStep')
    } else if (isPaused) {
      dispatch('resumeCurrentStep')
    } else if (isRunning) {
      dispatch('pauseCurrentStep')
    }
  },

  /*
    Session
   */
  async getAndSetCurrentSession(store) {
    const { data } = await this.$axios.get(`${CURRENT_USER_SESSION_URL}`)

    // trigger event as we received websocket to handle the app state
    onCurrentSessionEvent(data, store)
  },

  async createAndStartSession({ dispatch, commit }) {
    const { data } = await this.$axios.post(`${USER_SESSION_URL}`)
    try {
      await this.$axios.get(`${START_SESSION_ID_URL(data.id)}`)
    } catch (err) {
      dispatch(
        'globalState/handleSessionActionsServerError',
        err.response.data.message,
        {
          root: true,
        }
      )
    } finally {
      commit('globalState/SET_LAUNCH_TIMER_VISIBILITY', false, { root: true })
    }
  },

  /*
   Session actions
   */
  onAbortClick({ dispatch }) {
    const notification = {
      title: this.$i18n.t('Abort session ?'),
      description: this.$i18n.t('Are you sure to abort the current session ?'),
      actionRequired: true,
      confirmCallback: () => dispatch('abortSession'),
    }
    dispatch('globalState/createNotification', notification, { root: true })
  },

  onSkipCurrentStepClick({ dispatch }) {
    const notification = {
      title: this.$i18n.t('Skip process ?'),
      description: this.$i18n.t('Are you sure to skip the current process ?'),
      type: 'info',
      actionRequired: true,
      confirmCallback: () => dispatch('skipCurrentStep'),
    }
    dispatch('globalState/createNotification', notification, { root: true })
  },

  async skipCurrentStep({ dispatch }) {
    const notification = {
      title: this.$i18n.t('Process skipped !'),
    }

    try {
      await this.$axios.post(`${CURRENT_STEP_ACTION_URL}`, {
        type: ACTION_TYPES.SKIP,
      })

      dispatch('globalState/createNotification', notification, { root: true })
    } catch (err) {
      dispatch(
        'globalState/handleSessionActionsServerError',
        err.response.data.message,
        {
          root: true,
        }
      )
    }
  },

  /*
    Pause
  */
  async pauseCurrentStep({ dispatch, rootState }) {
    const notification = {
      title: this.$i18n.t('Session paused!'),
      type: 'success',
    }
    const currentStepRestingTime = rootState.timers.currentStepRestingTime

    try {
      await this.$axios.post(`${CURRENT_STEP_ACTION_URL}`, {
        type: ACTION_TYPES.PAUSE,
        resting_time: currentStepRestingTime,
      })

      dispatch('globalState/createNotification', notification, { root: true })
    } catch (err) {
      dispatch(
        'globalState/handleSessionActionsServerError',
        err.response.data.message,
        {
          root: true,
        }
      )
    }
  },

  /*
  Abort
 */
  async abortSession({ dispatch }) {
    try {
      await this.$axios.get(`${ABORT_USER_CURRENT_SESSION_URL}`)
    } catch (err) {
      dispatch(
        'globalState/handleSessionActionsServerError',
        err.response.data.message,
        {
          root: true,
        }
      )
    }
  },

  /*
     Finish current step
  */
  async finishCurrentStep({ dispatch }) {
    try {
      await this.$axios.post(`${CURRENT_STEP_ACTION_URL}`, {
        type: ACTION_TYPES.FINISH,
      })
    } catch (err) {
      dispatch(
        'globalState/handleSessionActionsServerError',
        err.response.data.message,
        {
          root: true,
        }
      )
    }
  },

  /*
   Resume
 */
  async resumeCurrentStep({ dispatch }) {
    const notification = {
      title: this.$i18n.t('Session resumed !'),
      type: 'success',
    }
    try {
      await this.$axios.post(`${CURRENT_STEP_ACTION_URL}`, {
        type: ACTION_TYPES.RESUME,
      })
      dispatch('globalState/createNotification', notification, { root: true })
    } catch (err) {
      dispatch(
        'globalState/handleSessionActionsServerError',
        err.response.data.message,
        {
          root: true,
        }
      )
    }
  },

  /*
   Start current step
  */
  async startCurrentStep({ dispatch }) {
    const notification = {
      title: this.$i18n.t('Session started !'),
      type: 'success',
    }
    try {
      await this.$axios.post(`${CURRENT_STEP_ACTION_URL}`, {
        type: ACTION_TYPES.START,
      })
      dispatch('globalState/createNotification', notification, { root: true })
    } catch (err) {
      dispatch(
        'globalState/handleSessionActionsServerError',
        err.response.data.message,
        {
          root: true,
        }
      )
    }
  },
}
