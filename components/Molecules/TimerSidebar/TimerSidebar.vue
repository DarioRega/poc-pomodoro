<template>
  <div
    class="flex flex-col justify-center items-center"
    :class="isStacked ? 'timer-sidebar--stacked' : 'timer-sidebar'"
  >
    <div v-show="!isStacked" class="max-w-full mb-3">
      <slot name="currentSessionInformations" />
    </div>

    <timer-sidebar-expander-stacked
      v-show="isStacked"
      class="timer-sidebar__expander timer-sidebar__expander--stacked"
      @click="handleScreenExpand"
    />

    <timer-sidebar-clock
      class="font-bold uppercase rounded-full timer-sidebar__clock"
      :is-session-pending="isSessionPending"
      :is-stacked="isStacked"
      :should-show-start-text="shouldShowStartText"
      :labels="labels"
      :current-timer="currentTimer"
      @click="$emit('onTimerClick')"
    />
    <timer-sidebar-expander-unstacked
      v-show="!isStacked"
      class="timer-sidebar__expander timer-sidebar__expander--default"
      @click="handleScreenExpand"
    />

    <timer-sidebar-controls
      :is-running="isRunning"
      :is-paused="isPaused"
      :is-status-pending-and-session-already-started="
        isStatusPendingAndSessionAlreadyStarted
      "
      :is-stacked="isStacked"
      :labels="labels"
      class="timer-sidebar__controls"
      @handleStart="handleStart"
      @handlePause="handlePause"
      @handleResume="handleResume"
      @handleStop="handleStop"
    />
  </div>
</template>

<script>
import { POMODORO_STATUS } from '../../../constantes'
import TimerSidebarControls from './TimerSidebarControls'
import TimerSidebarClock from './TimerSidebarClock'
import TimerSidebarExpanderStacked from './TimerSidebarExpanderStacked'
import TimerSidebarExpanderUnstacked from './TimerSidebarExpanderUnstacked'

export default {
  name: 'TimerSidebar',
  components: {
    TimerSidebarExpanderUnstacked,
    TimerSidebarExpanderStacked,
    TimerSidebarClock,
    TimerSidebarControls,
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
  methods: {
    handlePause() {
      this.$emit('onPause')
    },
    handleResume() {
      if (
        this.isStacked &&
        this.status === POMODORO_STATUS.POMODORO.pending &&
        this.status === POMODORO_STATUS.SMALL_BREAK.pending &&
        this.status === POMODORO_STATUS.BIG_BREAK.pending
      ) {
        this.handleStart()
      } else {
        this.$emit('onResume')
      }
    },
    handleStop() {
      this.$emit('onStop')
    },
    handleStart() {
      this.$emit('onStart')
    },
    handleScreenExpand() {
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
      &__expander--stacked {
        @apply flex flex-col;
        button:nth-child(1) {
          @apply mb-3;
        }
      }
    }
  }
}
</style>
