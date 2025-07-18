import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export const echo = new Echo({
  broadcaster: 'pusher',
  key: 'aead0f732ba44f4f3717',
  cluster: 'mt1',
  forceTLS: true,
})
