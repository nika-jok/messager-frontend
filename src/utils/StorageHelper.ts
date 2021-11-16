class StorageHelper {
  static getUserData = (): any => {
    //@ts-ignore
    const user_data = JSON.parse(localStorage.getItem('user_data' || ''))

    return user_data ? user_data : undefined
  }

  static removeUserData = (): void => {
    localStorage.removeItem('user_data')
    localStorage.removeItem('adminToken')
  }

  static getAdminToken = (): any => {
    const user_data = localStorage?.getItem('adminToken' || '')

    return user_data ? user_data : undefined
  }
}

export default StorageHelper
