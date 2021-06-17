<template>
  <div class="flex flex-col justify-center items-center timer-sidebar">
    <div v-show="sessionState.isSessionCreated" class="text-center px-3">
      <p class="text-sm text-dark-gray mb-6 font-bold">
        {{ $t('Current session will end at') }} {{ currentSessionTimer }}
      </p>
    </div>

    <timer-sidebar-clock
      :is-layout-stacked="false"
      @click="$emit('onTimerClick')"
    />

    <timer-sidebar-expander-unstacked
      class="mt-4"
      @onScreenExpand="$emit('onScreenExpand')"
    />

    <timer-sidebar-controls
      :is-layout-stacked="false"
      @onStart="$emit('onStart')"
      @onPause="$emit('onPause')"
      @onResume="$emit('onResume')"
      @onAbort="$emit('onAbort')"
      @onSkip="$emit('onSkip')"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TimerSidebarControls from '../Atoms/TimerSidebarChildren/TimerSidebarControls'
import TimerSidebarClock from '../Atoms/TimerSidebarChildren/TimerSidebarClock'
import TimerSidebarExpanderUnstacked from '../Atoms/TimerSidebarChildren/TimerSidebarExpanderUnstacked'

export default {
  name: 'TimerSidebarUnstacked',
  components: {
    TimerSidebarExpanderUnstacked,
    TimerSidebarClock,
    TimerSidebarControls,
  },
  computed: {
    ...mapGetters({
      sessionState: 'sessions/getSessionState',
      currentSessionTimer: 'timers/getCurrentSessionEndTime',
    }),
  },
}
</script>
