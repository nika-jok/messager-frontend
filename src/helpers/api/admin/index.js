import Base from '../index'
import { APPLICATION_SERVER } from '../../../constants'
import StorageHelper from '../../../utils/StorageHelper'

const { stringify } = JSON

class This extends Base {
  async analytics() {
    const result = await fetch(
      `${APPLICATION_SERVER}/api/v1/analytics?adminToken=${StorageHelper.getAdminToken()}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${StorageHelper.getUserData()?.token}`,
        },
      }
    )
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }
  async withdrawList(page, perPage) {
    const result = await fetch(
      `${APPLICATION_SERVER}/api/v1/withdraw/admin/list?adminToken=${StorageHelper.getAdminToken()}&perPage=${perPage}&currentPage=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${StorageHelper.getUserData()?.token}`,
        },
      }
    )
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }
  async withdrawStatusChange(id, status) {
    const result = await fetch(
      `${APPLICATION_SERVER}/api/v1/withdraw/admin/status?adminToken=${StorageHelper.getAdminToken()}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${StorageHelper.getUserData()?.token}`,
        },
        body: stringify({
          id,
          status,
        }),
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
