<template>
  <div class="flex flex-col justify-center items-center timer-sidebar--stacked">
    <timer-sidebar-expander-stacked
      class="mb-3"
      :should-show-session-information="shouldShowSessionInformation"
      :has-informations="hasInformations"
      @click="handleScreenExpand"
    />

    <timer-sidebar-clock
      :is-session-pending="isSessionPending"
      :is-stacked="true"
      :should-show-start-text="false"
      :labels="labels"
      :current-timer="currentTimer"
      @click="$emit('onTimerClick')"
    />
    <timer-sidebar-controls
      :is-running="isRunning"
      :is-paused="isPaused"
      :is-status-pending-and-session-already-started="
        isStatusPendingAndSessionAlreadyStarted
      "
      :is-stacked="true"
      :labels="labels"
      @handleStart="handleStart"
      @handlePause="handlePause"
      @handleResume="handleResume"
      @handleStop="handleStop"
    />
  </div>
</template>

<script>
import { POMODORO_STATUS } from '../../constantes'
import TimerSidebarControls from '../Atoms/TimerSidebarChildren/TimerSidebarControls'
import TimerSidebarClock from '../Atoms/TimerSidebarChildren/TimerSidebarClock'
import TimerSidebarExpanderStacked from '../Atoms/TimerSidebarChildren/TimerSidebarExpanderStacked'

export default {
  name: 'TimerSidebarStacked',
  components: {
    TimerSidebarExpanderStacked,
    TimerSidebarClock,
    TimerSidebarControls,
  },

  props: {
    status: {
      type: String,
      default: POMODORO_STATUS.SESSION.pending,
    },

    labels: {
      type: Object,
      default: () => ({
        resume: 'Resume',
        pause: 'Pause',
        stop: 'Stop',
        start: 'Start',
        startSession: 'Start session',
        restartCurrentSession: 'Restart session',
      }),
    },
    currentTimer: {
      type: String,
      default: '',
    },
  },

  computed: {
    isSessionPending() {
      return this.status.includes(POMODORO_STATUS.SESSION.pending)
    },
    hasInformations() {
      return !!this.$slots.currentSessionInformations
    },
    shouldShowSessionInformation() {
      return !this.status.includes('PENDING') && !this.isSessionPending
    },
    isStatusPendingAndSessionAlreadyStarted() {
      return this.status.includes('PENDING') && !this.isSessionPending
    },
    isPaused() {
      return this.status.includes('PAUSED') && !this.isSessionPending
    },
    isRunning() {
      return this.status.includes('STARTED') && !this.isSessionPending
    },
  },
  methods: {
    handlePause() {
      this.$emit('onPause')
    },
    handleResume() {
      if (
        this.status === POMODORO_STATUS.POMODORO.pending &&
        this.status === POMODORO_STATUS.SMALL_BREAK.pending &&
        this.status === POMODORO_STATUS.BIG_BREAK.pending
      ) {
        this.handleStart()
      } else {
        this.$emit('onResume')
      }
    },
    handleStop() {
      this.$emit('onStop')
    },
    handleStart() {
      this.$emit('onStart')
    },
    handleScreenExpand() {
      this.$emit('onScreenExpand')
    },
  },
}
</script>
