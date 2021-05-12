// TODO IMPORT THIS FILE IN PROJECT TO KEEP RIGHT DATA / ACTIONS
export const TASK_STATUS = {
  COMPLETED: 'COMPLETED',
  IN_PROGRESS: 'IN_PROGRESS',
  TODO: 'TODO',
  ARCHIVED: 'ACRHIVED',
}

const statusType = action => ({
  pending: `${action}_PENDING`,
  started: `${action}_STARTED`,
  paused: `${action}_PAUSED`,
  done: `${action}_DONE`,
})

export const POMODORO_STATUS = {
  SESSION: statusType(`SESSION`),
  POMODORO: statusType(`POMODORO`),
  SMALL_BREAK: statusType(`SMALL_BREAK`),
  BIG_BREAK: statusType(`BIG_BREAK`),
}
