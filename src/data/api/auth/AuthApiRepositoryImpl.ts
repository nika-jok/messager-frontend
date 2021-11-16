import { APPLICATION_SERVER } from '../../../constants'
import AccountData from '../../../domain/models/auth/AccountData'
import ApiHelper from '../../../utils/api/ApiHelper'
import RequestOptions from '../../../utils/api/RequestOptions'
import AuthRepository from '../../models/auth/AuthApiRepository'
import AuthListener from '../../models/AuthListener'
import SendAuthCodeResponse from '../../models/auth/SendAuthCodeResponse'
import AuthorizedUserData from '../../models/auth/AuthorizedUserData'
import UserData from '../../../domain/models/auth/UserData'
import UpdateUser from '../../../domain/models/user/UpdateUser'
import SignUpData from '../../../domain/models/auth/SignUpData'

export default class AuthRepositoryImpl implements AuthRepository {
  private authListeners: AuthListener[]

  private USER_KEY = 'user_data'

  public constructor() {
    this.authListeners = []
  }

  public getUserInfo = (): Promise<UserData> => {
    const requestOptions: RequestOptions = new RequestOptions()

    requestOptions.addHeader('Authorization', `Token ${this.getAccessToken()}`)

    return ApiHelper.fetchGetJson(
      `${APPLICATION_SERVER}/api/v1/users/bio/me`,
      requestOptions
    )
  }

  public updateUser = (userData: UpdateUser): Promise<string> => {
    const requestOptions: RequestOptions = new RequestOptions()
    requestOptions.setBody(
      JSON.stringify({
        ...userData,
      })
    )

    requestOptions.addHeader('Authorization', `Token ${this.getAccessToken()}`)

    return ApiHelper.fetchPutRaw(
      `${APPLICATION_SERVER}/api/v1/users/bio/full`,
      requestOptions
    )
  }

  public updateUserAvatar = (avatar: File): Promise<string> => {
    const formData = new FormData()
    formData.append('avatar', avatar)

    return fetch(`${APPLICATION_SERVER}/api/v1/users/bio/avatar`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Token ${this.getAccessToken()}`,
      },
    }).then((response: Response): string => response.toString())
  }

  public signIn = async (email: string): Promise<SendAuthCodeResponse> => {
    const requestOptions: RequestOptions = new RequestOptions()

    requestOptions.setBody(
      JSON.stringify({
        email,
      })
    )

    return ApiHelper.fetchPostJson(
      `${APPLICATION_SERVER}/api/v1/auth/login/code`,
      requestOptions
    )
  }

  public signUp = (signUpData: SignUpData): Promise<SendAuthCodeResponse> => {
    const requestOptions: RequestOptions = new RequestOptions()

    requestOptions.setBody(
      JSON.stringify({
        ...signUpData,
      })
    )

    return ApiHelper.fetchPostJson(
      `${APPLICATION_SERVER}/api/v1/auth/signup`,
      requestOptions
    )
  }

  public confirmCode = async (
    code: string,
    email: string
  ): Promise<AuthorizedUserData> => {
    const requestOptions: RequestOptions = new RequestOptions()

    requestOptions.setBody(
      JSON.stringify({
        code: String(code),
        email,
      })
    )

    return ApiHelper.fetchPostJson(
      `${APPLICATION_SERVER}/api/v1/auth/login`,
      requestOptions
    ).then((userData: any) => {
      if (userData && userData) {
        this.saveUser(userData.data)

        localStorage.setItem('socket_token', userData.data.token)
        this.notifyAuthListenersAboutChanges()
      }

      return userData
    })
  }

  public isAuthorized = (): boolean => {
    return !!localStorage.getItem(this.USER_KEY)
  }

  public getAccessToken = (): string => {
    if (!this.isAuthorized()) {
      throw new Error('User is not authorized')
    }

    return (
      JSON.parse(
        localStorage.getItem(this.USER_KEY) || ''
      ) as AuthorizedUserData
    ).token
  }

  public createAccount = async (accountData: AccountData): Promise<string> => {
    const requestOptions: RequestOptions = new RequestOptions()

    requestOptions.setBody(
      JSON.stringify({
        ...accountData,
      })
    )

    return ApiHelper.fetchPostJson(
      `${APPLICATION_SERVER}/api/v1/auth/login`,
      requestOptions
    )
  }

  public signOut = (): void => {
    localStorage.removeItem(this.USER_KEY)
    this.notifyAuthListenersAboutChanges()
  }

  public addAuthListener(authListener: AuthListener): void {
    this.authListeners.push(authListener)
  }

  public removeAuthListener(authListener: AuthListener): void {
    this.authListeners.splice(this.authListeners.indexOf(authListener), 1)
  }

  private saveUser = (user: AuthorizedUserData): void => {
    if (Object.keys(user)?.length) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    }
  }

  private notifyAuthListenersAboutChanges = (): void => {
    this.authListeners.forEach((listener) => {
      listener.onAuthStatusChanged()
    })
  }
}
