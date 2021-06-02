<template>
  <div class="flex flex-col justify-center items-center timer-sidebar">
    <div v-show="shouldShowSessionInformation" class="mb-3 max-w-full px-4">
      <slot name="currentSessionInformations" />
    </div>

    <timer-sidebar-clock
      :is-session-pending="isSessionPending"
      :is-stacked="false"
      :should-show-start-text="shouldShowStartText"
      :labels="labels"
      :current-timer="currentTimer"
      @click="$emit('onTimerClick')"
    />

    <timer-sidebar-expander-unstacked
      class="mt-4"
      @click="handleScreenExpand"
    />

    <timer-sidebar-controls
      :is-running="isRunning"
      :is-paused="isPaused"
      :is-status-pending-and-session-already-started="
        isStatusPendingAndSessionAlreadyStarted
      "
      :is-stacked="false"
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
import TimerSidebarExpanderUnstacked from '../Atoms/TimerSidebarChildren/TimerSidebarExpanderUnstacked'

export default {
  name: 'TimerSidebarUnstacked',
  components: {
    TimerSidebarExpanderUnstacked,
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
    shouldShowStartText() {
      return (
        (this.status.includes('PENDING') || this.status.includes('PAUSED')) &&
        !this.isSessionPending
      )
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
