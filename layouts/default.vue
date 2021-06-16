<template>
  <div class="dark">
    <Nuxt />
    <screen-loader v-if="isEnvLoading">
      <h5 class="font-body tracking-wider text-dark-blue dark:text-celeste">
        {{ $t('Loading your environment...') }}
      </h5>
    </screen-loader>
    <!--  Notifications -->
    <notifications-container />
  </div>
</template>
<script>
import NotificationsContainer from '@/components/Templates/NotificationsContainer'
import ScreenLoader from '@/components/Atoms/Loaders/ScreenLoader'

export default {
  name: 'Default',
  components: {
    ScreenLoader,
    NotificationsContainer,
  },
  computed: {
    isEnvLoading() {
      return this.$store.state.globalState.isEnvLoading
    },
  },
}
</script>
