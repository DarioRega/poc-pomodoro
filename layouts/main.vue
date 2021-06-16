<template>
  <div :class="userTheme">
    <Nuxt v-if="!isEnvLoading && !isRefreshLoading" />
    <!--  Notifications -->
    <notifications-container />
    <screen-loader v-if="isEnvLoading || isRefreshLoading">
      <h5 class="font-body tracking-wider text-dark-blue dark:text-celeste">
        {{
          isEnvLoading
            ? $t('Loading your environment...')
            : $t('Synchronizing channels...')
        }}
      </h5>
    </screen-loader>
    <transition-translate-y
      duration-amount="500"
      translate-y="-translate-y-full"
    >
      <launch-session-timer v-if="isLaunchTimerVisible" />
    </transition-translate-y>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment-timezone'

import LaunchSessionTimer from '@/components/Atoms/LaunchSessionTimer'
import TransitionTranslateY from '@/components/Atoms/Transitions/TransitionTranslateY'
import NotificationsContainer from '@/components/Templates/NotificationsContainer'
import ScreenLoader from '@/components/Atoms/Loaders/ScreenLoader'

import { aMinuteInMilliseconds, aSecondInMilliseconds } from '@/constantes'
import { formatDuration } from '@/helpers/sessions'

export default {
  name: 'Main',

  components: {
    NotificationsContainer,
    ScreenLoader,
    LaunchSessionTimer,
    TransitionTranslateY,
  },

  data() {
    return {
      intervalSessionTimer: null,
      intervalCurrentStepTimer: null,
    }
  },

  /*
    Computed
  */
  computed: {
    ...mapGetters({
      sessionState: 'sessions/getSessionState',
      sessionRestingTime: 'sessions/getSessionRestingTime',
      sessionRunningEndTime: 'sessions/getCurrentRunningSessionEndTime',
      currentStepEndTime: 'sessions/getCurrentStepEndTime',
      getNextStep: 'sessions/getNextStep',
      hasCurrentSession: 'sessions/hasCurrentSession',
      sessionEndTimeTimer: 'timers/getSessionTimer',
      currentStepTimer: 'timers/getCurrentStepTimer',
      userTheme: 'user/getUserTheme',
      timeFormat: 'user/getTimeFormat',
    }),

    isLaunchTimerVisible() {
      return this.$store.state.globalState.isLaunchTimerVisible
    },
    isEnvLoading() {
      return this.$store.state.globalState.isEnvLoading
    },
    isRefreshLoading() {
      return this.$store.state.globalState.isRefreshLoading
    },
    hasSkippedAction() {
      return this.$store.state.globalState.hasSkippedAction
    },
  },

  /*
    Watchers
  */
  watch: {
    hasSkippedAction(newValue, oldValue) {
      if (newValue) {
        clearInterval(this.intervalCurrentStepTimer)
        this.$store.commit('globalState/SET_HAS_SKIPPED_ACTION', false)
      }
    },
    'sessionState.isRunning'(newValue, oldValue) {
      if (newValue) {
        this.setCurrentSessionEndTimeWhenRunning()
        this.setIntervalCurrentStep()
      } else {
        clearInterval(this.intervalCurrentStepTimer)
        this.setIntervalSessionEndTimeWhenNotRunning()
      }
    },

    currentStepTimer(newValue, oldValue) {
      if (newValue === '00:00') {
        clearInterval(this.intervalCurrentStepTimer)
        this.finishCurrentStep()
        if (!this.$store.getters['sessions/isNextStepLastStep']) {
          this.$store.commit(
            'timers/SET_CURRENT_STEP_TIMER_MATCH_NEXT_STEP_DURATION',
            formatDuration(this.getNextStep.duration)
          )
        }
      }
    },
  },

  /*
    Lifecycles
  */
  async mounted() {
    /*
      Verify if user refresh page, we get the env data
     */
    if (!this.sessionState.isSessionCreated) {
      await this.getEnvironment(false)
    }

    if (this.sessionState.isSessionCreated) {
      if (!this.sessionState.isRunning) {
        this.setIntervalSessionEndTimeWhenNotRunning()
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalSessionTimer)
    clearInterval(this.intervalCurrentStepTimer)
  },

  /*
    Methods
  */
  methods: {
    ...mapActions({
      getAndSetCurrentSession: 'sessions/getAndSetCurrentSession',
      finishCurrentStep: 'sessions/finishCurrentStep',
      getEnvironment: 'globalState/getEnvironment',
      getAndSetAllTasks: 'tasks/getAndSetAllSingleTasks',
      getAndSetAllTaskStatuses: 'tasks/getAndSetAllTaskStatuses',
    }),

    /*
      Current step
    */
    setIntervalCurrentStep() {
      this.intervalCurrentStepTimer = setInterval(() => {
        const endTimeSecondsAmount = moment(this.currentStepEndTime).diff(
          moment.now(),
          'seconds'
        )
        const currentStepTime = moment.utc(endTimeSecondsAmount * 1000)
        const currentStepTimer = currentStepTime.format('mm:ss')
        const currentStepRestingTime = currentStepTime.format('HH:mm:ss')

        this.$store.commit('timers/SET_CURRENT_STEP_RESTING_TIME_AND_TIMER', {
          currentStepTimer,
          currentStepRestingTime,
        })
      }, aSecondInMilliseconds)
    },

    /*
      Session end time
     */
    setIntervalSessionEndTimeWhenNotRunning() {
      this.setCurrentSessionEndTimeWhenNotRunning()
      // to synchronize with the current clock
      const secondsRemainingToTheCurrentMinute =
        (60 - moment().seconds()) * 1000

      setTimeout(() => {
        this.setCurrentSessionEndTimeWhenNotRunning()

        this.intervalSessionTimer = setInterval(() => {
          this.setCurrentSessionEndTimeWhenNotRunning()
        }, aMinuteInMilliseconds)
      }, secondsRemainingToTheCurrentMinute)
    },
    setCurrentSessionEndTimeWhenRunning() {
      this.$store.commit(
        'timers/SET_CURRENT_SESSION_TIMER',
        this.sessionRunningEndTime
      )
    },
    setCurrentSessionEndTimeWhenNotRunning() {
      const restingTimeAsSeconds = moment
        .duration(this.sessionRestingTime)
        .asSeconds()

      const currentSessionTimer = moment()
        .add(restingTimeAsSeconds, 'seconds')
        .format(this.timeFormat)
      this.$store.commit(
        'timers/SET_CURRENT_SESSION_TIMER',
        currentSessionTimer
      )
    },
  },
}
</script>
