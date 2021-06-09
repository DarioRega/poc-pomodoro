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
import LaunchSessionTimer from '@/components/Atoms/LaunchSessionTimer'
import TransitionTranslateY from '@/components/Atoms/Transitions/TransitionTranslateY'
import NotificationsContainer from '@/components/Templates/NotificationsContainer'
import ScreenLoader from '@/components/Atoms/Loaders/ScreenLoader'
import moment from 'moment-timezone'
import { mapGetters } from 'vuex'

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
  },
  mounted() {
    this.setIntervalSessionEndTimeTimerIfSessionNotRunning()
  },
  data() {
    return {
      intervalSessionTimer: null,
    }
  },
  methods: {
    setIntervalSessionEndTimeTimerIfSessionNotRunning() {
      if (!this.sessionState.isRunning) {
        // to synchronize with the current clock
        setTimeout(() => {
          this.setCurrentSessionEndTime()
          this.intervalSessionTimer = setInterval(() => {
            this.setCurrentSessionEndTime()
          }, 60000)
        }, 1000 - moment().millisecond())
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
