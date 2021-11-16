import React from 'react'
import starsIcon from '../../../assets/img/auth/stars-icon.svg'
import arrowBack from '../../../assets/img/channels/arrow-back.svg'
import confirmCheck from '../../../assets/img/channels/confirm-check.svg'
import AuthViewModel from '../../view-model/auth/AuthViewModel'
import Input from '../../ui/input/Input'
import Loading from '../../../utils/LoadingComponent'
import StringUtils from '../../../utils/StringUtils'
import styled from 'styled-components'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'

const EnterCodeWrap = styled.div`
  .enter-code-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 86vh;
    width: 100%;
  }
`

interface Props {
  authViewModel: AuthViewModel
  isMobile: boolean
}

interface State {
  email: string
  code: string
  isCodeError: boolean
  isCodeValid: boolean
  isLoading: boolean
}

export default class EnterCodeComponent extends React.Component<Props, State> {
  private readonly authViewModel: AuthViewModel

  constructor(props: Props) {
    super(props)

    const { authViewModel } = this.props

    this.authViewModel = authViewModel

    this.state = {
      email: this.authViewModel.email,
      code: '',
      isCodeValid: false,
      isLoading: this.authViewModel.isLoading,
      isCodeError: this.authViewModel.isCodeError,
    }
  }

  public componentDidMount = (): void => {
    this.authViewModel.attachView(this)
  }

  public componentWillUnmount = (): void => {
    this.authViewModel.detachView(this)
  }

  public onViewModelChanged = (): void => {
    this.setState({
      email: this.authViewModel.email,
      isLoading: this.authViewModel.isLoading,
      isCodeError: this.authViewModel.isCodeError,
    })
  }

  public render(): JSX.Element {
    const { email, code, isCodeError, isLoading, isCodeValid } = this.state
    const {
      isMobile,
      setChosedModal,
      isUnauthorizedScreen,
      setChannelName,
      setLastOpened,
    } = this.props
    return (
      <EnterCodeWrap>
        <div
          className="page-container pt-2"
          style={{
            width: isUnauthorizedScreen ? '480px' : '100%',
            position: isMobile
              ? 'fixed'
              : isUnauthorizedScreen
              ? 'relative'
              : 'fixed',
          }}
        >
          <div id="enter-code-root">
            <div className="d-flex justify-content-between">
              <div className="d-flex" style={{ marginRight: '10px' }}>
                {!isUnauthorizedScreen ? (
                  <div className="arrow-back-block">
                    <div
                      className="icon-hover"
                      onClick={(): void => BrowserHistoryHelper.goBack()}
                      style={{
                        paddingLeft: isMobile ? '10px' : '30px',
                      }}
                    >
                      <img src={arrowBack} alt="arrow back" />
                    </div>
                  </div>
                ) : undefined}

                <div>
                  <div
                    className="page-title"
                    style={{ marginLeft: '8px', fontSize: '15px' }}
                  >
                    {this.props.isMobile
                      ? StringUtils.cutBySymbolsLength(email, 15)
                      : email}
                  </div>
                </div>
              </div>

              <div>
                <div
                  className="next-page"
                  style={{
                    paddingRight: isMobile ? '20px' : '31px',
                    marginTop: '-1px',
                  }}
                >
                  <button
                    className="icon-hover"
                    style={{
                      lineHeight: '36px',
                      paddingTop: 0,
                      marginTop: '7px',
                    }}
                    onClick={(): void => {
                      if (!code) {
                        this.setState({ isCodeValid: true })
                      } else {
                        this.authViewModel.onConfirmEmail(
                          Number(code),
                          email,
                          setChosedModal,
                          isMobile,
                          isUnauthorizedScreen,
                          setChannelName,
                          setLastOpened
                        )
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
            <div className={isUnauthorizedScreen ? 'pl16' : 'enter-code-wrap'}>
              <div style={{ paddingTop: '62px' }}>
                <div className="d-flex justify-content-center">
                  <img src={starsIcon} alt="stars" />
                </div>
                <div className="d-flex justify-content-center pt-4">
                  Проверьте сообщения на почте
                </div>
                <div
                  className="message-text pt-2 text-center"
                  style={{ margin: '0 auto' }}
                >
                  Мы отправили код на Ваш адрес электронной почты <b>{email}</b>
                </div>

                <div>
                  <div style={{ paddingTop: '20px' }} className="text-center">
                    <label
                      className="d-block your-code-label"
                      style={{
                        textAlign: 'initial',
                        paddingLeft: isUnauthorizedScreen ? '53px' : '',
                      }}
                    >
                      Ваш код
                    </label>
                    <span style={{ position: 'relative' }}>
                      <span id="masked-input">
                        <i></i>
                        *****
                      </span>
                      <Input
                        className={`${
                          isCodeValid || isCodeError ? 'error-border' : ''
                        }`}
                        type="tel"
                        autoFocus
                        value={code}
                        onKeyDown={(e) => {
                          if (e.keyCode === 13) {
                            if (!code) {
                              this.setState({ isCodeValid: true })
                            } else {
                              this.authViewModel.onConfirmEmail(
                                parseInt(code) as number,
                                email,
                                setChosedModal,
                                isMobile,
                                isUnauthorizedScreen,
                                setChannelName,
                                setLastOpened
                              )
                            }
                          }
                        }}
                        style={{ backgroundColor: 'transparent' }}
                        onChange={(
                          e: React.FormEvent<HTMLInputElement>
                        ): void => {
                          if (
                            e.currentTarget.value.length <= 5 &&
                            !/\D/.test(e.currentTarget.value)
                          ) {
                            let stars = ''
                            for (
                              let i = 1;
                              i <= 5 - e.currentTarget.value.length;
                              i++
                            ) {
                              stars += '*'
                            }
                            document.querySelector(
                              '#masked-input'
                            )!.innerHTML = `<i>${e.currentTarget.value}</i>${stars}`
                            this.setState({ code: e.currentTarget.value })
                          }
                          this.setState({ isCodeError: false })
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EnterCodeWrap>
    )
  }
}
