//@ts-nocheck

import io from 'socket.io-client'
import { APPLICATION_SOCKETS } from '../../constants.ts'

class Base {
  constructor(store) {
    this.store = store

    this.token = localStorage.getItem('socket_token') || ''

    this.socket = io(`${APPLICATION_SOCKETS}/api/v1/`, {
      transports: ['false', 'websocket'],
      query: {
        token: this.token,
      },
    })

    this.socket.on('connect', (data) => {
      console.log('socket connected')
    })

    this.socket.on('error', (data) => {
      console.log('socket error')
    })

    this.socket.on('disconnect', () => {
      console.log('socket disconnected')
    })
  }
  getSocket() {
    return this.socket
  }

  create(message) {
    return this.socket.emit('private_message', message)
  }

  getMessage() {
    return new Promise((res) => {})
  }
}

export default new Base()
