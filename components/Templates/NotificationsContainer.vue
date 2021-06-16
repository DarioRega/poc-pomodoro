<template>
  <section
    v-show="currentNotifications.length > 0"
    class="fixed top-[5rem] right-[3rem] flex flex-col z-40 max-w-[20rem]"
  >
    <notification
      v-for="(notification, index) in currentNotifications"
      :key="notification.notificationId"
      class="min-w-[20rem]"
      :notification-id="notification.notificationId"
      :type="notification.type"
      :title="notification.title"
      :description="notification.description"
      :action-required="notification.actionRequired"
      :action-text="notification.actionText"
      :self-close-dispatch="notification.selfCloseDispatch"
      :should-show="true"
      :class="index < currentNotifications.length - 1 && ' mb-6'"
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
