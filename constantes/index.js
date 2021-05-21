// TODO IMPORT THIS FILE IN PROJECT TO KEEP RIGHT DATA / ACTIONS
export const TASK_STATUS = {
  COMPLETED: 'COMPLETED',
  IN_PROGRESS: 'IN_PROGRESS',
  TODO: 'TODO',
  ARCHIVED: 'ARCHIVED',
}

const statusTypes = (action) => ({
  pending: `${action}_PENDING`,
  started: `${action}_STARTED`,
  paused: `${action}_PAUSED`,
  done: `${action}_DONE`,
})

export const POMODORO_STATUS = {
  SESSION: statusTypes(`SESSION`),
  POMODORO: statusTypes(`POMODORO`),
  SMALL_BREAK: statusTypes(`SMALL_BREAK`),
  BIG_BREAK: statusTypes(`BIG_BREAK`),
}
