export const onCreateTaskEvent = (payload, store, i18n) => {
  if (payload) {
    const notification = {
      title: i18n.t('Task created!'),
      type: 'success',
      description: i18n.t('A new task was added to your list'),
    }
    store.dispatch('globalState/createNotification', notification)

    store.commit('tasks/ADD_SINGLE_TASK', payload)
  }
}

export const onUpdateTaskEvent = (payload, store, i18n) => {
  if (payload) {
    const notification = {
      title: i18n.t('Task edited!'),
      type: 'success',
      description: i18n.t('Your task was successfully edited'),
    }
    store.dispatch('globalState/createNotification', notification)
    store.dispatch('tasks/updateSingleTask', payload)
  }
}

export const onDeleteTaskEvent = (payload, store, i18n) => {
  if (payload) {
    // const notification = {
    //   title: i18n.t('Task edited!'),
    //   type: 'success',
    //   description: i18n.t('Your task was successfully edited'),
    // }
    // store.dispatch('globalState/createNotification', notification)
    store.dispatch('tasks/deleteSingleTask', payload)
  }
}
