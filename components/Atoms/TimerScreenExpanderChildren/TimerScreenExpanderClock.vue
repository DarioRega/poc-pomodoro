<template>
  <div>
    <div
      v-show="!getTimerState.isSessionPending"
      class="mb-24 transition-all duration-300"
    >
      <p class="text-lead text-dark-gray mb-6">
        {{ $t('Current session will end at') }} {{ getCurrentSessionEndTime }}
      </p>
      <div class="flex items-center justify-center">
        <pomodoro-counter
          v-for="(item, index) in getSessionSteps"
          :key="`pomodoro-counter-${index}`"
          class="w-12 h-12"
          :class="index < getSessionSteps.length && 'mr-6'"
          :status="item.status"
        />
      </div>
    </div>
    <div
      class="flex justify-center items-center flex-row clock"
      :class="[
        getTimerState.isRunning && 'running',
        getTimerState.isPaused && 'paused',
        getTimerState.isSessionStartedButPendingProcess && 'pending',
      ]"
    >
      <h2>
        {{ getCurrentTimer | getOnlyHours }}
      </h2>
      <h2 class="mx-1 font-bold">:</h2>
      <h2>
        {{ getCurrentTimer | getOnlyMinutes }}
      </h2>
    </div>
  </div>
</template>

<script>
import PomodoroCounter from '@/components/Atoms/PomodoroCounter'

export default {
  name: 'TimerScreenExpanderClock',
  components: { PomodoroCounter },
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
  computed: {
    getCurrentTimer() {
      return this.$store.getters['timer/getCurrentTimer']
    },
    getCurrentSessionEndTime() {
      return this.$store.getters['sessions/getCurrentSessionEndTime']
    },
    getTimerState() {
      return this.$store.getters['sessions/getTimerState']
    },
    getSessionSteps() {
      return this.$store.getters['sessions/getSessionSteps']
    },
  },
}
</script>
<style lang="scss" scoped>
.clock {
  &.running {
    h2 {
      @apply text-success;
    }
  }
  &.paused {
    h2 {
      @apply text-error;
    }
  }
  &.pending {
    h2 {
      @apply text-dark-indigo;
      @apply dark:text-light-indigo;
    }
  }
  h2 {
    @apply font-bold tracking-wider;

    font-size: 100px;
  }
}
</style>
