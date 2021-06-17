import moment from 'moment-timezone'
import { aMinuteInMilliseconds, aSecondInMilliseconds } from '@/constantes'
import { secondsRemainingToTheCurrentMinute } from '@/helpers'
import { transformHoursDurationFormatToMinutesDurationFormat } from '@/helpers/sessions'

export default {
  /*
    Main events Session status
   */
  onSessionPause({ dispatch }, payload) {
    // Session end time related
    dispatch('setCurrentSessionEndTimeWhenNotRunning', payload)
    dispatch('setIntervalCurrentSessionEndTimeWhenNotRunning', payload)

    // Current step related
    dispatch('removeIntervalCurrentStepTimer')
    dispatch('setRestingTimeCurrentStepAsTimer', payload)
  },

  onSessionRunning({ dispatch }, payload) {
    // Session end time related
    dispatch('removeIntervalSessionEndTime', payload)
    dispatch('setCurrentSessionEndTimeWhenRunning', payload)

    // Current step related
    dispatch('setRestingTimeCurrentStepAsTimer', payload)
    dispatch('setIntervalCurrentStepTimer', payload)
  },

  /*
    Session end time related
   */
  setIntervalCurrentSessionEndTimeWhenNotRunning({ dispatch, commit }) {
    setTimeout(() => {
      dispatch('setCurrentSessionEndTimeWhenNotRunning')

      const intervalSessionEndTime = setInterval(() => {
        dispatch('setCurrentSessionEndTimeWhenNotRunning')
      }, aMinuteInMilliseconds)

      commit('SET_INTERVAL_SESSION_END_TIME', intervalSessionEndTime)
    }, secondsRemainingToTheCurrentMinute())
  },

  removeIntervalSessionEndTime({ commit }) {
    commit('REMOVE_INTERVAL_SESSION_END_TIME')
  },

  setCurrentSessionEndTimeWhenNotRunning({ rootGetters, commit }) {
    const sessionRestingTime = rootGetters['sessions/getSessionRestingTime']
    const userTimeFormat = rootGetters['user/getTimeFormat']

    const restingTimeAsSeconds = moment.duration(sessionRestingTime).asSeconds()

    const currentSessionTimer = moment()
      .add(restingTimeAsSeconds, 'seconds')
      .format(userTimeFormat)

    commit('SET_CURRENT_SESSION_END_TIME', currentSessionTimer)
  },

  setCurrentSessionEndTimeWhenRunning({ rootGetters, commit }, payload) {
    const { end_time } = payload
    const endTimeFormatted = moment(end_time).format(
      rootGetters['user/getTimeFormat']
    )

    commit('SET_CURRENT_SESSION_END_TIME', endTimeFormatted)
  },

  /*
   Current step related
  */
  removeIntervalCurrentStepTimer({ commit }) {
    commit('REMOVE_INTERVAL_CURRENT_STEP_TIMER')
  },

  setIntervalCurrentStepTimer({ dispatch, commit }, payload) {
    const intervalCurrentStepTimer = setInterval(() => {
      dispatch('setRestingTimeCurrentStepAsTimer', payload)
    }, aSecondInMilliseconds)

    commit('SET_INTERVAL_CURRENT_STEP_TIMER', intervalCurrentStepTimer)
  },

  setRestingTimeCurrentStepAsTimer({ commit }, payload) {
    const { current_step } = payload
    const currentStepTimer =
      transformHoursDurationFormatToMinutesDurationFormat(
        current_step.resting_time
      )
    const currentStepRestingTime = current_step.resting_time

    commit('SET_CURRENT_STEP_RESTING_TIME_AND_TIMER', {
      currentStepTimer,
      currentStepRestingTime,
    })
  },
}
