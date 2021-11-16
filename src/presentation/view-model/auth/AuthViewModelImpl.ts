import ViewModel from '../ViewModel'
import BaseViewModel from '../BaseViewModel'
import AuthRepository from '../../../data/models/auth/AuthApiRepository'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'
import AuthViewModel from './AuthViewModel'
import AccountData from '../../../domain/models/auth/AccountData'
import BaseView from '../../view/BaseView'
import SignUpData from '../../../domain/models/auth/SignUpData'
import Storage from '../../../helpers/storage'

export default class AuthViewModelImpl
  extends ViewModel
  implements AuthViewModel, BaseViewModel
{
  public email: string
  public isLoading: boolean
  public isCodeError: boolean
  private readonly authRepository: AuthRepository

  public constructor(authRepository: AuthRepository) {
    super()

    this.authRepository = authRepository
    this.email = ''
    this.isLoading = false
    this.isCodeError = false
  }

  public attachView = (baseView: BaseView): void => {
    this.setIsLoading(true)
    super.attachView(baseView)
    this.setIsLoading(false)
  }

  public onSignUp = async (
    signUpData: SignUpData,
    isMobile: boolean,
    setChosedModal: any,
    isUnauthorizedScreen: boolean
  ): Promise<void> => {
    this.setIsLoading(true)
    try {
      await this.authRepository.signUp(signUpData)
      if (isUnauthorizedScreen) {
        setChosedModal('enter-code')
      } else {
        BrowserHistoryHelper.moveTo('/auth/enter-code')
      }
    } catch (e) {
      alert(e.message)
    }
    this.setIsLoading(false)
  }

  public onSignIn = async (
    email: string,
    isMobile: boolean,
    setChosedModal: any,
    isUnauthorizedScreen: boolean
  ): Promise<void> => {
    try {
      this.setIsLoading(true)
      const result = await this.authRepository.signIn(email)
      if (result.message === 'Email does not exist') {
        if (!isUnauthorizedScreen) {
          BrowserHistoryHelper.moveTo('/auth/sign-up')
        } else {
          setChosedModal('register')
        }
      } else {
        if (!isUnauthorizedScreen) {
          BrowserHistoryHelper.moveTo('/auth/enter-code')
        } else {
          setChosedModal('enter-code')
        }
      }

      this.setIsLoading(false)
    } catch (e) {
      alert(e)
    }
  }

  public transmitEmail = (email: string): void => {
    this.setIsLoading(true)
    this.email = email
    super.notifyViewAboutChanges()
    this.setIsLoading(false)
  }

  public onConfirmEmail = async (
    code: number,
    email: string,
    setChosedModal: any,
    isMobile: boolean,
    isUnauthorizedScreen: any,
    setChannelName: any,
    setLastOpened: any
  ): Promise<void> => {
    this.setIsLoading(true)
    try {
      const channelName = Storage.get('channel_name')
      await this.authRepository.confirmCode(code, email)
      if (channelName) {
        if (!isUnauthorizedScreen && isMobile) {
          BrowserHistoryHelper.moveTo(`/${channelName}/choose-level`)
          Storage.clear('channel_name')
        } else {
          // setChannelName(channelName)
          // setChosedModal('channels')
          // console.log('запис')
          // setLastOpened('choose-level-subscribe')
        }
      } else {
        BrowserHistoryHelper.moveTo('/')
        // if (!isUnauthorizedScreen && isMobile) {
        //   console.log('first')
        //   BrowserHistoryHelper.moveTo('/')
        // } else {
        //   console.log('second')
        //   setChosedModal('chats')
        // }
      }
    } catch (e) {
      this.isCodeError = true
      super.notifyViewAboutChanges()
      console.log(e.message)
    }
    this.setIsLoading(false)
  }

  public createAccount = async (accountData: AccountData): Promise<void> => {
    this.setIsLoading(true)
    try {
      await this.authRepository.createAccount(accountData)
    } catch (e) {
      alert(e.message)
    }
    this.setIsLoading(false)
  }

  public onSignOut = (): void => {
    this.setIsLoading(true)
    this.authRepository.signOut()
    this.setIsLoading(false)
    BrowserHistoryHelper.moveTo('/')
  }

  private setIsLoading = (isLoading: boolean): void => {
    this.isLoading = isLoading
    super.notifyViewAboutChanges()
  }
}
