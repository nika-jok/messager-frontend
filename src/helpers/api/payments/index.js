import Base from '../index';

const { stringify } = JSON;

class This extends Base {
  constructor() {
    super();
  }

  async createWithdrawal() {
    const { url, token } = this;
    const result = await fetch(`${url}/api/v1/analytics`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });
    const body = await result.json();
    return {
      status: result.status,
      ...body,
    };
  }
}

export default This;
