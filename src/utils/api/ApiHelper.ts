/* eslint-disable no-async-promise-executor */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
import RequestOptions from './RequestOptions'
import FormData from './form-data/FormData'

export default class ApiHelper {
  public static async fetchPostJson(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<any> {
    let optionsWrapper = requestOptions
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions()
    }

    optionsWrapper
      .setMethod('POST')
      .setCredentials('include')
      .addHeader('Content-Type', 'application/json')
      .addHeader('Access-Control-Allow-Methods', 'GET,POST')
      .addHeader('Accept', 'application/json')

    return fetch(url, optionsWrapper.toRequestInit()).then(
      (response: Response): Promise<any> => response.json()
    )
  }

  public static async fetchPostRaw(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<string> {
    let optionsWrapper = requestOptions
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions()
    }

    optionsWrapper
      .setMethod('POST')
      .addHeader('Content-Type', 'application/json')
      .addHeader('Access-Control-Allow-Methods', 'POST')
      .addHeader('Accept', 'application/json')

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error('Options wrapper is undefined')

      while (true) {
        try {
          const validResponse = await fetch(url, optionsWrapper.toRequestInit())
            .then(async (response: Response) => {
              if (response.status !== 200) throw Error(await response.text())
              return response
            })
            .then((response: Response): Promise<string> => response.text())
          resolve(validResponse)
          return
        } catch (e) {
          if (e.message.includes('Failed to fetch')) {
            console.log('failed to fetch. trying again')
          } else {
            reject(e)
            return
          }
        }
      }
    })
  }

  public static async fetchPatchRaw(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<string> {
    let optionsWrapper = requestOptions
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions()
    }

    optionsWrapper
      .setMethod('PATCH')
      .addHeader('Content-Type', 'application/json')
      .addHeader('Access-Control-Allow-Methods', 'PATCH')
      .addHeader('Accept', 'application/json')

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error('Options wrapper is undefined')

      while (true) {
        try {
          const validResponse = await fetch(url, optionsWrapper.toRequestInit())
            .then(async (response: Response) => {
              if (response.status !== 200) throw Error(await response.text())
              return response
            })
            .then((response: Response): Promise<string> => response.text())
          resolve(validResponse)
          return
        } catch (e) {
          if (e.message.includes('Failed to fetch')) {
            console.log('failed to fetch. trying again')
          } else {
            reject(e)
            return
          }
        }
      }
    })
  }

  public static async fetchGetJson<T>(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<T> {
    let optionsWrapper = requestOptions
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions()
    }

    optionsWrapper
      .addHeader('Content-Type', 'application/json')
      .addHeader('Access-Control-Allow-Methods', 'GET')
      .addHeader('Accept', 'application/json')

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error('Options wrapper is undefined')

      while (true) {
        try {
          const validResponse = await fetch(
            url,
            optionsWrapper.toRequestInit()
          ).then(async (response: Response): Promise<T> => {
            if (response.status !== 200) {
              throw Error(await response.text())
            }
            return response.json()
          })
          resolve(validResponse)
          return
        } catch (e) {
          if (e.message.includes('Failed to fetch')) {
            console.log('failed to fetch. trying again')
          } else {
            reject(e)
            return
          }
        }
      }
    })
  }

  public static async fetchGetRaw(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<string> {
    let optionsWrapper = requestOptions
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions()
    }

    optionsWrapper
      .setMethod('GET')
      .addHeader('Content-Type', 'application/json')
      .addHeader('Access-Control-Allow-Methods', 'GET')
      .addHeader('Accept', 'application/json')

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error('Options wrapper is undefined')

      while (true) {
        try {
          const validResponse = await fetch(url, optionsWrapper.toRequestInit())
            .then(async (response: Response) => {
              if (response.status !== 200) throw Error(await response.text())
              return response
            })
            .then((response: Response): Promise<string> => response.text())
          resolve(validResponse)
          return
        } catch (e) {
          if (e.message.includes('Failed to fetch')) {
            console.log('failed to fetch. trying again')
          } else {
            reject(e)
            return
          }
        }
      }
    })
  }

  public static async fetchPutRaw<T>(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<T> {
    let optionsWrapper = requestOptions
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions()
    }

    optionsWrapper
      .setMethod('PUT')
      .addHeader('Content-Type', 'application/json')
      .addHeader('Access-Control-Allow-Methods', 'PUT')
      .addHeader('Accept', 'application/json')

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error('Options wrapper is undefined')

      while (true) {
        try {
          const validResponse = await fetch(
            url,
            optionsWrapper.toRequestInit()
          ).then(async (response: Response): Promise<T> => {
            if (response.status !== 200) throw Error(await response.text())
            return response.json()
          })
          resolve(validResponse)
          return
        } catch (e) {
          if (e.message.includes('Failed to fetch')) {
            console.log('failed to fetch. trying again')
          } else {
            reject(e)
            return
          }
        }
      }
    })
  }

  public static async fetchPutJson<T>(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<T> {
    let optionsWrapper = requestOptions
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions()
    }

    optionsWrapper
      .setMethod('PUT')
      .addHeader('Content-Type', 'application/json')
      .addHeader('Access-Control-Allow-Methods', 'PUT')
      .addHeader('Accept', 'application/json')

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error('Options wrapper is undefined')

      while (true) {
        try {
          const validResponse = await fetch(
            url,
            optionsWrapper.toRequestInit()
          ).then(async (response: Response): Promise<T> => {
            if (response.status !== 200) throw Error(await response.text())
            return response.json()
          })
          resolve(validResponse)
          return
        } catch (e) {
          if (e.message.includes('Failed to fetch')) {
            console.log('failed to fetch. trying again')
          } else {
            reject(e)
            return
          }
        }
      }
    })
  }

  public static async fetchDeleteJson<T>(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<T> {
    let optionsWrapper = requestOptions
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions()
    }

    optionsWrapper
      .setMethod('DELETE')
      .addHeader('Content-Type', 'application/json')
      .addHeader('Access-Control-Allow-Methods', 'DELETE')
      .addHeader('Accept', 'application/json')

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error('Options wrapper is undefined')

      while (true) {
        try {
          const validResponse = await fetch(
            url,
            optionsWrapper.toRequestInit()
          ).then(async (response: Response): Promise<T> => {
            if (response.status !== 200) throw Error(await response.text())
            return response.json()
          })
          resolve(validResponse)
          return
        } catch (e) {
          if (e.message.includes('Failed to fetch')) {
            console.log('failed to fetch. trying again')
          } else {
            reject(e)
            return
          }
        }
      }
    })
  }

  public static async fetchDeleteRaw(
    url: string,
    requestOptions?: RequestOptions
  ): Promise<string> {
    let optionsWrapper = requestOptions
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions()
    }

    optionsWrapper
      .setMethod('DELETE')
      .addHeader('Content-Type', 'application/json')
      .addHeader('Access-Control-Allow-Methods', 'DELETE')
      .addHeader('Accept', 'application/json')

    return new Promise(async (resolve, reject) => {
      if (!optionsWrapper) throw new Error('Options wrapper is undefined')

      while (true) {
        try {
          const validResponse = await fetch(url, optionsWrapper.toRequestInit())
            .then(async (response: Response) => {
              if (response.status !== 200) throw Error(await response.text())
              return response
            })
            .then((response: Response): Promise<string> => response.text())
          resolve(validResponse)
          return
        } catch (e) {
          if (e.message.includes('Failed to fetch')) {
            console.log('failed to fetch. trying again')
          } else {
            reject(e)
            return
          }
        }
      }
    })
  }

  public static async fetchFormDataPostRaw(
    url: string,
    requestFormData: any,
    requestOptions?: RequestOptions
  ): Promise<string> {
    let optionsWrapper = requestOptions
    if (!optionsWrapper) {
      optionsWrapper = new RequestOptions()
    }

    const optionFormData = new FormData()
    requestFormData.map((formData: FormData) => {
      return optionFormData.append(formData.name, formData.value as string)
    })

    optionsWrapper
      .setMethod('POST')
      .addHeader('Content-Type', 'application/json')
      .addHeader('Access-Control-Allow-Methods', 'POST')
      .addHeader('Accept', 'application/json')

    return fetch(`${url}`, {
      method: 'POST',
      body: optionFormData,
    }).then((response: Response): Promise<any> => response.json())
  }
}
