<template>
  <div class="flex flex-col justify-center items-center timer-sidebar">
    <div v-show="!isSessionPending" class="text-center px-3">
      <p class="text-sm text-dark-gray mb-6 font-bold">
        {{ labels.currentSessionInformation }} {{ currentSessionEndTime }}
      </p>
    </div>

    <timer-sidebar-clock
      :is-session-pending="isSessionPending"
      :is-stacked="false"
      :labels="labels"
      :current-timer="currentTimer"
      @click="$emit('onTimerClick')"
    />

    <timer-sidebar-expander-unstacked
      class="mt-4"
      @onScreenExpand="$emit('onScreenExpand')"
    />

    <timer-sidebar-controls
      :is-paused="isPaused"
      :is-running="isRunning"
      :is-session-started-but-pending-process="
        isSessionStartedButPendingProcess
      "
      :is-stacked="false"
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
import TimerSidebarExpanderUnstacked from '../Atoms/TimerSidebarChildren/TimerSidebarExpanderUnstacked'

export default {
  name: 'TimerSidebarUnstacked',
  components: {
    TimerSidebarExpanderUnstacked,
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
