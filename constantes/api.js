/*
  Sessions URL
 */
export const USER_SESSION_URL = `/api/user/sessions`
export const CURRENT_USER_SESSION_URL = `${USER_SESSION_URL}/current`
export const CURRENT_STEP_ACTION_URL = `${CURRENT_USER_SESSION_URL}/steps/current/action`
export const START_SESSION_URL = (sessionId) =>
  `${USER_SESSION_URL}/${sessionId}/start`
