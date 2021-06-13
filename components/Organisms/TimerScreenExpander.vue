<template>
  <screen-expander :is-expanded="isExpanded" @onClose="$emit('onClose')">
    <timer-screen-expander-clock />
    <div class="mt-16">
      <timer-screen-expander-controls
        @onStart="startCurrentStep"
        @onPause="pauseCurrentStep"
        @onResume="resumeCurrentStep"
        @onSkip="onSkipCurrentStepClick"
        @onAbort="onAbortClick"
        @onStartSession="handleStartSession"
      />
    </div>
  </screen-expander>
</template>

<script>
import ScreenExpander from '@/components/Molecules/ScreenExpander'
import TimerScreenExpanderClock from '@/components/Atoms/TimerScreenExpanderChildren/TimerScreenExpanderClock'
import TimerScreenExpanderControls from '@/components/Atoms/TimerScreenExpanderChildren/TimerScreenExpanderControls'
import { mapActions } from 'vuex'

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
    ...mapActions({
      onAbortClick: 'sessions/onAbortClick',
      onSkipCurrentStepClick: 'sessions/onSkipCurrentStepClick',
      pauseCurrentStep: 'sessions/pauseCurrentStep',
      resumeCurrentStep: 'sessions/resumeCurrentStep',
      startCurrentStep: 'sessions/startCurrentStep',
      createAndStartSession: 'sessions/createAndStartSession',
    }),
    handleStartSession() {
      this.$store.commit('globalState/SET_LAUNCH_TIMER_VISIBILITY', true)
      this.createAndStartSession()
    },
  },
}
</script>
