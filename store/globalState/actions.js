export default {
  async login({ dispatch, rootState }, payload) {
    await this.$auth.loginWith('laravelSanctum', {
      data: payload,
    })
    dispatch('getEnvironment')
  },
  async logout({ dispatch, rootState }) {
    await this.$auth.logout()
  },

  async getEnvironment({ dispatch, commit }) {
    commit('globalState/SET_ENV_LOADING', true, { root: true })
    await dispatch('sessions/getAndSetCurrentSession', null, {
      root: true,
    })
    // TODO GET TASKS, SETTINGS HER
    commit('globalState/SET_ENV_LOADING', false, { root: true })
  },

  handleGeneralApiError({ dispatch }, errMessage) {
    const notification = {
      title: this.$t('Something went wrong'),
      description: errMessage,
      type: 'error',
    }
    dispatch('createNotification', notification)
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
