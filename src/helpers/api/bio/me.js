import { APPLICATION_SERVER } from '../../../constants'
import StorageHelper from '../../../utils/StorageHelper'
import Storage from '../../../helpers/storage'

import Base from '../index'
const { stringify } = JSON

class This extends Base {
  constructor() {
    super()
  }

  async getMe(reduxToken) {
    const result = await fetch(`${APPLICATION_SERVER}/api/v1/users/bio/me`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${
          reduxToken || StorageHelper?.getUserData()?.token
        }`,
      },
    })
    const body = await result.json()

    return {
      status: result.status,
      ...body,
    }
  }

  async getAvatar(avatar) {
    const { url, token } = this
    const result = await fetch(`${url}/files/${avatar}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    const image = await result.blob()
    const localUrl = URL.createObjectURL(image)
    return localUrl
  }

  async changeAvatar(formData) {
    const { url, token } = this
    const result = await fetch(`${url}/api/v1/users/bio/avatar`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }

  async changePhone(phone) {
    const { url, token } = this
    const result = await fetch(`${url}/api/v1/users/bio/phone_number`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: stringify({
        phone,
      }),
    })
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }

  async changeFirstName(firstName) {
    const { url, token } = this
    const result = await fetch(`${url}/api/v1/users/bio/first_name`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: stringify({
        firstName,
      }),
    })
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }

  async changeLastName(lastName) {
    const { url, token } = this
    const result = await fetch(`${url}/api/v1/users/bio/last_name`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: stringify({
        lastName,
      }),
    })
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }

  async changeUsername(username) {
    const { url, token } = this
    const result = await fetch(`${url}/api/v1/users/bio/username`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: stringify({
        username,
      }),
    })
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }

  async changeAbout(about) {
    const { url, token } = this
    const result = await fetch(`${url}/api/v1/users/bio/about`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: stringify({
        about,
      }),
    })
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }
  async updateFullBio({ firstName, lastName, phone, username, about }) {
    const { url, token } = this
    const result = await fetch(`${url}/api/v1/users/bio/full`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: stringify({ firstName, lastName, phone, username, about }),
    })
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }

  async checkIsUserAdmin() {
    const { url } = this
    let isAdmin = false
    const result = await fetch(
      `${url}/api/v1/auth/admin/verify?adminToken=${Storage.get('adminToken')}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${StorageHelper.getUserData()?.token}`,
        },
      }
    )

    const body = await result.json()

    if (body && body.message === 'Success') {
      isAdmin = true
    }

    return isAdmin
  }
}

export default This
