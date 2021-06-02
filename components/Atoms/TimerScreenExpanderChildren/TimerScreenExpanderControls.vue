<template>
  <div class="screen_expander__controls">
    <!--    RUNNING -->
    <div v-show="isRunning" class="text-center">
      <button
        class="screen-expander__control bg-error"
        @click="$emit('onPause')"
      >
        <icon icon-name="pause" class="w-2/5" />
        <span class="sr-only">{{ labels.pause }}</span>
      </button>
    </div>

    <!--    PAUSED -->
    <div v-show="isPaused" class="flex justify-center gap-x-12">
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

    <!--    PENDING STATUS BUT SESSION STARTED -->
    <div
      v-show="isSessionStartedButPendingProcess"
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

    <!-- SESSION NOT STARTED -->
    <div v-if="isSessionPending" class="text-center mt-8">
      <brand-button class="uppercase font-bold" @click="$emit('click')">
        {{ labels.startSession }}
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
  props: {
    isRunning: {
      type: Boolean,
      default: false,
    },
    isPaused: {
      type: Boolean,
      default: false,
    },
    isSessionPending: {
      type: Boolean,
      default: false,
    },
    isSessionStartedButPendingProcess: {
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
