<template>
  <screen-expander :is-expanded="true" @onClose="$emit('onClose')">
    <timer-screen-expander-clock
      :is-session-pending="isSessionPending"
      :is-paused="isPaused"
      :is-pending="isPending"
      :is-running="isRunning"
      :session-steps="sessionSteps"
      :labels="labels"
      :current-timer="currentTimer"
      :current-session-end-time="currentSessionEndTime"
      @click="$emit('onTimerClick')"
    />
    <div class="mt-16">
      <timer-screen-expander-controls
        :is-session-pending="isSessionPending"
        :is-paused="isPaused"
        :is-running="isRunning"
        :is-session-started-but-pending-process="
          isSessionStartedButPendingProcess
        "
        :labels="labels"
        @onStart="$emit('onStart')"
        @onPause="$emit('onPause')"
        @onResume="$emit('onResume')"
        @onStop="$emit('onStop')"
      />
    </div>
  </screen-expander>
</template>

<script>
import { POMODORO_STATUS } from '@/constantes'
import ScreenExpander from '@/components/Molecules/ScreenExpander'
import TimerScreenExpanderClock from '@/components/Atoms/TimerScreenExpanderChildren/TimerScreenExpanderClock'
import TimerScreenExpanderControls from '@/components/Atoms/TimerScreenExpanderChildren/TimerScreenExpanderControls'

export default {
  name: 'TimerScreenExpander',
  components: {
    ScreenExpander,
    TimerScreenExpanderControls,
    TimerScreenExpanderClock,
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
      required: true,
    },

    sessionSteps: {
      type: Array,
      required: true,
    },
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
  },
}
</script>
