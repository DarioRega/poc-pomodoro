<template>
  <div
    class="flex flex-col justify-center items-center"
    :class="isStacked ? 'timer-sidebar--stacked' : 'timer-sidebar'"
  >
    <div v-show="!isStacked" class="max-w-full mb-3">
      <slot name="currentSessionInformations" />
    </div>

    <timer-sidebar-expander-stacked
      v-show="isStacked"
      class="mb-3"
      @click="handleScreenExpand"
    />

    <timer-sidebar-clock
      :is-session-pending="isSessionPending"
      :is-stacked="isStacked"
      :should-show-start-text="shouldShowStartText"
      :labels="labels"
      :current-timer="currentTimer"
      @click="$emit('onTimerClick')"
    />
    <timer-sidebar-expander-unstacked
      v-show="!isStacked"
      class="mt-4"
      @click="handleScreenExpand"
    />

    <timer-sidebar-controls
      :is-running="isRunning"
      :is-paused="isPaused"
      :is-status-pending-and-session-already-started="
        isStatusPendingAndSessionAlreadyStarted
      "
      :is-stacked="isStacked"
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
import TimerSidebarExpanderUnstacked from '../Atoms/TimerSidebarChildren/TimerSidebarExpanderUnstacked'

export default {
  name: 'TimerSidebar',
  components: {
    TimerSidebarExpanderUnstacked,
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
    isStacked: {
      type: Boolean,
      default: false,
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
    shouldShowStartText() {
      return (
        (this.status.includes('PENDING') || this.status.includes('PAUSED')) &&
        !this.isSessionPending &&
        !this.isStacked
      )
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
        this.isStacked &&
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
      //
    },
  },
}
</script>
