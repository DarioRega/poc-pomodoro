<template>
  <div>
    <transition-sidebar-content>
      <timer-sidebar-unstacked
        v-show="!isStacked"
        :status="status"
        :labels="labels"
        :current-timer="currentTimer"
      >
        <slot name="currentSessionInformations" />
      </timer-sidebar-unstacked>
    </transition-sidebar-content>
    <transition-sidebar-content>
      <timer-sidebar-stacked
        v-show="isStacked"
        :status="status"
        :labels="labels"
        :current-timer="currentTimer"
      >
        <slot name="currentSessionInformations" />
      </timer-sidebar-stacked>
    </transition-sidebar-content>
  </div>
</template>

<script>
import TimerSidebarStacked from '@/components/Organisms/TimerSidebarStacked'
import TimerSidebarUnstacked from '@/components/Organisms/TimerSidebarUnstacked'
import { POMODORO_STATUS } from '@/constantes'
import TransitionSidebarContent from '@/components/Atoms/Transitions/Sidebar/TransitionSidebarContent'

export default {
  name: 'TimerSidebar',
  components: {
    TimerSidebarUnstacked,
    TimerSidebarStacked,
    TransitionSidebarContent,
  },
  props: {
    isStacked: {
      type: Boolean,
      default: false,
    },
    currentTimer: {
      type: String,
      default: '',
    },
    labels: {
      type: Object,
      default: () => ({
        resume: 'Resume',
        pause: 'Pause',
        stop: 'Stop',
        start: 'Start',
        startSession: 'Start session',
        restartCurrentSession: 'Restart session',
      }),
    },
    status: {
      type: String,
      default: POMODORO_STATUS.SESSION.pending,
    },
  },
}
</script>
