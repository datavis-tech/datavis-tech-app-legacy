import io from 'socket.io-client'

export default () => io('http://localhost:3001/subscriptions', { transports: ['websocket'], forceNew: true })
