<template>
  <div class="app-layout">
    <index-sidebar @onScreenExpand="handleScreenExpand" />
    <section
      class="app-layout__main-content"
      :class="isLayoutStacked && 'app-layout__main-content--stacked'"
    >
      <div class="w-full">
        <index-top-header class="pb-32" />
        <current-tab-header class="flex justify-between" />
        <task-tables class="w-full pt-5" :is-layout-stacked="isLayoutStacked" />
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
    <!--  Notifications -->
    <notifications-container />
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
import NotificationsContainer from '@/components/Templates/NotificationsContainer'

export default {
  name: 'PageIndex',
  components: {
    TaskTables,
    IndexSidebar,
    IndexTopHeader,
    CurrentTabHeader,
    ModalPanelSelectRunningTask,
    ModalSettingsPanel,
    TimerScreenExpander,
    NotificationsContainer,
  },
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
  mounted() {
    const notif = {
      title: 'Delete Task',
      description: 'Are you sure to delete the task ?',
      actionRequired: false,
      type: 'info',
    }
    const notifWithCalllback = {
      title: 'Delete Task',
      description: 'Are you sure to delete the task ?',
      actionRequired: true,
      type: 'info',
      closeCallback: this.prout,
      confirmCallback: this.confi,
    }
    this.$store.dispatch('globalState/createNotification', notif)
    setTimeout(() => {
      this.$store.dispatch('globalState/createNotification', notifWithCalllback)
    }, 3000)
  },
  methods: {
    handleToggleStacked() {
      this.$store.commit('globalState/TOGGLE_STACKED_LAYOUT')
    },
    prout() {
      console.log('CLOSE CALLBACK TRIGGERD')
    },
    confi() {
      console.log('SUCCESS CALLBACK TRIGGERD')
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
