<template>
  <div>
    <div
      v-show="sessionState.isSessionCreated"
      class="mb-24 transition-all duration-300"
    >
      <p class="text-lead text-dark-gray mb-6">
        {{ $t('Current session will end at') }} {{ currentSessionTimer }}
      </p>
      <div class="flex items-center justify-center">
        <pomodoro-counter
          v-for="(item, index) in sessionSteps"
          :key="`pomodoro-counter-${index}`"
          class="w-12 h-12"
          :class="index < sessionSteps.length && 'mr-6'"
          :status="item.status"
        />
      </div>
    </div>
    <div
      class="flex justify-center items-center flex-row clock"
      :class="[
        sessionState.isRunning && 'running',
        sessionState.isPaused && 'paused',
        !sessionState.isSessionCreated && 'pending',
      ]"
    >
      <h2>
        {{ currentStepTimer | getOnlyHours }}
      </h2>
      <h2 class="mx-1 font-bold">:</h2>
      <h2>
        {{ currentStepTimer | getOnlyMinutes }}
      </h2>
    </div>
  </div>
</template>

<script>
import PomodoroCounter from '@/components/Atoms/PomodoroCounter'
import { mapGetters } from 'vuex'

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
    ...mapGetters({
      currentStepTimer: 'timers/getCurrentStepTimer',
      sessionState: 'sessions/getSessionState',
      sessionSteps: 'sessions/getSessionSteps',
      currentSessionTimer: 'timers/getSessionTimer',
    }),
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
