<template>
  <div class="timer-sidebar__controls">
    <!--  IS RUNNING -->
    <div v-show="isRunning" class="timer-sidebar__controls">
      <button
        class="timer-sidebar__controls__buttons text-error"
        @click="$emit('handlePause')"
      >
        <icon icon-name="pause" />
      </button>
    </div>

    <!--    IS PAUSED -->
    <div
      v-show="isPaused"
      class="timer-sidebar__controls"
      :class="isStacked ? 'flex-col-reverse gap-y-4' : 'gap-x-6'"
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
      v-show="isSessionStartedButPendingProcess"
      class="timer-sidebar__controls"
      :class="isStacked ? 'flex-col-reverse gap-y-4' : 'gap-x-6'"
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
    isStacked: {
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
  },
}
</script>
