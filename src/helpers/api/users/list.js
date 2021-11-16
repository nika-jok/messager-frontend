import Base from '../index';

const { stringify } = JSON;

class This extends Base {
  constructor() {
    super();
  }

  async getContactsByUsername(username) {
    const { url, token } = this;
    const result = await fetch(`${url}/api/v1/contacts/find/username/${username}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    const body = await result.json();
    return {
      status: result.status,
      ...body,
    };
  }

  async getContactsByEmail(email) {
    const { url, token } = this;
    const result = await fetch(`${url}/api/v1/contacts/find/email/${email}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    const body = await result.json();
    return {
      status: result.status,
      ...body,
    };
  }

  async getUsersByUsername(username) {
    const { url, token } = this;
    const result = await fetch(`${url}/api/v1/users/find/username/${username}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    const body = await result.json();
    return {
      status: result.status,
      ...body,
    };
  }

  async getUsersByEmail(email) {
    const { url, token } = this;
    const result = await fetch(`${url}/api/v1/users/find/email/${email}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`,
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
