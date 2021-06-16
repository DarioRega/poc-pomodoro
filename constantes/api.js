export const API_USER_URL = `/api/user`

/*
  Sessions URL
 */
export const USER_SESSION_URL = `${API_USER_URL}/sessions`
export const CURRENT_USER_SESSION_URL = `${USER_SESSION_URL}/current`
export const ABORT_USER_CURRENT_SESSION_URL = `${CURRENT_USER_SESSION_URL}/abort`
export const CURRENT_STEP_ACTION_URL = `${CURRENT_USER_SESSION_URL}/steps/current/action`
export const START_SESSION_ID_URL = (sessionId) =>
  `${USER_SESSION_URL}/${sessionId}/start`

/*
  Tasks
 */
export const TASK_STATUSES_URL = `api/tasks/status`
export const TASK_URL = `${API_USER_URL}/tasks`
export const TASK_DELETE_ID_URL = (taskId) => `${TASK_URL}/${taskId}`
export const TASK_UPDATE_ID_URL = (taskId) => `${TASK_URL}/${taskId}/update`

/*
  Broadcasts
 */
export const ECHO_BROADCAST_URL = `/api/broadcasting`
export const ECHO_AUTH_BROADCAST_URL = `${ECHO_BROADCAST_URL}/auth`

/*
  Settings
 */

export const USER_SETTINGS_URL = `${API_USER_URL}/settings`
