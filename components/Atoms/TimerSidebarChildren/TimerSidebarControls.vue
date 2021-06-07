<template>
  <div class="timer-sidebar__controls">
    <!--  IS RUNNING -->
    <div v-show="getTimerState.isRunning" class="timer-sidebar__controls">
      <button
        class="timer-sidebar__controls__buttons text-error"
        @click="$emit('onPause')"
      >
        <icon icon-name="pause" />
      </button>
    </div>

    <!--    IS PAUSED -->
    <div
      v-show="
        getTimerState.isPaused ||
        getTimerState.isSessionStartedButPendingProcess
      "
      class="timer-sidebar__controls"
      :class="isLayoutStacked ? 'flex-col-reverse gap-y-4' : 'gap-x-6'"
    >
      <button
        class="timer-sidebar__controls__buttons text-error"
        @click="$emit('onAbort')"
      >
        <icon icon-name="stop" />
      </button>
      <button
        class="timer-sidebar__controls__buttons text-success"
        @click="handleResumeOrStart"
      >
        <icon :icon-name="isResumeOrStart" />
      </button>
      <button
        class="
          timer-sidebar__controls__buttons
          text-dark-indigo
          dark:text-light-indigo
        "
        @click="$emit('onSkip')"
      >
        <icon icon-name="skip" />
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
    isResumeOrStart() {
      return this.getTimerState.isPaused ? 'resume' : 'play'
    },
  },
  methods: {
    handleResumeOrStart() {
      if (this.getTimerState.isPaused) {
        this.$emit('onResume')
      } else {
        this.$emit('onStart')
      }
    },
  },
}
</script>
