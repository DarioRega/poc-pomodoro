<template>
  <div class="screen_expander__controls">
    <!--    RUNNING -->
    <div
      v-show="getSessionState.isRunning"
      class="text-center flex justify-center"
    >
      <button
        class="screen-expander__control bg-error"
        @click="$emit('onPause')"
      >
        <icon icon-name="pause" class="w-2/5" />
      </button>
    </div>

    <!--    PAUSED -->
    <div
      v-show="
        getSessionState.isPaused ||
        getSessionState.isSessionStartedButHasPendingProcess
      "
      class="flex justify-center gap-x-12"
    >
      <button
        class="screen-expander__control bg-error"
        @click="$emit('onAbort')"
      >
        <icon icon-name="stop" class="w-2/5" />
      </button>
      <button
        class="screen-expander__control bg-success"
        @click="handleResumeOrStart"
      >
        <icon :icon-name="isResumeOrStart" class="w-2/5" />
      </button>
      <button
        class="screen-expander__control bg-dark-indigo dark:bg-light-indigo"
        @click="$emit('onSkip')"
      >
        <icon icon-name="skip" class="w-2/5" />
      </button>
    </div>

    <!-- SESSION NOT CREATED -->
    <div v-if="!getSessionState.isSessionCreated" class="text-center mt-8">
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
    getSessionState() {
      return this.$store.getters['sessions/getSessionState']
    },
    isResumeOrStart() {
      return this.getSessionState.isPaused ? 'resume' : 'play'
    },
  },
  methods: {
    handleResumeOrStart() {
      if (this.getSessionState.isPaused) {
        this.$emit('onResume')
      } else {
        this.$emit('onStart')
      }
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
    @apply w-20 h-20 rounded-full text-celeste flex items-center justify-center;
    &:hover {
      @apply bg-opacity-80;
    }
  }
}
</style>
