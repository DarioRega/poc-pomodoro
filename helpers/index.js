export const generateNotificationCallback = (
  additionalCallback,
  selfCloseNotificationDispatch
) => {
  return () => {
    additionalCallback()
    selfCloseNotificationDispatch()
  }
}
