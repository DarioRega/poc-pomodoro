export const onCreateTaskEvent = (payload, store, i18n) => {
  if (payload) {
    const notification = {
      title: i18n.t('Task created!'),
      type: 'success',
      description: i18n.t('A new task was added to your list'),
    }
    store.dispatch('globalState/createNotification', notification)
    if (
      store.getters['tasks/isTaskIncludedInCurrentProjectSelected'](payload)
    ) {
      store.commit('tasks/PUSH_TASK_IN_CURRENT_PROJECT_SELECTED', payload)
    }
    store.commit('tasks/ADD_SINGLE_TASK', payload)
  }
}
