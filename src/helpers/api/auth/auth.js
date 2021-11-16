import Base from "../index";
import { APPLICATION_SERVER } from "../../../constants.ts";

const { stringify } = JSON;

class This extends Base {
  constructor() {
    super();
  }

  async signUp(email) {
    const result = await fetch(`${APPLICATION_SERVER}/api/v1/auth/signup`, {
      method: "POST",
      body: stringify({
        email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const body = await result.json();
    return {
      status: result.status,
      ...body,
    };
  }

  async signIn(email) {
    const result = await fetch(`${APPLICATION_SERVER}/api/v1/auth/login/code`, {
      method: "POST",
      body: stringify({
        email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const body = await result.json();
    return {
      status: result.status,
      ...body,
    };
  }

  async verify() {
    const { token } = this;
    if (!token) {
      return {
        status: 403,
      };
    }

    const result = await fetch(`${APPLICATION_SERVER}/api/v1/auth/verify`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    const body = await result.json();
    return {
      status: result.status,
      ...body,
    };
  }

  async setCode(email, code) {
    const result = await fetch(`${APPLICATION_SERVER}/api/v1/auth/login`, {
      method: "POST",
      body: stringify({
        email,
        code,
      }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "same-origin",
    });
    const body = await result.json();
    return {
      status: result.status,
      ...body,
    };
  }
  async loginAdmin(password, token) {
    const result = await fetch(
      `${APPLICATION_SERVER}/api/v1/auth/admin/login`,
      {
        method: "POST",
        body: stringify({
          password,
          token,
        }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        credentials: "same-origin",
      }
    );
    const body = await result.json();
    return {
      status: result.status,
      ...body,
    };
  }
  async verifyAdmin(adminToken) {
    const { token } = this;
    if (!token) {
      return {
        status: 403,
      };
    }

    const result = await fetch(
      `${APPLICATION_SERVER}/api/v1/auth/admin/verify?adminToken=${adminToken}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const body = await result.json();
    return {
      status: result.status,
      ...body,
    };
  }
}

export default This;
