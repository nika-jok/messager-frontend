import Base from '../index'
import StorageHelper from '../../../utils/StorageHelper'
const { stringify } = JSON

class This extends Base {
  constructor() {
    super()

    this.token = StorageHelper.getUserData().token
  }

  async getUser(id) {
    const { url } = this
    const result = await fetch(`${url}/api/v1/users/bio/${id}`, {
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

  async getUserByEmail(email) {
    const { url } = this
    const result = await fetch(`${url}/api/v1/users/bio/email/${email}`, {
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

  async getContactByEmail(email) {
    const { url } = this
    const result = await fetch(
      `${url}/api/v1/contacts/find/email/full_compare/${email}`,
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

  async addContact(id, displayedFirstName, displayedLastName) {
    const { url } = this
    const result = await fetch(`${url}/api/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${this.token}`,
      },
      body: stringify({
        id,
        displayedFirstName,
        displayedLastName,
      }),
    })
    const body = await result.json()

    return {
      status: result.status,
      ...body,
    }
  }

  async getUserContacts() {
    const { url } = this
    const result = await fetch(`${url}/api/v1/contacts`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${this.token}`,
      },
    })

    return result.json()
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

  async updateDisplayedName(id, displayedFirstName, displayedLastName) {
    const { url } = this
    const result = await fetch(`${url}/api/v1/contacts/displayedName`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${this.token}`,
      },
      body: stringify({
        id,
        displayedFirstName,
        displayedLastName,
      }),
    })
    const body = await result.json()

    return {
      status: result.status,
      ...body,
    }
  }
  async getFiles(id, type) {
    const { url } = this
    const result = await fetch(
      `${url}/api/v1/messages/private/files/${id}/${type}`,
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

  async getAttachmentsCount(id) {
    const { url } = this
    const result = await fetch(
      `${url}/api/v1/messages/private/attachments/count/${id}`,
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

  async ban(id) {
    const { url } = this
    const result = await fetch(`${url}/api/v1/users/ban`, {
      method: 'PUT',
      body: stringify({
        id,
      }),
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

  async unban(id) {
    const { url } = this
    const result = await fetch(`${url}/api/v1/users/ban`, {
      method: 'DELETE',
      body: stringify({
        id,
      }),
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
