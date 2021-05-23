<template>
  <div class="timer-sidebar__controls">
    <div v-show="isRunning" class="timer-sidebar__controls--running">
      <button
        class="timer-sidebar__controls__buttons"
        @click="$emit('handlePause')"
      >
        <icon icon-name="pause" />
        <span>{{ labels.pause }}</span>
      </button>
    </div>
    <div v-show="isPaused" class="timer-sidebar__controls--paused">
      <button
        class="timer-sidebar__controls__buttons"
        :class="!isStacked && 'mr-2'"
        @click="$emit('handleResume')"
      >
        <icon icon-name="play" />
        <span>{{ labels.resume }}</span>
      </button>
      <button
        class="timer-sidebar__controls__buttons"
        :class="!isStacked && 'ml-2'"
        @click="$emit('handleStop')"
      >
        <icon icon-name="stop" />
        <span>{{ labels.stop }}</span>
      </button>
    </div>
    <div
      v-show="isStatusPendingAndSessionAlreadyStarted"
      class="timer-sidebar__controls--session-started-status-pending"
    >
      <button
        v-show="isStacked"
        class="timer-sidebar__controls__buttons"
        @click="$emit('handleStart')"
      >
        <icon icon-name="play" />
        <span>{{ labels.start }}</span>
      </button>
      <button
        class="timer-sidebar__controls__buttons"
        @click="$emit('handleStop')"
      >
        <icon icon-name="stop" />
        <span>{{ labels.restartCurrentSession }}</span>
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
    isStatusPendingAndSessionAlreadyStarted: {
      type: Boolean,
      default: false,
    },
    labels: {
      type: Object,
      required: true,
    },
  },
}
</script>
