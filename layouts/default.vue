<template>
  <div :class="isDarkThemeInBrowser && 'dark'">
    <Nuxt />
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
    isDarkThemeInBrowser() {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      return false
    },
  },
}
</script>
