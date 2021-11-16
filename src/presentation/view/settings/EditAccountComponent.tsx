import React from 'react'

import Grid from '@material-ui/core/Grid'

import arrowBack from '../../../assets/img/channels/arrow-back.svg'
import confirmCheck from '../../../assets/img/channels/confirm-check.svg'
import initialChannelIcon from '../../../assets/img/channels/upload-image.svg'
import uploadImage from '../../../assets/img/channels/upload-photo.svg'
import removeImageIcon from '../../../assets/img/channels/remove-photo.svg'
import Input from '../../ui/input/Input'
import Button from '../../ui/button/index'
import EditAccountViewModel from '../../view-model/settings/EditAccountViewModel'
import User from '../../../domain/models/auth/User'
import Textarea from '../../ui/textarea'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'
import UpdateUser from '../../../domain/models/user/UpdateUser'
import { APPLICATION_SERVER } from '../../../constants'

interface Props {
  editAccountViewModel: EditAccountViewModel
  isMobile?: boolean
}

interface State {
  firstName: string | null
  email: string | null
  isShowMenuBar: boolean
  refForOpenMenuBar: any
  userData?: User
  username: string
  isMoreUsername: boolean | null
  lastName?: string | null
  phone: string
  isMorePhone: boolean | null
  about: string | null
  id?: number
  avatar?: string
  previewChannelImage: any
  setChosedModal: () => void
}

export default class EditAccountComponent extends React.Component<
  Props,
  State
> {
  private readonly editAccountViewModel: EditAccountViewModel
  constructor(props: Props) {
    super(props)

    const { editAccountViewModel, setChosedModal } = this.props

    this.editAccountViewModel = editAccountViewModel
    this.setChosedModal = setChosedModal

    this.state = {
      firstName: '',
      email: '',
      isShowMenuBar: false,
      refForOpenMenuBar: undefined,
      username: '',
      isMoreUsername: null,
      lastName: '',
      phone: '',
      isMorePhone: null,
      about: '',
      id: 0,
      avatar: '',
      userData: editAccountViewModel?.userData,
      previewChannelImage: '',
    }
  }

  public componentDidMount = (): void => {
    this.editAccountViewModel.attachView(this)
  }

  public componentDidUpdate = (prevProps: Props, prevState: State): void => {
    if (prevState.userData !== this.state.userData) {
      if (this.state.userData) {
        this.setState({
          email: this.state.userData.email,
          firstName: this.state.userData.firstName,
          username: '@' + this.state.userData.username,
          isMoreUsername: this.state.userData.username ? true : false,
          lastName: this.state.userData.lastName,
          phone: '+' + this.state.userData.phone,
          isMorePhone: this.state.userData.phone ? true : false,
          about: this.state.userData.about,
          id: this.state.userData.id,
          avatar: this.state.userData.avatar,
        })
      }
    }
  }

  public componentWillUnmount = (): void => {
    this.editAccountViewModel.detachView(this)
  }

  public onViewModelChanged = (): void => {
    this.setState({
      userData: this.editAccountViewModel.userData,
    })
  }

  public render(): JSX.Element {
    const {
      firstName,
      isShowMenuBar,
      refForOpenMenuBar,
      email,
      lastName,
      username,
      isMoreUsername,
      phone,
      isMorePhone,
      about,
      id,
      avatar,
      previewChannelImage,
    } = this.state

    const handleClick = () => {
      if (!isShowMenuBar) {
        document.addEventListener('click', handleOutsideClick, false)
      } else {
        document.removeEventListener('click', handleOutsideClick, false)
      }

      this.setState({ isShowMenuBar: !isShowMenuBar })
    }

    const handleOutsideClick = (e: any) => {
      //@ts-ignore
      if (refForOpenMenuBar && !refForOpenMenuBar.contains(e.target))
        handleClick()
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      this.setState({ previewChannelImage: reader.result })
    }

    return (
      <div
        className="page-container pt-2 page-edit-channel"
        style={{
          background: isShowMenuBar ? 'rgba(0, 0, 0, 0.05)' : 'white',
          maxWidth: '388px',
        }}
      >
        <div id="edit-channel-root">
          <div>
            <div
              className="edit-account-header-wrapper"
              style={{
                height: '60px',
                background: isShowMenuBar ? '#F2F2F2' : 'white',
              }}
            >
              <Grid container spacing={2} style={{ alignItems: 'center' }}>
                <Grid xs={1} style={{ marginRight: '10px' }}>
                  <div className="arrow-back-block">
                    <div
                      className="icon-hover"
                      style={{ marginTop: '6px' }}
                      onClick={(): void => {
                        if (this.props?.isMobile) {
                          BrowserHistoryHelper.goBack()
                        } else {
                          this.props.goBack('left')
                        }
                      }}
                    >
                      <img src={arrowBack} alt="arrow back" />
                    </div>
                  </div>
                </Grid>
                <Grid xs={9} className="page-wrapper">
                  <div className="page-title">Изменить профиль</div>
                </Grid>
                <Grid xs={1}>
                  <div className="next-page">
                    <button
                      className="icon-hover"
                      style={{
                        lineHeight: '36px',
                        paddingTop: 0,
                        marginTop: '16px',
                      }}
                      onClick={(): void => {
                        this.editAccountViewModel.onUpdateUser({
                          id,
                          email,
                          firstName,
                          lastName,
                          username: username.slice(1),
                          phone: phone.slice(1),
                          about,
                        } as UpdateUser)
                        if (this.props?.isMobile) {
                          BrowserHistoryHelper.moveTo(`/account/settings`)
                        } else {
                          this.setChosedModal('chats')
                        }
                      }}
                    >
                      <img src={confirmCheck} alt="confirm-checkmark" />
                    </button>
                  </div>
                </Grid>
              </Grid>
            </div>

            <div id="user-messages-block" className="messages-scrollbar">
              <div
                className="d-flex justify-content-center"
                style={{ paddingTop: '33px' }}
              >
                <div
                  className="image-upload"
                  onClick={(): void => {
                    this.setState({ isShowMenuBar: !isShowMenuBar })
                  }}
                >
                  <label htmlFor="file-input">
                    {avatar && !previewChannelImage ? (
                      <img
                        src={`${APPLICATION_SERVER}/files/${avatar}`}
                        alt="upload"
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                        }}
                      />
                    ) : (
                      <img
                        src={
                          previewChannelImage
                            ? previewChannelImage
                            : initialChannelIcon
                        }
                        alt="upload"
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                        }}
                      />
                    )}
                  </label>
                </div>
              </div>

              <div style={{ paddingTop: '20px' }}>
                <label className="d-block pb-2" style={{ paddingLeft: '15px' }}>
                  Имя
                </label>
                <Input
                  value={firstName ? firstName : ''}
                  style={{
                    background: isShowMenuBar ? '#F2F2F2' : 'white',
                  }}
                  placeholder="Ваше имя"
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    this.setState({ firstName: e.currentTarget.value })
                  }}
                  className={'input-edit-account'}
                />
              </div>

              <div style={{ paddingTop: '10px' }}>
                <label className="d-block pb-2" style={{ paddingLeft: '15px' }}>
                  Фамилия
                </label>
                <Input
                  value={lastName ? lastName : ''}
                  style={{
                    background: isShowMenuBar ? '#F2F2F2' : 'white',
                  }}
                  placeholder="Ваша фамилия"
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    this.setState({ lastName: e.currentTarget.value })
                  }}
                  className={'input-edit-account'}
                />
              </div>
              <div style={{ paddingTop: '10px' }}>
                <label className="d-block pb-2" style={{ paddingLeft: '15px' }}>
                  Имя пользователя
                </label>
                <Input
                  style={{
                    background: isShowMenuBar ? '#F2F2F2' : 'white',
                    color: isMoreUsername ? '#000' : 'rgb(84, 84, 84)',
                  }}
                  value={username !== '@null' ? username : '@'}
                  type="text"
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    if (e.currentTarget.value[0] === '@') {
                      this.setState({
                        username: e.currentTarget.value,
                        isMoreUsername: true,
                      })
                    }
                    if (e.currentTarget.value === '@') {
                      this.setState({ isMoreUsername: false })
                    }
                  }}
                  className={'input-edit-account'}
                />
              </div>

              <div style={{ paddingTop: '10px' }}>
                <label className="d-block pb-2" style={{ paddingLeft: '15px' }}>
                  Номер телефона
                </label>
                <Input
                  style={{
                    background: isShowMenuBar ? '#F2F2F2' : 'white',
                    color: isMorePhone ? '#000' : 'rgb(84, 84, 84)',
                  }}
                  value={phone !== '+null' ? phone : '+'}
                  type="tel"
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    if (
                      e.currentTarget.value[0] === '+' &&
                      !/\D/.test(e.currentTarget.value.slice(1))
                    ) {
                      this.setState({
                        phone: e.currentTarget.value,
                        isMorePhone: true,
                      })
                    }
                    if (e.currentTarget.value === '+') {
                      this.setState({ isMorePhone: false })
                    }
                  }}
                  className={'input-edit-account'}
                />
              </div>

              <div style={{ paddingTop: '10px' }}>
                <label className="d-block pb-2" style={{ paddingLeft: '15px' }}>
                  О себе
                </label>
                <Textarea
                  style={{
                    background: isShowMenuBar ? '#F2F2F2' : 'white',
                    height: '72px',
                    borderRadius: '15px',
                    resize: 'none',
                  }}
                  value={about ? about : ''}
                  placeholder="Любые данные о себе, возраст, профессия или город"
                  onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
                    this.setState({ about: e.currentTarget.value })
                  }}
                  className={'textarea-edit-account'}
                />
              </div>

              <div style={{ paddingTop: '10px', paddingBottom: '50px' }}>
                <label className="d-block pb-2" style={{ paddingLeft: '15px' }}>
                  Адрес электронной почты
                </label>
                <Input
                  disabled={true}
                  style={{
                    background: isShowMenuBar ? '#F2F2F2' : 'white',
                  }}
                  value={email ? email : ''}
                  className={'input-edit-account'}
                />
              </div>
            </div>

            {isShowMenuBar ? (
              <div className="row menu-bar-wrapper">
                <div>
                  <div
                    className="d-flex pt-3 pl-4"
                    style={{ cursor: 'pointer' }}
                  >
                    <div>
                      <img src={uploadImage} alt="upload" />
                    </div>
                    <div className="pl-2" style={{ paddingTop: '2px' }}>
                      <label htmlFor="upload-image">Загрузить фотографию</label>
                      <input
                        id="upload-image"
                        type="file"
                        className="d-none"
                        onChange={(e): void => {
                          if (
                            e.target &&
                            e.target.files &&
                            e.target.files.length >= 1
                          ) {
                            reader.readAsDataURL(e.target.files[0])
                            this.editAccountViewModel.onUpdateUserAvatar(
                              e.target.files[0]
                            )
                            this.setState({ isShowMenuBar: false })
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* <div
                    onClick={() => {
                      BrowserHistoryHelper.moveTo(`/channels/edit-channel`)
                      this.setState({ isShowMenuBar: false })
                    }}
                  >
                    <div
                      className="d-flex pt-3 pl-4"
                      style={{ cursor: 'pointer' }}
                      onClick={(): void => {}}
                    >
                      <div>
                        <img
                          className="pl-1"
                          src={removeImageIcon}
                          alt="remove icon"
                        />
                      </div>
                      <div className="pl-3" style={{ paddingTop: '2px' }}>
                        Удалить
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="pt-3 d-flex justify-content-center w-100 pb-3">
                  <Button onClick={handleClick}>Отменить</Button>
                </div>
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
    )
  }
}
