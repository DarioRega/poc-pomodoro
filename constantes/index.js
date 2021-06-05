export const SPACEBAR_KEY_CODE = [0, 32]
export const ENTER_KEY_CODE = 13
export const DOWN_ARROW_KEY_CODE = 40
export const UP_ARROW_KEY_CODE = 38
export const ESCAPE_KEY_CODE = 27

export const TASK_STATUS_VALUES = {
  DONE: 'DONE',
  IN_PROGRESS: 'ONGOING',
  TODO: 'TODO',
  ARCHIVED: 'ARCHIVED',
}

const statusTypes = (action) => ({
  PENDING: `${action}_PENDING`,
  STARTED: `${action}_STARTED`,
  PAUSED: `${action}_PAUSED`,
  DONE: `${action}_DONE`,
})

export const POMODORO_STATUS = {
  SESSION: statusTypes(`SESSION`),
  POMODORO: statusTypes(`POMODORO`),
  SMALL_BREAK: statusTypes(`SMALL_BREAK`),
  BIG_BREAK: statusTypes(`BIG_BREAK`),
}

export const STEPS_STATUS = {
  PENDING: 'PENDING',
  STARTED: 'STARTED',
  PAUSED: 'PAUSED',
  DONE: 'DONE',
}

export const SETTINGS_PANEL_STEPS_VALUES = {
  GENERAL: 'GENERAL',
  ACCOUNT: 'ACCOUNT',
  POMODORO_CONFIG: 'POMODORO_CONFIGURATION',
  SUBSCRIPTION: 'SUBSCRIPTION',
  ABOUT: 'ABOUT',
  HELP: 'HELP',
}

export const SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES = {
  OVERVIEW: 'OVERVIEW',
  ESTIMATE_OF_INVOICE: 'ESTIMATE_OF_INVOICE',
  INVOICE_INFORMATIONS: 'INVOICE_INFORMATIONS',
  BILLING_HISTORY: 'BILLING_HISTORY',
  CURRENT_SUBSCRIPTION: ' CURRENT_SUBSCRIPTION',
}

// TODO MOVE ON MOCK FOLDER
export const FAKER_TASK_STATUS_NAMES = {
  DONE: 'DONE',
  IN_PROGRESS: 'ONGOING',
  TODO: 'TODO',
  ARCHIVED: 'ARCHIVED',
}
