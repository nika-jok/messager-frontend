import Base from '../index'
import StorageHelper from '../../../utils/StorageHelper'
import { APPLICATION_SERVER } from '../../../constants'

class Notifications extends Base {
  constructor() {
    super()

    this.token = StorageHelper.getUserData()?.token
  }

  static async getNotifications(page, perPage) {
    const result = await fetch(
      `${APPLICATION_SERVER}/api/v1/subscription/notifications/${
        StorageHelper.getUserData()?.user_id
      }?currentPage=${page}&perPage=${perPage}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${this.token}`,
        },
      }
    )
    const body = await result.json()
    return body
  }
}

export default Notifications
