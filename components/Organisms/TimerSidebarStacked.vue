<template>
  <div class="flex flex-col justify-center items-center timer-sidebar--stacked">
    <timer-sidebar-expander-stacked
      class="mb-3"
      :labels="labels"
      :is-session-pending="isSessionPending"
      :current-session-end-time="currentSessionEndTime"
      @onScreenExpand="$emit('onScreenExpand')"
    />

    <timer-sidebar-clock
      :is-session-pending="isSessionPending"
      :is-stacked="true"
      :labels="labels"
      :current-timer="currentTimer"
      @click="$emit('onTimerClick')"
    />
    <timer-sidebar-controls
      :is-paused="isPaused"
      :is-running="isRunning"
      :is-session-started-but-pending-process="
        isSessionStartedButPendingProcess
      "
      :is-stacked="true"
      @onStart="$emit('onStart')"
      @onPause="$emit('onPause')"
      @onResume="$emit('onResume')"
      @onStop="$emit('onStop')"
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
    isSessionPending: {
      type: Boolean,
      default: false,
    },
    isPending: {
      type: Boolean,
      default: false,
    },
    isRunning: {
      type: Boolean,
      default: false,
    },
    isPaused: {
      type: Boolean,
      default: false,
    },
    isSessionStartedButPendingProcess: {
      type: Boolean,
      default: false,
    },

    currentSessionEndTime: {
      type: String,
      required: true,
    },
    currentTimer: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: POMODORO_STATUS.SESSION.pending,
    },

    labels: {
      type: Object,
      required: true,
    },
  },
}
</script>
