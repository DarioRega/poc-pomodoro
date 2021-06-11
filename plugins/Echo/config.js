import Echo from 'laravel-echo'
import { ECHO_BROADCAST_URL } from '@/constantes/api'
window.Pusher = require('pusher-js')

export default ({ $axios }) => {
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'd12580436f5dcceca407',
    cluster: 'eu',
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          $axios
            .post(`${ECHO_BROADCAST_URL}`, {
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
