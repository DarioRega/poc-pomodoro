// import { onCurrentSessionEvent } from '@/helpers/echo-events-callbacks/sessions'

export default ({ store }, inject) => {
  const initUserPrivateChannel = (userId) => {
    const userChannel = `user.${userId}`
    window.Echo.private(`${userChannel}`).listen(
      `.current.session`,
      (payload) => '' // onCurrentSessionEvent(payload, store)
    )
  }

  /*
    Dynamically execute the channel launch via the channelRefProperty
   */
  const initFunctions = {
    userPrivateChannel: initUserPrivateChannel,
  }

  const setup = (channelRef, userId) => {
    const initChannelFunction = initFunctions[channelRef]
    initChannelFunction(userId)
  }

  inject('initWebSocketChannel', (channelRef, userId = '') =>
    setup(channelRef, userId)
  )
}
