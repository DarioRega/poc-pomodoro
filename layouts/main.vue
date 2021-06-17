<template>
  <div :class="userTheme">
    <Nuxt v-if="!isEnvLoading && !isRefreshLoading" />
    <!--  Notifications -->
    <notifications-container />
    <screen-loader v-if="isEnvLoading || isRefreshLoading">
      <h5 class="font-body tracking-wider text-dark-blue dark:text-celeste">
        {{
          isEnvLoading
            ? $t('Loading your environment...')
            : $t('Synchronizing channels...')
        }}
      </h5>
    </screen-loader>
    <transition-translate-y
      duration-amount="500"
      translate-y="-translate-y-full"
    >
      <launch-session-timer v-if="isLaunchTimerVisible" />
    </transition-translate-y>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import LaunchSessionTimer from '@/components/Atoms/LaunchSessionTimer'
import TransitionTranslateY from '@/components/Atoms/Transitions/TransitionTranslateY'
import NotificationsContainer from '@/components/Templates/NotificationsContainer'
import ScreenLoader from '@/components/Atoms/Loaders/ScreenLoader'

export default {
  name: 'Main',

  components: {
    NotificationsContainer,
    ScreenLoader,
    LaunchSessionTimer,
    TransitionTranslateY,
  },

  /*
    Computed
  */
  computed: {
    ...mapGetters({
      sessionState: 'sessions/getSessionState',
      sessionRestingTime: 'sessions/getSessionRestingTime',
      sessionRunningEndTime: 'sessions/getCurrentRunningSessionEndTime',
      currentStepEndTime: 'sessions/getCurrentStepEndTime',
      getNextStep: 'sessions/getNextStep',
      hasCurrentSession: 'sessions/hasCurrentSession',
      sessionEndTimeTimer: 'timers/getCurrentSessionEndTime',
      currentStepTimer: 'timers/getCurrentStepTimer',
      userTheme: 'user/getUserTheme',
      timeFormat: 'user/getTimeFormat',
    }),

    isLaunchTimerVisible() {
      return this.$store.state.globalState.isLaunchTimerVisible
    },
    isEnvLoading() {
      return this.$store.state.globalState.isEnvLoading
    },
    isRefreshLoading() {
      return this.$store.state.globalState.isRefreshLoading
    },
  },

  /*
    Lifecycles
  */
  async mounted() {
    /*
      Verify if user refresh page, we get the env data
     */
    if (!this.sessionState.isSessionCreated) {
      await this.getEnvironment(false)
    }
  },
  /*
    Methods
  */
  methods: {
    ...mapActions({
      getAndSetCurrentSession: 'sessions/getAndSetCurrentSession',
      finishCurrentStep: 'sessions/finishCurrentStep',
      getEnvironment: 'globalState/getEnvironment',
      getAndSetAllTasks: 'tasks/getAndSetAllSingleTasks',
      getAndSetAllTaskStatuses: 'tasks/getAndSetAllTaskStatuses',
    }),
  },
}
</script>
