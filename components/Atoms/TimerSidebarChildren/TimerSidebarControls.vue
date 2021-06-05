<template>
  <div class="timer-sidebar__controls">
    <!--  IS RUNNING -->
    <div v-show="getTimerState.isRunning" class="timer-sidebar__controls">
      <button
        class="timer-sidebar__controls__buttons text-error"
        @click="$emit('handlePause')"
      >
        <icon icon-name="pause" />
      </button>
    </div>

    <!--    IS PAUSED -->
    <div
      v-show="getTimerState.isPaused"
      class="timer-sidebar__controls"
      :class="isLayoutStacked ? 'flex-col-reverse gap-y-4' : 'gap-x-6'"
    >
      <button
        class="timer-sidebar__controls__buttons text-error"
        @click="$emit('handleStop')"
      >
        <icon icon-name="stop" />
      </button>
      <button
        class="timer-sidebar__controls__buttons text-success"
        @click="$emit('handleResume')"
      >
        <icon icon-name="play" />
      </button>
    </div>
    <!--    PENDING BUT SESSION STARTED -->
    <div
      v-show="getTimerState.isSessionStartedButPendingProcess"
      class="timer-sidebar__controls"
      :class="isLayoutStacked ? 'flex-col-reverse gap-y-4' : 'gap-x-6'"
    >
      <button
        class="timer-sidebar__controls__buttons text-error"
        @click="$emit('handleStop')"
      >
        <icon icon-name="stop" />
      </button>
      <button
        class="timer-sidebar__controls__buttons text-success"
        @click="$emit('handleStart')"
      >
        <icon icon-name="play" />
      </button>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'

export default {
  name: 'TimerSidebarControls',
  components: { Icon },
  props: {
    isLayoutStacked: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getTimerState() {
      return this.$store.getters['sessions/getTimerState']
    },
  },
}
</script>
