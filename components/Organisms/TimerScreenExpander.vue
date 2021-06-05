<template>
  <screen-expander :is-expanded="isExpanded" @onClose="$emit('onClose')">
    <timer-screen-expander-clock />
    <div class="mt-16">
      <timer-screen-expander-controls
        @onStart="handleStartTimer"
        @onPause="handlePauseTimer"
        @onResume="handleResumeTimer"
        @onSkip="handleSkipProcess"
        @onStop="handleStopTimer"
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
      createNotification: 'globalState/createNotification',
    }),
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
      const notification = {
        title: 'Abort session ?',
        description: 'Are you sure to abort the current session ?',
        actionRequired: true,
        confirmCallback: this.abortCurrentSession,
      }
      this.createNotification(notification)
    },
    handleStartSession() {
      // TODO handle cases
    },
    handleSkipProcess() {
      // TODO handle cases
      const notification = {
        title: 'Skip process ?',
        description: 'Are you sure to skip the current process ?',
        actionRequired: true,
        confirmCallback: this.skipCurrentProcess(),
      }
      this.createNotification(notification)
    },
    abortCurrentSession() {
      // TODO dispatch action
    },
    skipCurrentProcess() {
      console.log('SKIPPPPPP')
    },
  },
}
</script>
