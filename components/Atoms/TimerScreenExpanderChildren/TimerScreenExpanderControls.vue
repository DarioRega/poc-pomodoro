<template>
  <div class="screen_expander__controls">
    <!--    RUNNING -->
    <div v-show="getTimerState.isRunning" class="text-center">
      <button
        class="screen-expander__control bg-error"
        @click="$emit('onPause')"
      >
        <icon icon-name="pause" class="w-2/5" />
      </button>
    </div>

    <!--    PAUSED -->
    <div v-show="getTimerState.isPaused" class="flex justify-center gap-x-12">
      <button
        class="screen-expander__control bg-error"
        @click="$emit('onStop')"
      >
        <icon icon-name="stop" class="w-2/5" />
      </button>
      <button
        class="screen-expander__control bg-success"
        @click="$emit('onResume')"
      >
        <icon icon-name="play" class="w-2/5" />
      </button>
    </div>

    <!--    PENDING STATUS BUT SESSION IN_PROGRESS -->
    <div
      v-show="getTimerState.isSessionStartedButPendingProcess"
      class="flex justify-center gap-x-12"
    >
      <button
        class="screen-expander__control bg-error"
        @click="$emit('onStop')"
      >
        <icon icon-name="stop" class="w-2/5" />
      </button>
      <button
        class="screen-expander__control bg-success"
        @click="$emit('onStart')"
      >
        <icon icon-name="play" class="w-2/5" />
      </button>
    </div>

    <!-- SESSION NOT IN_PROGRESS -->
    <div v-if="getTimerState.isSessionPending" class="text-center mt-8">
      <brand-button
        class="uppercase font-bold"
        @click="$emit('onStartSession')"
      >
        {{ $t('Start session') }}
      </brand-button>
    </div>
  </div>
</template>

<script>
import BrandButton from '@/components/Atoms/BrandButton'
import Icon from '../Icon'

export default {
  name: 'TimerScreenExpanderControls',
  components: { Icon, BrandButton },
  computed: {
    getTimerState() {
      return this.$store.getters['sessions/getTimerState']
    },
  },
}
</script>
<style lang="scss" scoped>
.screen-expander {
  &__controls {
    @apply flex justify-center;
  }
  &__control {
    @apply w-20 h-20 rounded-full text-celeste;
    &:hover {
      @apply bg-opacity-80;
    }
  }
}
</style>
