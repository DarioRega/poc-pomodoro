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
import { mapGetters } from 'vuex'
import moment from 'moment-timezone'
import _ from 'lodash'

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
      timerInterval: null,
    }
  },
  computed: {
    ...mapGetters({
      sessionState: 'sessions/getSessionState',
      currentStepTimer: 'timers/getCurrentStepTimer',
      hasCurrentSession: 'sessions/hasCurrentSession',
    }),
    currentStepEndTime() {
      if (this.hasCurrentSession) {
        return this.$store.state.sessions.current.current_step.end_time
      }
      return ''
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
    currentStepTimer(newValue, oldValue) {
      if (newValue === '00:00') {
        this.killInterval()
        this.dispatchFinishCurrentStep()
      }
    },
    'sessionState.isSessionPaused'(newValue, oldValue) {
      if (this.sessionState.isSessionStarted && newValue) {
        if (this.timerInterval) {
          this.killInterval()
        }
      }
      if (this.sessionState.isSessionStarted && !newValue) {
        this.startInterval()
      }
    },
  },
  // TODO MOVE TO MAIN LAYOUT
  async mounted() {
    if (_.isEmpty(this.$store.state.sessions.current)) {
      await this.$store.dispatch('sessions/getAndSetCurrentSession')
      // because the timer isn't sync yet we wait 1 more seconds after everything is commited to validate the ui
      setTimeout(() => {
        this.$store.commit('globalState/SET_ENV_LOADING', false)
      }, 1000)
    }
    if (
      this.sessionState.isSessionStarted &&
      !this.sessionState.isSessionPaused &&
      this.sessionState.isRunning
    ) {
      this.startInterval()
    }
  },
  async beforeDestroy() {
    this.killInterval()
    await this.$store.dispatch('sessions/beforeLeavingApplication')
  },
  methods: {
    async dispatchFinishCurrentStep() {
      await this.$store.dispatch('sessions/finishCurrentStep')
    },
    killInterval() {
      clearInterval(this.interval)
    },
    startInterval() {
      const interval = 1000
      this.interval = setInterval(async () => {
        if (!this.currentStepEndTime) {
          // session doesn't exist, bug happened if it made it through here, we need to kill interval and reset state
          this.killInterval()
          // retry to set env from scratch
          await this.$store.dispatch('globalState/getEnvironment')
        }

        const endTimeSecondsAmount = moment(this.currentStepEndTime).diff(
          moment.now(),
          'seconds'
        )
        const currentStepTime = moment.utc(endTimeSecondsAmount * 1000)
        const currentStepTimer = currentStepTime.format('mm:ss')
        const currentStepRestingTime = currentStepTime.format('HH:mm:ss')

        this.$store.commit('timers/SET_CURRENT_STEP_RESTING_TIME_AND_TIMER', {
          currentStepTimer,
          currentStepRestingTime,
        })
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
