// TODO IMPORT THIS FILE IN PROJECT TO KEEP RIGHT DATA / ACTIONS
export const TASK_STATUS_VALUES = {
  DONE: 'DONE',
  IN_PROGRESS: 'ONGOING',
  TODO: 'TODO',
  ARCHIVED: 'ARCHIVED',
}

export const FAKER_TASK_STATUS_NAMES = {
  DONE: 'DONE',
  IN_PROGRESS: 'ONGOING',
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

export const SPACEBAR_KEY_CODE = [0, 32]
export const ENTER_KEY_CODE = 13
export const DOWN_ARROW_KEY_CODE = 40
export const UP_ARROW_KEY_CODE = 38
export const ESCAPE_KEY_CODE = 27
