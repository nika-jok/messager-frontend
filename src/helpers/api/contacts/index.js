import Base from '../index'
import StorageHelper from '../../../utils/StorageHelper'
import { APPLICATION_SERVER } from '../../../constants'

const { stringify } = JSON

class This extends Base {
  constructor() {
    super()

    this.token = StorageHelper?.getUserData()?.token
  }

  async getContacts(page, perPage) {
    const { url } = this
    const result = await fetch(
      `${url}/api/v1/contacts?perPage=${perPage}&currentPage=${page}`,
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

  async removeContact(id) {
    const { url } = this
    const result = await fetch(`${url}/api/v1/contacts`, {
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
    const { url } = this
    const result = await fetch(`${url}/files/${avatar}`, {
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

  async getContactsByUsername(username = ' ') {
    const { url } = this
    const result = await fetch(
      `${url}/api/v1/contacts/find/username/${username}`,
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

  async getContactsByDisplayedName(displayedName) {
    const result = await fetch(
      `${APPLICATION_SERVER}/api/v1/contacts/find/displayedName?displayedName=${displayedName.trim()}`,
      {
        method: 'GET',
        headers: {
          ContentType: 'application/json',
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
  async getGlobalUsersName(name) {
    const { url } = this
    const result = await fetch(`${url}/api/v1/users/find/name/${name}`, {
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
  async getGlobalUsersUsername(name) {
    const { url } = this
    const result = await fetch(`${url}/api/v1/users/find/username/${name}`, {
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
}

export default This
