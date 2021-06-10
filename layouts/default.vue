<template>
  <div>
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

export default {
  name: 'Default',
  components: {
    NotificationsContainer,
  },
  computed: {
    isEnvLoading() {
      return this.$store.state.globalState.isEnvLoading
    },
  },
}
</script>
