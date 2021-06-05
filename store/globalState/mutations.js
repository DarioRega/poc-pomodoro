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
}
