export default {
  async login({ dispatch, rootState }, payload) {
    const { data } = await this.$auth.loginWith('laravelSanctum', {
      data: payload,
    })
    dispatch('getEnvironnement')
  },
  async logout({ dispatch, rootState }) {
    await this.$auth.logout()
  },

  getEnvironnement({ dispatch, commit }) {
    commit('globalState/SET_ENV_LOADING', true, { root: true })
    // TODO uncomment when endpoint done
    // await dispatch('sessions/getAndSetCurrentSession', null, { root: true })
    commit('globalState/SET_ENV_LOADING', false, { root: true })
  },

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
