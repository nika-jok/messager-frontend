import React from 'react'

import BrowserHistoryRouter from '../../../utils/BrowserHistoryRouter'
import Grid from '@material-ui/core/Grid'
import AuthViewModel from '../../../presentation/view-model/auth/AuthViewModel'
import arrowBack from '../../../assets/img/channels/arrow-back.svg'
import confirmCheck from '../../../assets/img/channels/confirm-check.svg'
import initialChannelIcon from '../../../assets/img/channels/upload-image.svg'
import Loading from '../../../utils/LoadingComponent'
import Input from '../../ui/input/Input'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'

interface Props {
  authViewModel: AuthViewModel
}

interface State {
  email: string
  isLoading: boolean
  name: string
  surname: string
  username: string
  isMoreUsername: boolean
  avatar?: File
  isNameError: boolean
  isSurnameError: boolean
  isUsernameError: boolean
}

export default class SignUpComponent extends React.Component<Props, State> {
  private readonly authViewModel: AuthViewModel
  constructor(props: Props) {
    super(props)

    this.authViewModel = props.authViewModel

    this.state = {
      email: this.authViewModel.email,
      name: '',
      surname: '',
      username: '@',
      isMoreUsername: false,
      avatar: undefined,
      isLoading: this.authViewModel.isLoading,
      isNameError: false,
      isSurnameError: false,
      isUsernameError: false,
      previewUserImage: undefined,
    }
  }

  public render(): JSX.Element {
    const {
      email,
      isLoading,
      name,
      surname,
      username,
      isMoreUsername,
      avatar,
      isUsernameError,
      isSurnameError,
      isNameError,
      previewUserImage,
    } = this.state

    const isValidFieldsForCreateUser = (): boolean => {
      let isValid = true
      if (!name) {
        this.setState({ isNameError: true })
        isValid = false
      }
      if (!surname) {
        this.setState({ isSurnameError: true })
        isValid = false
      }
      if (!username) {
        this.setState({ isUsernameError: true })
        isValid = false
      }

      return isValid
    }

    const { isMobile, setChosedModal, isUnauthorizedScreen } = this.props

    const reader = new FileReader()

    reader.onloadend = () => {
      this.setState({ previewUserImage: reader.result })
    }

    return (
      <div
        className="page-container pt-2"
        style={{
          position: isMobile ? 'fixed' : 'relative',
          width: isMobile ? '100%' : '480px',
        }}
      >
        <div id="enter-code-root">
          <Grid container spacing={2}>
            {isUnauthorizedScreen ? undefined : (
              <Grid xs={1} style={{ marginRight: '10px' }}>
                <div className="arrow-back-block">
                  <div
                    className="icon-hover"
                    onClick={(): void => BrowserHistoryRouter.goBack()}
                  >
                    <img src={arrowBack} alt="arrow back" />
                  </div>
                </div>
              </Grid>
            )}

            <Grid xs={9}>
              <div className="page-title">{email}</div>
            </Grid>
            <Grid xs={1}>
              <div className="next-page">
                <button
                  className="icon-hover"
                  style={{
                    lineHeight: '36px',
                    paddingTop: 0,
                    marginTop: '7px',
                  }}
                  onClick={(): void => {
                    if (isValidFieldsForCreateUser() && email) {
                      this.authViewModel.onSignUp(
                        {
                          name,
                          surname,
                          username: username.slice(1),
                          email,
                          avatar: undefined,
                        },
                        isMobile,
                        setChosedModal,
                        isUnauthorizedScreen
                      )
                    }
                  }}
                >
                  <img src={confirmCheck} alt="confirm-checkmark" />
                </button>
              </div>
            </Grid>
          </Grid>

          <div style={{ maxWidth: '380px', margin: 'auto', paddingTop: '5%' }}>
            {isLoading ? (
              <div className="d-flex justify-content-center pt-4 pb-4">
                <Loading />
              </div>
            ) : undefined}

            <div
              className="d-flex justify-content-center"
              style={{ paddingTop: '33px' }}
            >
              <div className="image-upload">
                <label htmlFor="file-input">
                  <img
                    src={
                      previewUserImage ? previewUserImage : initialChannelIcon
                    }
                    alt="upload"
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                    }}
                  />
                </label>
                <input
                  id="file-input"
                  type="file"
                  onChange={(e) => {
                    if (
                      e.target &&
                      e.target.files &&
                      e.target.files.length >= 1
                    ) {
                      reader.readAsDataURL(e.target.files[0])
                      this.setState({ avatar: e.target.files[0] })
                    }
                  }}
                />
              </div>
            </div>

            <div className="pt-4">
              <div>
                <label className="d-block your-code-label">Имя</label>
                <Input
                  value={name}
                  className={`${isNameError ? 'error-border' : ''}`}
                  type="text"
                  placeholder="Ваше имя"
                  onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                    this.setState({ name: e.currentTarget.value })
                    this.setState({ isNameError: false })
                  }}
                />
              </div>
              <div className="pt-3">
                <label className="d-block your-code-label">Фамилия</label>
                <Input
                  className={`${isSurnameError ? 'error-border' : ''}`}
                  type="text"
                  value={surname}
                  placeholder="Ваша фамилия"
                  onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                    this.setState({ surname: e.currentTarget.value })
                    this.setState({ isSurnameError: false })
                  }}
                />
              </div>
              <div className="pt-3">
                <label className="d-block your-code-label ">
                  Имя пользователя
                </label>
                <Input
                  className={`input-unchanged ${
                    isUsernameError ? 'error-border' : ''
                  }`}
                  style={{
                    color: isMoreUsername ? '#000' : 'rgb(124, 124, 124)',
                  }}
                  type="text"
                  value={username}
                  onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                    if (e.currentTarget.value[0] === '@') {
                      this.setState({
                        username: e.currentTarget.value,
                        isMoreUsername: true,
                      })
                      this.setState({ isUsernameError: false })
                    }
                    if (e.currentTarget.value === '@') {
                      this.setState({ isMoreUsername: false })
                    }
                  }}
                />
              </div>
            </div>

            <div className="text-gray pt-4">
              Пожалуйста, добавьте имя, фотографию и имя пользователя.
              Регистрируясь, вы принимаете наши
              <a
                style={{ color: '#50BCFF' }}
                onClick={(): void =>
                  BrowserHistoryHelper.moveTo('/account/terms')
                }
              >
                {' '}
                Условия использования
              </a>{' '}
              и{' '}
              <a
                style={{ color: '#50BCFF' }}
                onClick={(): void =>
                  BrowserHistoryHelper.moveTo('/account/privacy')
                }
              >
                Политика конфиденциальности
              </a>{' '}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
