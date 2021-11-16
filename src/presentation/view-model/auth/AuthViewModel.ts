import AccountData from '../../../domain/models/auth/AccountData'
import SignUpData from '../../../domain/models/auth/SignUpData'
import BaseViewModel from '../BaseViewModel'

export default interface AuthViewModel extends BaseViewModel {
  email: string
  isLoading: boolean
  isCodeError: boolean

  onSignIn(email: string): Promise<void>

  onConfirmEmail(code: number, email: string): Promise<void>

  transmitEmail(email: string): void

  createAccount(accountData: AccountData): Promise<void>

  onSignUp(signUpData: SignUpData): Promise<void>
}
