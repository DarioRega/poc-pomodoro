import Echo from 'laravel-echo'
import { ECHO_AUTH_BROADCAST_URL } from '@/constantes/api'
window.Pusher = require('pusher-js')

export default ({ $axios }) => {
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.PUSHER_KEY || 'e5c184dfc0351b8c7003',
    cluster: 'eu',
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          $axios
            .post(`${ECHO_AUTH_BROADCAST_URL}`, {
              socket_id: socketId,
              channel_name: channel.name,
            })
            .then((response) => {
              // eslint-disable-next-line node/no-callback-literal
              callback(false, response.data)
            })
            .catch((error) => {
              // eslint-disable-next-line node/no-callback-literal
              callback(true, error)
            })
        },
      }
    },
  })
}
