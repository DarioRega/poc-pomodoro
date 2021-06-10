import { ACTION_TYPES, STEPS_STATUS } from '@/constantes'
import {
  ABORT_USER_CURRENT_SESSION_URL,
  CURRENT_STEP_ACTION_URL,
  CURRENT_USER_SESSION_URL,
  START_SESSION_ID_URL,
  USER_SESSION_URL,
} from '@/constantes/api'
import { formatDuration } from '@/helpers/sessions'

export default {
  /*
  Global
   */
  onTimerClick({ dispatch, getters, commit, rootState }) {
    const {
      isSessionCreated,
      isPaused,
      isRunning,
      isSessionStartedButHasPendingProcess,
    } = getters.getSessionState
    if (!isSessionCreated) {
      // in v2 we will let the user the possibility to select a task to be ran
      // the SET_LAUNCH_TIMER_VISIBILITY will have to be removed and called after the user selected a task from the modal
      // commit(
      //   'globalState/SET_CURRENT_MODAL_OPEN',
      //   rootState.globalState.modalsRefs.SELECT_RUNNING_TASK,
      //   { root: true }
      // )
      commit('globalState/SET_LAUNCH_TIMER_VISIBILITY', true, { root: true })
    } else if (isSessionStartedButHasPendingProcess) {
      dispatch('startCurrentStep')
    } else if (isPaused) {
      dispatch('resumeCurrentStep')
    } else if (isRunning) {
      dispatch('pauseCurrentStep')
    } else {
      // TODO CUSTOM ERROR throw new CustomErrorTimer
    }
  },

  beforeLeavingApplication({ dispatch, getters }) {
    if (getters.getCurrentStepStatus === STEPS_STATUS.IN_PROGRESS) {
      dispatch('pauseCurrentStep')
    }
  },

  /*
    Session
   */
  async getAndSetCurrentSession({ commit }) {
    const { data } = await this.$axios.get(`${CURRENT_USER_SESSION_URL}`)
    if (data.id) {
      commit('SET_CURRENT_SESSION_AND_CURRENT_STEP', data)
      const { resting_time, status } = data.current_step
      if (!status.includes(STEPS_STATUS.IN_PROGRESS)) {
        const currentStepRestingTime = resting_time
        const currentStepTimer = formatDuration(resting_time)
        commit(
          'timers/SET_CURRENT_STEP_RESTING_TIME_AND_TIMER',
          { currentStepRestingTime, currentStepTimer },
          { root: true }
        )
      }
    }
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

  /*
    Abort
   */
  async abortSession({ dispatch }) {
    const notification = {
      title: this.$i18n.t('Session aborted !'),
      type: 'success',
    }
    try {
      await this.$axios.get(`${ABORT_USER_CURRENT_SESSION_URL}`)
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
   Skip
  */
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

    try {
      await this.$axios.post(`${CURRENT_STEP_ACTION_URL}`, {
        type: ACTION_TYPES.PAUSE,
        resting_time: rootState.timers.currentStepRestingTime,
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
     Finish current step
  */
  async finishCurrentStep({ dispatch, rootState }) {
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
    Start current step
 */
  async startCurrentStep({ dispatch, rootState, app, $i18n }) {
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
