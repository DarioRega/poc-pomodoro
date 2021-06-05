<template>
  <sidebar class="app-layout__sidebar" :is-layout-stacked="isLayoutStacked">
    <template #currentTime>
      <current-time :is-layout-stacked="isLayoutStacked" />
    </template>
    <template #timer>
      <timer-sidebar
        :is-layout-stacked="isLayoutStacked"
        @onScreenExpand="$emit('onScreenExpand')"
      />
    </template>
  </sidebar>
</template>

<script>
import TimerSidebar from '@/components/Organisms/TimerSidebar'
import Sidebar from '@/components/Organisms/Sidebar'
import CurrentTime from '@/components/Atoms/CurrentTime'

export default {
  name: 'IndexSidebar',
  components: { Sidebar, TimerSidebar, CurrentTime },
  computed: {
    isLayoutStacked() {
      return this.$store.state.globalState.isLayoutStacked
    },
  },
}
</script>
