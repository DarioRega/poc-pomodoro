<template>
  <screen-expander :is-expanded="isExpanded" @onClose="$emit('onClose')">
    <timer-screen-expander-clock />
    <div class="mt-16">
      <timer-screen-expander-controls
        @onStart="handleStartTimer"
        @onPause="handlePauseTimer"
        @onResume="handleResumeTimer"
        @onStop="handlePauseTimer"
        @onStartSession="handleStartSession"
      />
    </div>
  </screen-expander>
</template>

<script>
import ScreenExpander from '@/components/Molecules/ScreenExpander'
import TimerScreenExpanderClock from '@/components/Atoms/TimerScreenExpanderChildren/TimerScreenExpanderClock'
import TimerScreenExpanderControls from '@/components/Atoms/TimerScreenExpanderChildren/TimerScreenExpanderControls'

export default {
  name: 'TimerScreenExpander',
  components: {
    ScreenExpander,
    TimerScreenExpanderControls,
    TimerScreenExpanderClock,
  },
  props: {
    isExpanded: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleStartTimer() {
      // TODO handle
    },
    handlePauseTimer() {
      // TODO handle
    },
    handleResumeTimer() {
      // TODO handle
    },
    handleStopTimer() {
      // TODO handle
    },
    handleStartSession() {
      // TODO handle cases
    },
  },
}
</script>
