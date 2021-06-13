export const onCreateTaskEvent = (payload, store) => {
  if (payload) {
    store.commit('tasks/ADD_SINGLE_TASK', payload)
  }
}

export const onUpdateTaskEvent = (payload, store) => {
  if (payload) {
    store.dispatch('tasks/updateSingleTask', payload)
  }
}

export const onDeleteTaskEvent = (payload, store) => {
  if (payload) {
    store.dispatch('tasks/deleteSingleTask', payload)
  }
}
