/*
  Sessions URL
 */
export const USER_SESSION_URL = `/api/user/sessions`
export const CURRENT_USER_SESSION_URL = `${USER_SESSION_URL}/current`
export const ABORT_USER_CURRENT_SESSION_URL = `${CURRENT_USER_SESSION_URL}/abort`
export const CURRENT_STEP_ACTION_URL = `${CURRENT_USER_SESSION_URL}/steps/current/action`
export const START_SESSION_ID_URL = (sessionId) =>
  `${USER_SESSION_URL}/${sessionId}/start`

/*
  Broadcasts
 */
export const ECHO_BROADCAST_URL = `/api/broadcasting`
export const ECHO_AUTH_BROADCAST_URL = `${ECHO_BROADCAST_URL}/auth`
