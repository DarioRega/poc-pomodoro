import moment from 'moment-timezone'

import { aMinuteInMilliseconds, aSecondInMilliseconds } from '@/constantes'
import { secondsRemainingToTheCurrentMinute } from '@/helpers'
import { transformHoursDurationFormatToMinutesDurationFormat } from '@/helpers/sessions'

export default {
  /*
    Main events Session status
   */
  currentStepIsNotRunning({ dispatch }, payload) {
    // Session end time related
    dispatch('setCurrentSessionEndTimeWhenNotRunning', payload)
    dispatch('setIntervalCurrentSessionEndTimeWhenNotRunning', payload)

    // Current step related
    dispatch('removeIntervalCurrentStepTimer')
    dispatch('setCurrentStepTimerNotRunning', payload)
  },

  currentStepIsRunning({ dispatch }, payload) {
    // Session end time related
    dispatch('removeIntervalSessionEndTime', payload)
    dispatch('setCurrentSessionEndTimeWhenRunning', payload)

    // Current step related
    dispatch('setCurrentStepTimerRunning', payload)
    dispatch('setIntervalCurrentStepTimer', payload)
  },

  sessionIsDoneOrAborted({ dispatch, commit, rootGetters }) {
    const userPomodoroDuration = rootGetters['user/getUserPomodoroDuration']

    // kills all intervals
    dispatch('removeIntervalCurrentStepTimer')
    dispatch('removeIntervalSessionEndTime')

    // set default timer with user preference
    commit('SET_CURRENT_STEP_RESTING_TIME_AND_TIMER', {
      currentStepTimer:
        transformHoursDurationFormatToMinutesDurationFormat(
          userPomodoroDuration
        ),
      currentStepRestingTime: userPomodoroDuration,
    })
  },

  /*
    Session end time related
   */
  setIntervalCurrentSessionEndTimeWhenNotRunning({
    dispatch,
    commit,
    rootGetters,
  }) {
    setTimeout(() => {
      console.log('SHOULD FIRE NOW IN TIMEOUT')
      // we check after the setTimeout if the session is still paused
      if (!rootGetters['sessions/getSessionState'].isRunning) {
        console.log('SHOULD NOT BE HERE')
        dispatch('setCurrentSessionEndTimeWhenNotRunning')

        const intervalSessionEndTime = setInterval(() => {
          dispatch('setCurrentSessionEndTimeWhenNotRunning')
        }, aMinuteInMilliseconds)

        commit('SET_INTERVAL_SESSION_END_TIME', intervalSessionEndTime)
      }
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
      dispatch('setCurrentStepTimerRunning', payload)
    }, aSecondInMilliseconds)

    commit('SET_INTERVAL_CURRENT_STEP_TIMER', intervalCurrentStepTimer)
  },

  setCurrentStepTimerRunning({ commit, dispatch }, payload) {
    let currentStepTimer, currentStepRestingTime
    const { current_step } = payload

    const endTimeSecondsAmountFromNow = moment(current_step.end_time).diff(
      moment.now(),
      'seconds'
    )

    if (endTimeSecondsAmountFromNow > 0) {
      const currentStepTimeUtc = moment.utc(endTimeSecondsAmountFromNow * 1000)
      currentStepTimer = currentStepTimeUtc.format('mm:ss')
      currentStepRestingTime = currentStepTimeUtc.format('HH:mm:ss')
    } else {
      // timer arrive at 00:00, we must remove interval,
      // send api call to finish step and set timer 00:00
      dispatch('removeIntervalCurrentStepTimer')
      dispatch('sessions/finishCurrentStep', null, { root: true })

      currentStepTimer = '00:00'
      currentStepRestingTime = '00:00:00'
    }

    commit('SET_CURRENT_STEP_RESTING_TIME_AND_TIMER', {
      currentStepTimer,
      currentStepRestingTime,
    })
  },

  setCurrentStepTimerNotRunning({ commit }, payload) {
    const { current_step } = payload
    const restingTimeFormatted =
      transformHoursDurationFormatToMinutesDurationFormat(
        current_step.resting_time
      )

    commit('SET_CURRENT_STEP_RESTING_TIME_AND_TIMER', {
      currentStepTimer: restingTimeFormatted,
      currentStepRestingTime: current_step.resting_time,
    })
  },
}
