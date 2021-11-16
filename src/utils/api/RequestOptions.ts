export default class RequestOptions {
  private headers: [string, string][];
  private method: string | undefined;
  private credentials: "include" | undefined;
  private body: string | undefined;

  public constructor() {
    this.headers = [];
  }

  public setMethod(method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH"): RequestOptions {
    this.method = method;
    return this;
  }

  public setCredentials(credentials: "include"): RequestOptions {
    this.credentials = credentials;
    return this;
  }

  public setBody(body: string): RequestOptions {
    this.body = body;
    return this;
  }

  public addHeader(headerName: string, headerValue: string): RequestOptions {
    this.headers.push([headerName, headerValue]);
    return this;
  }

  public toRequestInit(): RequestInit {
    // Example:
    //
    // ['Autorization', 'Key']
    // ['Another-Header', 'Another-Value']
    const headersMatrix: string[][] = [];
    this.headers.forEach(([headerName, headerValue]) => {
      const headerArray: string[] = [];
      headerArray.push(headerName);
      headerArray.push(headerValue);
      headersMatrix.push(headerArray);
    });

    const requestJsonOptions: RequestInit = {
      headers: headersMatrix,
    };

    if (this.method) {
      requestJsonOptions.method = this.method;
    }

    if (this.credentials) {
      requestJsonOptions.credentials = this.credentials;
    }

    if (this.body) {
      requestJsonOptions.body = this.body;
    }

    return requestJsonOptions;
  }
}
