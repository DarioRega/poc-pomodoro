import { onCurrentSessionEvent } from '@/EchoEventsHandlers/sessions'
import {
  onCreateTaskEvent,
  onUpdateTaskEvent,
} from '@/EchoEventsHandlers/tasks'

export default ({ store, i18n }, inject) => {
  const initUserPrivateChannel = (userId) => {
    const userChannel = `user.${userId}`
    window.Echo.private(`${userChannel}`)
      .listen(`.current.session`, (payload) =>
        onCurrentSessionEvent(payload, store, i18n)
      )
      .listen(`.task.create`, (payload) =>
        onCreateTaskEvent(payload, store, i18n)
      )
      .listen(`.task.update`, (payload) =>
        onUpdateTaskEvent(payload, store, i18n)
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
