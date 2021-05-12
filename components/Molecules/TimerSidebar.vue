<template>
  <div class="timer-sidebar inline-flex flex-col justify-center items-center">
    <!--    current session info-->
    <button
      class="timer-sidebar__clock w-32 h-32 rounded-full uppercase text-base font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-indigo dark:focus:ring-light-indigo"
      @click="handleClick"
    >
      <span v-if="isPomodoroPending">{{ labels.startSession }}</span>
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
    </button>
    <div class="mt-4 timer-siderbar__expander">
      <!--      expander-->
    </div>
    <div class="timer-sidebar__controls">
      <div v-show="isRunning" class="">
        <!--        <button>-->
        <!--          <icon icon-name=""-->
        <!--                </button-->
        <!--          >-->
        <!--          </icon>-->
        <!--        </button>-->
      </div>
      <div
        v-if="isPaused"
        :class="isStacked && 'stacked'"
        class="mt-4 timer-sidebar__controls--paused"
      >
        <button :class="!isStacked && 'mr-2'" @click="handleResume">
          <icon icon-name="play" />
          <span>{{ labels.resume }}</span>
        </button>
        <button :class="!isStacked && 'ml-2'" @click="handleStop">
          <icon icon-name="stop" />
          <span>{{ labels.stop }}</span>
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
      console.log('full vaue', value)
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
      default: POMODORO_STATUS.POMODORO.pending,
    },
    labels: {
      type: Object,
      required: true,
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
    isPomodoroPending() {
      return this.status.includes(POMODORO_STATUS.POMODORO.pending)
    },
    isPaused() {
      return this.status.includes('PAUSED') && !this.isPomodoroPending
    },
    isRunning() {
      return this.status.includes('STARTED') && !this.isPomodoroPending
    },
  },
  methods: {
    handleClick() {
      console.log('click')
    },
    handleResume() {
      console.log('click RESUME')
    },
    handleStop() {
      console.log('click STOP')
    },
  },
}
</script>

<style scoped lang="scss">
.timer-sidebar {
  &__clock {
    @apply bg-dark-indigo text-celeste font-semibold font-timer;
    @apply dark:bg-light-indigo;

    &--visible {
      h2 {
        @apply mb-0 tracking-wide;
      }
    }
  }
  &__controls {
    & > div {
      @apply flex justify-center items-center;
    }

    &--paused {
      @apply flex-row;
      button {
        @apply items-center flex h-5;
        &:nth-child(1) {
          @apply text-success;
        }
        &:nth-child(2) {
          @apply text-error;
        }
        &:focus {
          @apply outline-none;
          span {
            @apply text-dark-indigo;
            @apply dark:text-light-indigo;
          }
        }
      }

      svg {
        @apply w-5 h-5;
      }
      span {
        @apply ml-2 font-timer font-semibold h-full;
      }

      &.stacked {
        @apply flex-col;
        span {
          @apply hidden;
        }
      }
    }
  }
}
</style>
