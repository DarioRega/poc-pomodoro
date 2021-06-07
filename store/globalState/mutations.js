export default {
  SET_CURRENT_MODAL_OPEN(state, modalRef) {
    state.currentModalOpen = modalRef
  },
  RESET_CURRENT_MODAL_OPEN(state) {
    state.currentModalOpen = ''
  },
  TOGGLE_STACKED_LAYOUT(state) {
    state.isLayoutStacked = !state.isLayoutStacked
  },
  CREATE_NOTIFICATION(state, payload) {
    state.currentNotifications.push(payload)
  },
  REMOVE_NOTIFICATION(state, payload) {
    state.currentNotifications = state.currentNotifications.filter(
      (x) => x.notificationId !== payload
    )
  },
}
