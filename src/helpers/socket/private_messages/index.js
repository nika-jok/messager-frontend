import Base from '../index.ts'

class This extends Base {
  constructor() {
    super()
  }

  create(message) {
    return this.socket.emit('private_message', JSON.stringify(message))
  }

  getMessage() {
    return new Promise((res) => {
      this.socket.on('private_message', (data) => res(data))
    })
  }
}

export default This
