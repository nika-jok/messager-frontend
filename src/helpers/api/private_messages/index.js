import Base from '../index'
import { APPLICATION_SERVER } from '../../../constants'
import StorageHelper from '../../../utils/StorageHelper'

const { stringify } = JSON

class This extends Base {
  constructor() {
    super()

    const userData = StorageHelper.getUserData()

    this.token = userData?.token
  }

  async getInitialMessages(id, page = 1, countItems = 15) {
    const result = await fetch(
      `${APPLICATION_SERVER}/api/v1/messages/private/users/${id}?perPage=${countItems}&currentPage=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${this.token}`,
        },
      }
    )
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }

  async getMessages(id, messageId) {
    const url2 = `${APPLICATION_SERVER}/api/v1/messages/private/users/${id}/${messageId}`
    const result = await fetch(url2, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${this.token}`,
      },
    })
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }

  async deleteMessage(id) {
    const result = await fetch(
      `${APPLICATION_SERVER}/api/v1/messages/private/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${this.token}`,
        },
      }
    )
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }

  async removeContact(id) {
    const result = await fetch(`${APPLICATION_SERVER}/api/v1/contacts`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${this.token}`,
      },
      body: stringify({
        id,
      }),
    })
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }
  async getAvatar(avatar) {
    const result = await fetch(`${APPLICATION_SERVER}/files/${avatar}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${this.token}`,
      },
    })
    const image = await result.blob()
    const localUrl = URL.createObjectURL(image)
    return localUrl
  }
  async create(type = 'text', receiverId, text, file) {
    const formData = new FormData()

    formData.append('type', type)
    formData.append('receiverId', receiverId)
    formData.append('text', text)
    if (file) formData.append('file', file)

    const response = await fetch(
      `${APPLICATION_SERVER}/api/v1/messages/private/users`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Token ${this.token}`,
        },
      }
    )
    const result = await response.json()
    return result
  }
  async getChats(page, perPage) {
    const result = await fetch(
      `${APPLICATION_SERVER}/api/v1/messages/private/chats?currentPage=${page}&perPage=${perPage}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${this.token}`,
        },
      }
    )
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }

  async readMessage(id) {
    const result = await fetch(
      `${APPLICATION_SERVER}/api/v1/messages/private/read/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${this.token}`,
        },
      }
    )
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }
}

export default This
