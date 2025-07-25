import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Pusher: typeof Pusher;
    echo?: Echo<any>;
  }
}

// Jangan langsung export Echo!
export function getEchoInstance(): Echo<any> | null {
  if (typeof window === 'undefined') return null;

  if (!window.Pusher) {
    window.Pusher = Pusher;
  }

  if (!window.echo) {
    window.echo = new Echo({
      broadcaster: 'pusher',
      key: 'aead0f732ba44f4f3717',
      cluster: 'mt1',
      forceTLS: true,
      withCredentials: true,
      authEndpoint: 'http://localhost:8000/broadcasting/auth',
    });
  }

  return window.echo;
}