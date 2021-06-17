export default {
  getSpecificNotification: (state) => (notificationId) => {
    return state.currentNotifications.find(
      (x) => x.notificationId === notificationId
    )
  },
}
