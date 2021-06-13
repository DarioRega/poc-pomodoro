<template>
  <div class="timer-sidebar__controls">
    <!--  IS RUNNING -->
    <div v-show="sessionState.isRunning" class="timer-sidebar__controls">
      <button
        class="timer-sidebar__controls__buttons text-error"
        @click="$emit('onPause')"
      >
        <icon icon-name="pause" />
      </button>
    </div>

    <!--    IS PAUSED oR PENDING -->
    <div
      v-show="
        sessionState.isPaused ||
        sessionState.isSessionStartedButHasPendingProcess
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
import { mapGetters } from 'vuex'
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
    ...mapGetters({
      sessionState: 'sessions/getSessionState',
    }),
    isResumeOrStart() {
      return this.sessionState.isPaused ? 'resume' : 'play'
    },
  },
  methods: {
    handleResumeOrStart() {
      if (this.sessionState.isPaused) {
        this.$emit('onResume')
      } else {
        this.$emit('onStart')
      }
    },
  },
}
</script>
