<template>
  <div>
    <transition-sidebar-content>
      <timer-sidebar-unstacked
        v-show="!isLayoutStacked"
        @onStart="startCurrentStep"
        @onPause="pauseCurrentStep"
        @onResume="resumeCurrentStep"
        @onSkip="onSkipCurrentStepClick"
        @onAbort="onAbortClick"
        @onStartSession="startSession"
        @onTimerClick="onTimerClick"
        @onScreenExpand="$emit('onScreenExpand')"
      />
    </transition-sidebar-content>
    <transition-sidebar-content>
      <timer-sidebar-stacked
        v-show="isLayoutStacked"
        @onStart="startCurrentStep"
        @onPause="pauseCurrentStep"
        @onResume="resumeCurrentStep"
        @onSkip="onSkipCurrentStepClick"
        @onAbort="onAbortClick"
        @onStartSession="startSession"
        @onTimerClick="onTimerClick"
        @onScreenExpand="$emit('onScreenExpand')"
      />
    </transition-sidebar-content>
  </div>
</template>

<script>
import TimerSidebarStacked from '@/components/Organisms/TimerSidebarStacked'
import TimerSidebarUnstacked from '@/components/Organisms/TimerSidebarUnstacked'
import TransitionSidebarContent from '@/components/Atoms/Transitions/Sidebar/TransitionSidebarContent'
import { mapActions } from 'vuex'

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
    ...mapActions({
      onAbortClick: 'sessions/onAbortClick',
      onSkipCurrentStepClick: 'sessions/onSkipCurrentStepClick',
      onTimerClick: 'sessions/onTimerClick',
      pauseCurrentStep: 'sessions/pauseCurrentStep',
      resumeCurrentStep: 'sessions/resumeCurrentStep',
      startCurrentStep: 'sessions/startCurrentStep',
      startSession: 'sessions/startSession',
    }),
  },
}
</script>
