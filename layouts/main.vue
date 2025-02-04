<template>
  <div :class="userTheme">
    <div class="hidden lg:block">
      <Nuxt v-if="!isEnvLoading && !isRefreshLoading && $auth.user" />
      <!--  Notifications -->
      <notifications-container />
      <screen-loader v-if="isEnvLoading || isRefreshLoading">
        <h5 class="font-body tracking-wider text-dark-blue dark:text-celeste">
          {{
            isEnvLoading
              ? $t('Loading your environment...')
              : $t('Synchronizing with channels...')
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
    <div class="lg:hidden h-screen flex items-center justify-center">
      <div class="text-center">
        <h4 class="text-dark-gray">
          {{
            $t(
              'This layout is not available on device smaller than 1024 pixels wide'
            )
          }}
        </h4>
        <h6 class="text-dark-gray mt-6">
          {{ $t('Stacked layout will be available on v2') }}
        </h6>
      </div>
    </div>
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
      userTheme: 'user/getUserTheme',
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
    Lifecyclesfault
  */
  async mounted() {
    /*
      Verify if user refresh page, we get the env data
     */
    if (sessionStorage.getItem('is_page_reload')) {
      this.$store.commit('globalState/SET_REFRESH_LOADING', true, {
        root: true,
      })
    } else {
      this.$store.commit('globalState/SET_ENV_LOADING', true, { root: true })
    }
    await this.getEnvironment()
    sessionStorage.setItem('is_page_reload', 'true')
  },
  /*
    Methods
  */
  methods: {
    ...mapActions({
      getEnvironment: 'globalState/getEnvironment',
    }),
  },
}
</script>
