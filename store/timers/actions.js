import moment from 'moment-timezone'
// import { aMinuteInMilliseconds, aSecondInMilliseconds } from '@/constantes'
import { secondsRemainingToTheCurrentMinute } from '@/helpers'

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
      commit('SET_INTERVAL_SESSION_END_TIME', () =>
        dispatch('setCurrentSessionEndTimeWhenNotRunning')
      )
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
    console.log('currentSessionTimer', currentSessionTimer)
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
    commit('SET_INTERVAL_CURRENT_STEP_TIMER', () =>
      dispatch('setRestingTimeCurrentStepAsTimer', payload)
    )
  },

  setRestingTimeCurrentStepAsTimer({ commit }, payload) {
    const { current_step } = payload
    const endTimeSecondsAmount = moment(current_step.end_time).diff(
      moment.now(),
      'seconds'
    )
    const currentStepTimeUtc = moment.utc(endTimeSecondsAmount * 1000)

    const currentStepTimer = currentStepTimeUtc.format('mm:ss')
    const currentStepRestingTime = currentStepTimeUtc.format('HH:mm:ss')

    console.log(currentStepTimer, 'currentStepTimer')
    console.log(currentStepRestingTime, 'currentStepRestingTime')
    commit('SET_CURRENT_STEP_RESTING_TIME_AND_TIMER', {
      currentStepTimer,
      currentStepRestingTime,
    })
  },
}
