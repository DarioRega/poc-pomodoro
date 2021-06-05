import { generateNotificationCallback } from '@/helpers'

export default {
  createNotification({ dispatch, getters, commit, rootState }, payload) {
    const notificationKey = Math.floor(Math.random() * 9999)
    const closeCallback = payload.closeCallback
      ? generateNotificationCallback(payload.closeCallback, () =>
          dispatch('removeNotification', notificationKey)
        )
      : null
    const confirmCallback = payload.confirmCallback
      ? generateNotificationCallback(payload.confirmCallback, () =>
          dispatch('removeNotification', notificationKey)
        )
      : null

    const notification = {
      ...payload,
      notificationId: notificationKey,
      actionRequired: payload.actionRequired ? payload.actionRequired : false,
      closeCallback,
      confirmCallback,
    }

    commit('CREATE_NOTIFICATION', notification)
  },
  removeNotification({ commit }, payload) {
    commit('REMOVE_NOTIFICATION', payload)
  },
}
