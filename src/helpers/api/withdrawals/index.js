import Base from '../index'
import StorageHelper from '../../../utils/StorageHelper'
const { stringify } = JSON

class This extends Base {
  constructor() {
    super()

    this.token = StorageHelper.getUserData()?.token
  }

  async create(amount, cardNumber, comment) {
    const { url } = this

    const result = await fetch(`${url}/api/v1/withdraw`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${this.token}`,
      },
      body: stringify({
        amount,
        cardNumber,
        comment,
      }),
    })
    const body = await result.json()
    return {
      status: result.status,
      ...body,
    }
  }
  async get(page = 1, perPage = 15) {
    const { url } = this

    const result = await fetch(
      `${url}/api/v1/withdraw/list?currentPage=${page}&perPage=${perPage}`,
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
}

export default This
