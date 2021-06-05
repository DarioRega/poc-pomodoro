<template>
  <section class="fixed top-[5rem] right-[3rem] flex flex-col z-40">
    <notification
      v-for="notification in currentNotifications"
      :key="notification.id"
      :notification-id="notification.notificationId"
      :type="notification.type"
      :title="notification.title"
      :description="notification.description"
      :action-required="notification.actionRequired"
      :should-show="true"
      class="mb-6"
      @onConfirm="handleConfirm(notification)"
      @onClose="handleClose(notification)"
    />
  </section>
</template>

<script>
import Notification from '@/components/Atoms/Notification/Notification'

export default {
  name: 'NotificationsContainer',
  components: { Notification },
  computed: {
    currentNotifications() {
      return this.$store.state.globalState.currentNotifications
    },
  },
  methods: {
    handleConfirm(notification) {
      if (typeof notification.confirmCallback === 'function') {
        notification.confirmCallback()
      }
    },
    handleClose(notification) {
      if (typeof notification.closeCallback === 'function') {
        notification.closeCallback()
      }
    },
  },
}
</script>
