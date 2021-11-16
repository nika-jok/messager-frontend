import React from 'react'
import Input from '../../ui/input/Input'
import arrowBack from '../../../assets/img/channels/arrow-back.svg'
import confirmCheck from '../../../assets/img/channels/confirm-check.svg'
import AuthViewModel from '../../view-model/auth/AuthViewModel'
import FormValidator from '../../../utils/FormValidator'
import Loading from '../../../utils/LoadingComponent'
import BrowserHistoryRouter from '../../../utils/BrowserHistoryRouter'
import styled from 'styled-components'
import appLogo from '../../../assets/img/welcome-page/logo-dove.svg'

interface Props {
  authViewModel: AuthViewModel
  isMobile: boolean
}

interface State {
  isLoading: boolean
  email: string
  isEmailError: boolean
}

const AuthComponentWrap = styled.div`
  .enter-email-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 86vh;
  }

  .auth-header {
    padding-top: 12px;
  }

  .app-logo-wrap {
    padding-left: 21px;
  }
`

export default class AuthComponent extends React.Component<Props, State> {
  private readonly authViewModel: AuthViewModel
  constructor(props: Props) {
    super(props)

    this.authViewModel = props.authViewModel

    this.state = {
      email: '',
      isEmailError: false,
      isLoading: this.authViewModel.isLoading,
    }
  }

  public componentDidMount() {
    this.authViewModel.attachView(this)
  }

  public componentWillUnmount() {
    this.authViewModel.detachView(this)
  }

  public onViewModelChanged = (): void => {
    this.setState({
      isLoading: this.authViewModel.isLoading,
    })
  }

  public render(): JSX.Element {
    const { email, isEmailError, isLoading } = this.state

    const { setChosedModal, isMobile, isUnauthorizedScreen } = this.props

    return (
      <>
        <AuthComponentWrap
          className="page-container"
          style={{
            maxWidth: '100%',
            position: isMobile ? 'fixed' : 'relative',
          }}
        >
          <div
            id="auth-root"
            style={{ width: isUnauthorizedScreen ? '480px' : '100%' }}
          >
            <div className="d-flex justify-content-between auth-header">
              <div className="d-flex" style={{ marginRight: '10px' }}>
                {!isUnauthorizedScreen ? (
                  <div
                    className="arrow-back-block"
                    style={{
                      paddingLeft: isMobile ? '10px' : '30px',
                    }}
                  >
                    <div
                      className="icon-hover"
                      onClick={(): void => BrowserHistoryRouter.goBack()}
                    >
                      <img src={arrowBack} alt="arrow back" />
                    </div>
                  </div>
                ) : (
                  <div className="app-logo-wrap">
                    <img src={appLogo} alt="message" />
                  </div>
                )}

                <div>
                  <div
                    className="page-title"
                    style={{
                      marginLeft: '8px',
                      fontSize: '18px',
                      paddingTop: isUnauthorizedScreen ? '0px' : '',
                    }}
                  >
                    {this.props?.isMobile
                      ? 'Ваш адрес электронн...'
                      : 'Ваш адрес электроной почты'}
                  </div>
                </div>
              </div>

              <div>
                <div
                  className="next-page pt-1"
                  style={{
                    paddingRight: isMobile ? '20px' : '31px',
                  }}
                >
                  <button
                    className="icon-hover"
                    style={{
                      lineHeight: '36px',
                      paddingTop: 0,
                      marginTop: '-7px',
                    }}
                    onClick={() => {
                      if (!email) {
                        this.setState({ isEmailError: true })
                      } else if (!FormValidator.isValidEmail(email)) {
                        this.setState({ isEmailError: true })
                      } else {
                        this.setState({ isEmailError: false })
                        this.authViewModel.onSignIn(
                          email,
                          this.props?.isMobile,
                          this.props?.setChosedModal,
                          isUnauthorizedScreen
                        )

                        this.authViewModel.transmitEmail(email)
                      }
                    }}
                  >
                    <img src={confirmCheck} alt="confirm-checkmark" />
                  </button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="d-flex justify-content-center pt-4 pb-4">
                <Loading />
              </div>
            ) : undefined}

            <div className={isUnauthorizedScreen ? 'pl16' : 'enter-email-wrap'}>
              <div className="pt-4 ">
                <div className="d-flex pt-4 pl-2">Адрес электронной почты</div>
                <div className="pt-3">
                  <Input
                    autoFocus
                    className={`${isEmailError ? 'error-border' : ''}`}
                    placeholder="Ваш адрес эл. почты"
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        if (!email) {
                          this.setState({ isEmailError: true })
                        } else if (!FormValidator.isValidEmail(email)) {
                          this.setState({ isEmailError: true })
                        } else {
                          this.setState({ isEmailError: false })

                          this.authViewModel.onSignIn(
                            email,
                            this.props?.isMobile,
                            this.props?.setChosedModal,
                            isUnauthorizedScreen
                          )
                          this.authViewModel.transmitEmail(email)
                        }
                      }
                    }}
                    onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                      this.setState({
                        isEmailError: false,
                        email: e.currentTarget.value,
                      })
                    }}
                  />
                </div>

                <div className="message-text pt-3 pl-2">
                  Пожалуйста, укажите свой адрес электронной почты.
                </div>
              </div>
            </div>
          </div>
        </AuthComponentWrap>
      </>
    )
  }
}
