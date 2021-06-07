<template>
  <div>
    <transition-sidebar-content>
      <timer-sidebar-unstacked
        v-show="isUnStacked"
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
        v-show="isStacked"
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
import { SIDEBAR_TOGGLE_ANIMATION_TIMEOUT } from '@/constantes'

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
  data() {
    return {
      isUnStacked: true,
      isStacked: false,
    }
  },
  watch: {
    /*
      Allow the time necessary to not have both element on the same time
      So we don't see them going down or going up during the animation process
      all files that implement this logic on sidebar, must have always the same code/duration
   */
    isLayoutStacked(isStackedTrue, oldValue) {
      if (isStackedTrue) {
        this.isUnStacked = false
        setTimeout(() => {
          this.isStacked = true
        }, 500)
      } else {
        this.isStacked = false
        setTimeout(() => {
          this.isUnStacked = true
        }, SIDEBAR_TOGGLE_ANIMATION_TIMEOUT)
      }
    },
  },
  mounted() {
    if (this.isLayoutStacked) {
      this.isStacked = true
      this.isUnStacked = false
    } else {
      this.isStacked = false
      this.isUnStacked = true
    }
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
