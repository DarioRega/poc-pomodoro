<template>
  <div
    class="flex flex-col justify-center items-center"
    :class="isStacked ? 'timer-sidebar--stacked' : 'timer-sidebar'"
  >
    <div
      v-show="isStacked"
      class="mb-3 timer-sidebar__expander timer-sidebar__expander--stacked"
    >
      <!--      expander-->
      <button class="focus:outline-none timer-sidebar__expander__button h-auto">
        <icon icon-name="expandScreen" class="w-5 h-5" />
      </button>
    </div>

    <button
      class="font-bold uppercase rounded-full timer-sidebar__clock focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-indigo dark:focus:ring-light-indigo"
      @click="$emit('onTimerClick')"
    >
      <div v-if="isSessionPending" class="font-semibold">
        <p v-show="isStacked" class="text-base">
          {{ labels.start }}
        </p>
        <p v-show="!isStacked" class="text-lead">
          {{ labels.startSession }}
        </p>
      </div>
      <div
        v-else
        class="flex justify-center items-center timer-sidebar__clock--time-visible"
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
    <div
      v-show="!isStacked"
      class="mt-6 timer-sidebar__expander timer-sidebar__expander--default"
    >
      <!--      expander-->
    </div>
    <div class="timer-sidebar__controls">
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
        <button
          v-show="isStacked"
          class="timer-sidebar__controls__buttons"
          @click="handleStart"
        >
          <icon icon-name="play" />
          <span>{{ labels.start }}</span>
        </button>
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
    handleStart() {
      //
    },
  },
}
</script>

<style scoped lang="scss">
.timer-sidebar {
  &__clock {
    @apply bg-dark-indigo text-celeste font-timer w-36 h-36 text-base;
    @apply dark:bg-light-indigo;

    &--time-visible {
      h2 {
        @apply mb-0 tracking-wide;
      }
    }
  }
  &__controls {
    @apply mt-3;
    & > div {
      @apply flex justify-center items-center;
    }

    &__buttons {
      @apply flex items-start h-5;
      svg {
        @apply w-5 h-5;
      }
      span {
        @apply ml-2 text-base font-semibold tracking-wide font-timer;
      }
      &:hover {
        @apply text-opacity-60;
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
  &__expander {
    &__button {
      @apply text-dark-indigo;
      @apply dark:text-light-indigo;
      &:hover {
        @apply opacity-60;
      }
      // TODO check the focus on this component if they are taken care with whatinput.scss

      //&:focus {
      //  @apply ring-2 ring-offset-2 ring-dark-indigo ring-offset-light-white;
      //  //@apply dark:ring-light-indigo;
      //  @apply dark:ring-light-indigo dark:ring-offset-dark-blue;
      //}
    }
  }

  &--stacked {
    .timer-sidebar {
      &__clock {
        @apply w-[4.5rem] h-[4.5rem];
        &--time-visible {
          h2 {
            @apply text-lead;
          }
        }
      }

      &__controls {
        & > div {
          @apply flex-col;
        }
        &__buttons {
          &:hover {
            @apply text-opacity-60;
          }
          span {
            @apply hidden;
          }
        }
        &--paused {
          button:nth-child(1) {
            @apply mb-3;
          }
        }
        &--session-started-status-pending {
          button:nth-child(1) {
            @apply text-success mb-3;
            &:hover {
              @apply text-opacity-60;
            }
          }
        }
      }
    }
  }
}
</style>
