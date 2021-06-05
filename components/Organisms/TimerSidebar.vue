<template>
  <div>
    <transition-sidebar-content>
      <timer-sidebar-unstacked
        v-show="!isLayoutStacked"
        @onStart="handleStartTimer"
        @onPause="handlePauseTimer"
        @onResume="handleResumeTimer"
        @onStop="handlePauseTimer"
        @onStartSession="handleStartSession"
        @onTimerClick="handleTimerClick"
        @onScreenExpand="$emit('onScreenExpand')"
      />
    </transition-sidebar-content>
    <transition-sidebar-content>
      <timer-sidebar-stacked
        v-show="isLayoutStacked"
        @onStart="handleStartTimer"
        @onPause="handlePauseTimer"
        @onResume="handleResumeTimer"
        @onStop="handlePauseTimer"
        @onStartSession="handleStartSession"
        @onTimerClick="handleTimerClick"
        @onScreenExpand="$emit('onScreenExpand')"
      />
    </transition-sidebar-content>
  </div>
</template>

<script>
import TimerSidebarStacked from '@/components/Organisms/TimerSidebarStacked'
import TimerSidebarUnstacked from '@/components/Organisms/TimerSidebarUnstacked'
import TransitionSidebarContent from '@/components/Atoms/Transitions/Sidebar/TransitionSidebarContent'

export default {
  name: 'TimerSidebar',
  components: {
    TimerSidebarUnstacked,
    TimerSidebarStacked,
    TransitionSidebarContent,
  },
  props: {
    isLayoutStacked: {
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
    handleTimerClick() {
      this.$store.dispatch('sessions/onTimerClick')
      // TODO handle cases
    },
  },
}
</script>
