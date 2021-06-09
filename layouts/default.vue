<template>
  <div>
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
}
</script>
