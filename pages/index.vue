<template>
  <div class="app-layout">
    <index-sidebar @onScreenExpand="handleScreenExpand" />
    <section
      class="app-layout__main-content overflow-y-auto max-h-screen"
      :class="isLayoutStacked && 'app-layout__main-content--stacked'"
    >
      <div class="w-full">
        <index-top-header class="pb-32" />
        <current-tab-header class="flex justify-between" />
        <task-tables
          class="w-full pt-5 pb-12"
          :is-layout-stacked="isLayoutStacked"
        />
      </div>
    </section>

    <!--    MODAL SELECT RUNNING TASK -->
    <modal-panel-select-running-task
      :is-open="currentModalOpen === modalsRefs.SELECT_RUNNING_TASK"
      @onClose="closeAnyModals"
    />

    <!--    MODAL SETTINGS -->
    <modal-settings-panel
      :is-open="currentModalOpen === modalsRefs.SETTINGS"
      @onClose="closeAnyModals"
    />

    <!--    TIMER SCREEN EXPANDER -->
    <timer-screen-expander
      :is-expanded="isTimerScreenExpanderOpen"
      @onClose="handleCloseScreenExpander"
    />
  </div>
</template>

<script>
import IndexTopHeader from '@/components/Templates/IndexPageComponentsGroup/IndexTopHeader'
import CurrentTabHeader from '@/components/Templates/IndexPageComponentsGroup/CurrentTabHeader'
import IndexSidebar from '@/components/Templates/IndexPageComponentsGroup/IndexSidebar'
import TaskTables from '@/components/Templates/IndexPageComponentsGroup/TaskTables'
import ModalPanelSelectRunningTask from '@/components/Organisms/PanelSelectRunningTask/ModalPanelSelectRunningTask'
import ModalSettingsPanel from '@/components/Organisms/SettingsPanels/ModalSettingsPanel'
import TimerScreenExpander from '@/components/Organisms/TimerScreenExpander'

export default {
  name: 'Index',
  components: {
    TaskTables,
    IndexSidebar,
    IndexTopHeader,
    CurrentTabHeader,
    ModalPanelSelectRunningTask,
    ModalSettingsPanel,
    TimerScreenExpander,
  },
  layout: 'main',
  middleware: 'auth',
  data() {
    return {
      isTimerScreenExpanderOpen: false,
    }
  },
  computed: {
    isLayoutStacked() {
      return this.$store.state.globalState.isLayoutStacked
    },
    currentModalOpen() {
      return this.$store.state.globalState.currentModalOpen
    },
    modalsRefs() {
      return this.$store.state.globalState.modalsRefs
    },
  },
  methods: {
    handleToggleStacked() {
      this.$store.commit('globalState/TOGGLE_STACKED_LAYOUT')
    },
    handleScreenExpand() {
      this.closeAnyModals()
      this.isTimerScreenExpanderOpen = true
    },
    handleCloseScreenExpander() {
      this.isTimerScreenExpanderOpen = false
    },
    closeAnyModals() {
      this.$store.commit('globalState/RESET_CURRENT_MODAL_OPEN')
    },
  },
}
</script>
