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
import { mapGetters } from 'vuex'
import moment from 'moment-timezone'

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
  },
  data() {
    return {
      isTimerScreenExpanderOpen: false,
      timerInterval: null,
    }
  },
  computed: {
    ...mapGetters({
      isSessionPaused: 'sessions/isSessionPaused',
      isSessionStarted: 'sessions/isSessionStarted',
      getCurrentTimer: 'timer/getCurrentTimer',
    }),
    currentStepEndTime() {
      return this.$store.state.sessions.currentStep.end_time
    },
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
  watch: {
    isSessionPaused(newValue, oldValue) {
      if (this.isSessionStarted && newValue) {
        if (this.timerInterval) {
          this.killInterval()
        }
      }
      if (this.isSessionStarted && !newValue) {
        this.startInterval()
      }
    },
  },
  mounted() {
    if (this.isSessionStarted && !this.isSessionPaused) {
      this.startInterval()
    }
  },
  beforeDestroy() {
    this.killInterval()
  },
  methods: {
    killInterval() {
      clearInterval(this.interval)
    },
    startInterval() {
      const interval = 1000
      this.interval = setInterval(() => {
        const diff = moment(this.currentStepEndTime).unix() - moment().unix()
        const timer = moment.unix(diff).format('mm:ss')
        this.$store.commit('timer/SET_TIMER', timer)
      }, interval)
    },
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
