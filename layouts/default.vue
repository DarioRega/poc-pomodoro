<template>
  <div>
    <Nuxt />
    <!--  Notifications -->
    <notifications-container />
    <screen-loader v-if="isEnvLoading">
      <h5 class="font-body tracking-wider text-dark-blue dark:text-celeste">
        {{ $t('Loading your environment') }}
      </h5>
    </screen-loader>
  </div>
</template>
<script>
import NotificationsContainer from '@/components/Templates/NotificationsContainer'
import ScreenLoader from '@/components/Atoms/Loaders/ScreenLoader'
export default {
  components: { NotificationsContainer, ScreenLoader },
  computed: {
    isEnvLoading() {
      return this.$store.state.globalState.isEnvLoading
    },
  },
}
</script>
