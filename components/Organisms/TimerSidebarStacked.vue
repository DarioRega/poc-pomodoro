<template>
  <div class="flex flex-col justify-center items-center timer-sidebar--stacked">
    <timer-sidebar-expander-stacked
      class="mb-3"
      @onScreenExpand="$emit('onScreenExpand')"
    />

    <timer-sidebar-clock
      :is-layout-stacked="true"
      @click="$emit('onTimerClick')"
    />
    <timer-sidebar-controls
      :is-layout-stacked="true"
      @onStart="$emit('onStart')"
      @onPause="$emit('onPause')"
      @onResume="$emit('onResume')"
      @onAbort="$emit('onAbort')"
    />
  </div>
</template>

<script>
import TimerSidebarControls from '../Atoms/TimerSidebarChildren/TimerSidebarControls'
import TimerSidebarClock from '../Atoms/TimerSidebarChildren/TimerSidebarClock'
import TimerSidebarExpanderStacked from '../Atoms/TimerSidebarChildren/TimerSidebarExpanderStacked'

export default {
  name: 'TimerSidebarStacked',
  components: {
    TimerSidebarExpanderStacked,
    TimerSidebarClock,
    TimerSidebarControls,
  },
}
</script>
