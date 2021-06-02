<template>
  <div>
    <transition-sidebar-content>
      <timer-sidebar-unstacked
        v-show="!isStacked"
        :status="status"
        :labels="labels"
        :current-timer="currentTimer"
        :current-session-end-time="currentSessionEndTime"
        :is-session-pending="isSessionPending"
        :is-session-started-but-pending-process="
          isSessionStartedButPendingProcess
        "
        :is-paused="isPaused"
        :is-pending="isPending"
        :is-running="isRunning"
        @onStart="handleStart"
        @onPause="handlePause"
        @onResume="handleResume"
        @onStop="handlePause"
        @onTimerClick="handleTimerClick"
        @onScreenExpand="handleScreenExpand"
      />
    </transition-sidebar-content>
    <transition-sidebar-content>
      <timer-sidebar-stacked
        v-show="isStacked"
        :status="status"
        :labels="labels"
        :current-timer="currentTimer"
        :current-session-end-time="currentSessionEndTime"
        :is-session-pending="isSessionPending"
        :is-session-started-but-pending-process="
          isSessionStartedButPendingProcess
        "
        :is-paused="isPaused"
        :is-pending="isPending"
        :is-running="isRunning"
        @onStart="handleStart"
        @onPause="handlePause"
        @onResume="handleResume"
        @onStop="handlePause"
        @onTimerClick="handleTimerClick"
        @onScreenExpand="handleScreenExpand"
      />
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
    isRunning: {
      type: Boolean,
      default: false,
    },
    isPaused: {
      type: Boolean,
      default: false,
    },
    isPending: {
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
    currentTimer: {
      type: String,
      default: '',
    },
    currentSessionEndTime: {
      type: String,
      required: true,
    },
    labels: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: POMODORO_STATUS.SESSION.pending,
    },
  },
  methods: {
    handlePause() {
      // TODO handle
    },
    handleStart() {
      // TODO handle
    },
    handleResume() {
      // TODO handle
    },
    handleStop() {
      // TODO handle
    },
    handleScreenExpand() {
      // TODO handle
    },
    handleTimerClick() {
      // TODO handle
    },
  },
}
</script>
