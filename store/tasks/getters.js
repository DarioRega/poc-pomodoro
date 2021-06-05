export default {
  getTaskById: (state) => (taskId) => {
    const task = state.allProjectsTasks.filter((x) => x.id === taskId)[0]
    return task || {}
  },
}
