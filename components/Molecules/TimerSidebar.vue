<template>
  <div class="inline-flex flex-col justify-center items-center timer-sidebar">
    <button
      class="w-36 h-36 text-base font-bold uppercase rounded-full timer-sidebar__clock focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-indigo dark:focus:ring-light-indigo"
      @click="$emit('onTimerClick')"
    >
      <p v-if="isSessionPending" class="font-semibold text-lead">
        {{ labels.startSession }}
      </p>
      <div
        v-else
        class="flex justify-center items-center timer-sidebar__clock--visible"
        :class="isStacked ? 'flex-col' : 'flex-row'"
      >
        <h2>
          {{ currentTimer | getOnlyHours }}
        </h2>
        <h2 v-if="!isStacked" class="mx-0.5">
          :
        </h2>
        <h2>
          {{ currentTimer | getOnlyMinutes }}
        </h2>
      </div>
      <p
        v-show="shouldShowStartText"
        class="mt-1 -mb-5 font-bold tracking-wide uppercase"
      >
        {{ labels.start }}
      </p>
    </button>
    <div class="mt-6 timer-sidebar__expander">
      <!--      expander-->
    </div>
    <div class="timer-sidebar__controls" :class="isStacked && 'stacked'">
      <div v-show="isRunning" class="timer-sidebar__controls--running">
        <button class="timer-sidebar__controls__buttons" @click="handlePause">
          <icon icon-name="pause" />
          <span>{{ labels.pause }}</span>
        </button>
      </div>
      <div v-show="isPaused" class="timer-sidebar__controls--paused">
        <button
          class="timer-sidebar__controls__buttons"
          :class="!isStacked && 'mr-2'"
          @click="handleResume"
        >
          <icon icon-name="play" />
          <span>{{ labels.resume }}</span>
        </button>
        <button
          class="timer-sidebar__controls__buttons"
          :class="!isStacked && 'ml-2'"
          @click="handleStop"
        >
          <icon icon-name="stop" />
          <span>{{ labels.stop }}</span>
        </button>
      </div>
      <div
        v-show="isStatusPendingAndSessionAlreadyStarted"
        class="timer-sidebar__controls--session-started-status-pending"
      >
        <button class="timer-sidebar__controls__buttons" @click="handleStop">
          <icon icon-name="stop" />
          <span>{{ labels.restartCurrentSession }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { POMODORO_STATUS } from '../../constantes'
import Icon from '../Atoms/Icon'

export default {
  name: 'TimerSidebar',
  components: { Icon },
  filters: {
    getOnlyHours(value) {
      if (value) {
        return value.split(':')[0]
      }
      return value
    },
    getOnlyMinutes(value) {
      if (value) {
        return value.split(':')[1]
      }
      return value
    },
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
        !this.isSessionPending
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
  mounted() {
    console.log('STATUS', this.status)
  },
  methods: {
    handlePause() {
      this.$emit('onPause')
    },
    handleResume() {
      this.$emit('onResume')
    },
    handleStop() {
      this.$emit('onStop')
    },
  },
}
</script>

<style scoped lang="scss">
.timer-sidebar {
  &__clock {
    @apply bg-dark-indigo text-celeste font-timer;
    @apply dark:bg-light-indigo;

    &--visible {
      h2 {
        @apply mb-0 tracking-wide;
      }
    }
  }
  &__controls {
    @apply mt-2;
    & > div {
      @apply flex justify-center items-center;
    }
    &.stacked {
      & > div {
        @apply flex-col;
      }
      &__buttons {
        span {
          @apply hidden;
        }
      }
    }

    &__buttons {
      @apply flex items-start h-5;
      svg {
        @apply w-5 h-5;
      }
      span {
        @apply ml-2 text-base font-semibold tracking-wide font-timer;
      }
      &:focus {
        @apply outline-none;
        span {
          @apply block text-dark-indigo;
          @apply dark:text-light-indigo;
        }
      }
    }

    &--running {
      button {
        @apply text-error;
      }
    }
    &--paused {
      @apply flex-row;
      button {
        &:nth-child(1) {
          @apply text-success;
        }
        &:nth-child(2) {
          @apply text-error;
        }
      }
    }
    &--session-started-status-pending {
      button {
        @apply text-error;
      }
    }
  }
}
</style>
