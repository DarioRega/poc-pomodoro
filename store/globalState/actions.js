export default {
  createNotification({ dispatch, getters, commit, rootState }, payload) {
    const notificationKey = Math.floor(Math.random() * 9999)
    const confirmCallback =
      typeof payload.confirmCallback === 'function'
        ? payload.confirmCallback
        : null
    const closeCallback = payload.closeCallback ? payload.closeCallback : null
    const selfCloseDispatch = () =>
      dispatch('removeNotification', notificationKey)

    const notification = {
      ...payload,
      type: payload.type ? payload.type : 'info',
      notificationId: notificationKey,
      actionRequired: payload.actionRequired ? payload.actionRequired : false,
      closeCallback,
      confirmCallback,
      selfCloseDispatch,
    }

    commit('CREATE_NOTIFICATION', notification)
  },
  removeNotification({ commit }, payload) {
    commit('REMOVE_NOTIFICATION', payload)
  },
}
