<template>
  <div>
    <Nuxt />
    <!--  Notifications -->
    <notifications-container />
    <screen-loader v-if="isEnvLoading">
      <h5 class="font-body tracking-wider text-dark-blue dark:text-celeste">
        {{ $t('Loading your environment') }}
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
import { mapGetters } from 'vuex'

import LaunchSessionTimer from '@/components/Atoms/LaunchSessionTimer'
import TransitionTranslateY from '@/components/Atoms/Transitions/TransitionTranslateY'
import NotificationsContainer from '@/components/Templates/NotificationsContainer'
import ScreenLoader from '@/components/Atoms/Loaders/ScreenLoader'
import moment from 'moment-timezone'
import { aMinuteInMilliseconds, aSecondInMilliseconds } from '@/constantes'

export default {
  name: 'Main',
  components: {
    NotificationsContainer,
    ScreenLoader,
    LaunchSessionTimer,
    TransitionTranslateY,
  },
  computed: {
    ...mapGetters({
      sessionState: 'sessions/getSessionState',
      sessionEndTimeTimer: 'timers/getSessionTimer',
      sessionRestingTime: 'sessions/getSessionRestingTime',
      sessionRunningEndTime: 'sessions/getCurrentRunningSessionEndTime',
      currentStepEndTime: 'sessions/getCurrentStepEndTime',
    }),
    isLaunchTimerVisible() {
      return this.$store.state.globalState.isLaunchTimerVisible
    },
    isEnvLoading() {
      return this.$store.state.globalState.isEnvLoading
    },
  },
  watch: {
    'sessionState.isRunning'(newValue, oldValue) {
      // TODO verify when websocket active if this works
      if (newValue) {
        clearInterval(this.intervalSessionTimer)
      } else {
        this.setIntervalSessionEndTimeTimerIfSessionNotRunning()
      }
    },
    'sessionState.isSessionPaused'(newValue, oldValue) {
      if (this.sessionState.isSessionStarted && newValue) {
        if (this.intervalCurrentStepTimer) {
          this.killInterval()
        }
      }
      if (this.sessionState.isSessionStarted && !newValue) {
        this.setIntervalCurrentStep()
      }
    },
    currentStepTimer(newValue, oldValue) {
      if (newValue === '00:00') {
        clearInterval(this.intervalCurrentStepTimer)
        this.dispatchFinishCurrentStep()
        // SET CURRENT STEP TIMER TO NEXT STEP
      }
    },
  },
  async mounted() {
    if (!this.sessionState.isSessionCreated) {
      await this.$store.dispatch('sessions/getAndSetCurrentSession')
      this.setIntervalSessionEndTimeTimerIfSessionNotRunning()
      this.$store.commit('globalState/SET_ENV_LOADING', false)
    }
    if (
      this.sessionState.isSessionStarted &&
      !this.sessionState.isSessionPaused &&
      this.sessionState.isRunning
    ) {
      this.startInterval()
    }
  },
  data() {
    return {
      intervalSessionTimer: null,
      intervalCurrentStepTimer: null,
    }
  },
  beforeDestroy() {
    this.killIntervals()
  },
  methods: {
    killIntervals() {
      clearInterval(this.intervalSessionTimer)
      clearInterval(this.intervalCurrentStepTimer)
    },

    /*
      Current step
    */
    async dispatchFinishCurrentStep() {
      await this.$store.dispatch('sessions/finishCurrentStep')
    },

    setIntervalCurrentStep() {
      this.interval = setInterval(async () => {
        if (!this.currentStepEndTime) {
          // session doesn't exist, bug happened if it made it through here, we need to kill interval and reset state
          this.killInterval()
          // retry to set env from scratch
          await this.$store.dispatch('globalState/getEnvironment')
        }

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
    setIntervalSessionEndTimeTimerIfSessionNotRunning() {
      if (!this.sessionState.isRunning) {
        this.setCurrentSessionEndTime()
        // to synchronize with the current clock
        const secondsRemainingToTheCurrentMinute =
          (60 - moment().seconds()) * 1000

        setTimeout(() => {
          this.intervalSessionTimer = setInterval(() => {
            this.setCurrentSessionEndTime()
          }, aMinuteInMilliseconds)
        }, secondsRemainingToTheCurrentMinute)
      } else {
        this.$store.commit(
          'timers/SET_CURRENT_SESSION_TIMER',
          this.sessionRunningEndTime
        )
      }
    },

    setCurrentSessionEndTime() {
      const restingTimeAsSeconds = moment
        .duration(this.sessionRestingTime)
        .asSeconds()

      const currentSessionTimer = moment()
        .add(restingTimeAsSeconds, 'seconds')
        .format('hh:mm A')
      this.$store.commit(
        'timers/SET_CURRENT_SESSION_TIMER',
        currentSessionTimer
      )
    },
  },
}
</script>
