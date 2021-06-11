import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

export default (_, inject) => {
  const echo = new Echo({
    broadcaster: 'pusher',
    key: 'local', // .env
    wsHost: 'localhost',
    wsPort: 6001,
    authEndpoint: 'http://localhost:80/broadcasting/auth',
    forceTLS: false,
    disableStats: true,
  })
  inject('echo', echo)
}
