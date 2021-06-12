export const onCreateTaskEvent = (payload, store) => {
  if (payload) {
    const notification = {
      title: 'Task created!',
      type: 'success',
      description: 'A new task was added to your list',
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

export const onUpdateTaskEvent = (payload, store) => {
  if (payload) {
    const notification = {
      title: 'Task edited!',
      type: 'success',
      description: 'Your task was successfully edited',
    }
    store.dispatch('globalState/createNotification', notification)
    if (
      store.getters['tasks/isTaskIncludedInCurrentProjectSelected'](payload)
    ) {
      store.commit('tasks/UPDATE_TASK_IN_CURRENT_PROJECT_SELECTED', payload)
    }
    store.commit('tasks/UPDATE_SINGLE_TASK', payload)
  }
}
