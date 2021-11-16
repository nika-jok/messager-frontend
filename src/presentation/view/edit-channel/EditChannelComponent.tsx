import React from 'react'

import Grid from '@material-ui/core/Grid'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

import arrowBack from '../../../assets/img/channels/arrow-back.svg'
import confirmCheck from '../../../assets/img/channels/confirm-check.svg'
import uploadImageIcon from '../../../assets/img/channels/upload-image.svg'
import dollarSymbol from '../../../assets/img/channels/dollar-symbol.svg'
import initialChannelIcon from '../../../assets/img/channels/upload-image.svg'
import deleteChannelIcon from '../../../assets/img/channels/delete-channel.svg'

import uploadImage from '../../../assets/img/channels/upload-photo.svg'
import removeImageIcon from '../../../assets/img/channels/remove-photo.svg'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'
import Input from '../../ui/input/Input'
import Button from '../../ui/button'
import ChannelViewModel from '../../view-model/channels/ChannelViewModel'
import Channel from '../../../domain/models/channel/Channel'
import LevelsList from '../../../domain/models/channel/LevelsList'
import ChannelInfo from '../../../domain/models/channel/ChannelInfo'
import BrowserHistoryRouter from '../../../utils/BrowserHistoryRouter'
import { APPLICATION_SERVER } from '../../../constants'

interface PathParamsType {
  pathParam: string
}

interface Props extends RouteComponentProps<PathParamsType> {
  channelViewModel: ChannelViewModel
  path: string
  channelName?: string
  isMobile: boolean
  setChosedModal(): void
  setChosedChannel(): void
}

interface State {
  readonly channelData?: ChannelInfo
  readonly channelInfo?: Channel
  readonly channelId?: string
  readonly channelName?: string
  readonly levelsList?: LevelsList[]
  name: string
  description: string
  channelLink: string
  isMoreChannelLink: boolean
  isShowNameError: boolean
  isShowDescriptionError: boolean
  isShowChannelLinkError: boolean
  isShowMenuBar: boolean
  refForOpenMenuBar: any
  channelFiles: any
}

class EditChannelComponent extends React.Component<Props, State> {
  private readonly channelViewModel: ChannelViewModel
  constructor(props: Props) {
    super(props)

    const { channelViewModel } = this.props

    this.channelViewModel = channelViewModel
    this.state = {
      name: '',
      description: '',
      channelLink: 'messages.gg/',
      isMoreChannelLink: false,
      isShowNameError: false,
      isShowDescriptionError: false,
      isShowChannelLinkError: false,
      isShowMenuBar: false,
      refForOpenMenuBar: undefined,
      channelData: this.channelViewModel.channelData,
      channelId: this.channelViewModel.channelId,
      levelsList: this.channelViewModel.levelsList,
      channelInfo: this.channelViewModel.channelData?.channel[0],
      //@ts-ignore
      channelName: this.props.isMobile
        ? this.props.match.params.channel
        : this.props?.channelName,
      //@ts-ignore
      channelFiles: this.channelViewModel.channelData?.files,
    }
  }

  public componentDidMount = (): void => {
    this.channelViewModel.attachView(this)

    this.channelViewModel.getChannelInfo(this.state.channelName as string)
  }

  public componentDidUpdate = (prevProps: Props, prevState: State): void => {
    if (prevState.channelInfo !== this.state.channelInfo) {
      if (this.state.channelInfo) {
        this.setState({
          name: this.state.channelInfo.name,
          description: this.state.channelInfo.description,
          channelLink: 'messages.gg/' + this.state.channelInfo.link,
        })
      }
    }
  }

  public scrollToBottom() {}

  public componentWillUnmount = (): void => {
    this.channelViewModel.detachView(this)
  }

  public onViewModelChanged = (): void => {
    this.setState({
      channelData: this.channelViewModel.channelData,
      channelId: this.channelViewModel.channelId,
      levelsList: this.channelViewModel.levelsList,
      channelInfo: this.channelViewModel.channelData?.channel[0],
      //@ts-ignore
      channelFiles: this.channelViewModel.channelData?.files,
    })
  }

  render() {
    const {
      name,
      description,
      channelLink,
      isMoreChannelLink,
      isShowNameError,
      isShowDescriptionError,
      isShowChannelLinkError,
      isShowMenuBar,
      refForOpenMenuBar,
      channelId,
      levelsList,
      channelInfo,
      channelFiles,
    } = this.state
    console.log(levelsList)

    const isValidFieldsForEditChannel = () => {
      let isValid = true

      if (!name) {
        this.setState({ isShowNameError: true })
        isValid = false
      }

      if (!description) {
        this.setState({ isShowDescriptionError: true })
        isValid = false
      }

      if (!channelLink) {
        this.setState({ isShowChannelLinkError: true })
        isValid = false
      }

      return isValid
    }

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

    return (
      <div
        className="page-container pt-2"
        style={{
          background: isShowMenuBar ? 'rgba(0, 0, 0, 0.05)' : 'white',
          position: this.props?.isMobile ? 'fixed' : 'relative',
        }}
      >
        {channelInfo ? (
          <div id="edit-channel-root">
            <div style={{padding: '5px 15px'}}>
              <Grid container spacing={2}>
                <Grid style={{ marginRight: '10px' }}>
                  <div className="arrow-back-block">
                    <div
                      className="icon-hover"
                      onClick={(): void => {
                        if (this.props?.isMobile) {
                          BrowserHistoryRouter.goBack()
                        } else {
                          this.props.goBack('right')
                        }
                      }}
                    >
                      <img src={arrowBack} alt="arrow back" />
                    </div>
                  </div>
                </Grid>
                <Grid xs={9}>
                  <div className="page-title">Редактировать канал</div>
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
                      onClick={() => {
                        if (isValidFieldsForEditChannel()) {
                          this.channelViewModel.onUpdateChannel({
                            name,
                            description,
                            channelLink,
                          })
                          if (this.props?.isMobile) {
                            BrowserHistoryHelper.moveTo(
                              `/${this.state.channelName}/info`
                            )
                          } else {
                            this.props?.setChosedChannel(this.state.channelName)
                            this.props?.setChosedModal('channel-info')
                          }
                        }
                      }}
                    >
                      <img src={confirmCheck} alt="confirm-checkmark" />
                    </button>
                  </div>
                </Grid>
              </Grid>

              <div style={{ maxWidth: '600px', marginBottom: '50px' }}>
                <Grid xs={12}>
                  <div
                    onClick={() => {
                      handleClick()
                    }}
                    className="d-flex justify-content-center"
                    style={{ paddingTop: '33px' }}
                  >
                    <div className="image-upload">
                      <label htmlFor="file-input">
                        {channelFiles && channelFiles.length >= 1 ? (
                          <img
                            src={
                              channelFiles && channelFiles[0].name
                                ? `${APPLICATION_SERVER}/files/storage/icons/${channelFiles[0].name}.${channelFiles[0].type}`
                                : uploadImageIcon
                            }
                            alt="upload"
                            style={{
                              width: '80px',
                              height: '80px',
                              borderRadius: '50%',
                            }}
                          />
                        ) : (
                          <img
                            src={initialChannelIcon}
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
                </Grid>

                <div style={{ paddingTop: '20px' }}>
                  <label className="d-block">Название</label>
                  <Input
                    className={`${isShowNameError ? 'error-border' : ''}`}
                    value={name}
                    style={{
                      background: isShowMenuBar ? '#F2F2F2' : 'white',
                    }}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      this.setState({ isShowNameError: false })
                      this.setState({ name: e.currentTarget.value })
                    }}
                    placeholder="Название вашего канала"
                  />
                </div>

                <div style={{ paddingTop: '10px' }}>
                  <label className="d-block">Описание</label>
                  <textarea
                    className={`${
                      isShowDescriptionError ? 'error-border' : ''
                    } page-textarea`}
                    style={{
                      background: isShowMenuBar ? '#F2F2F2' : 'white',
                    }}
                    onChange={(e) => {
                      this.setState({ isShowDescriptionError: false })
                      this.setState({ description: e.currentTarget.value })
                    }}
                    value={description}
                    placeholder="Описание вашего канала"
                  />
                </div>
                <div style={{ paddingTop: '10px' }}>
                  <label className="d-block">Ссылка</label>
                  <Input
                    disabled={true}
                    className={`${
                      isShowChannelLinkError ? 'error-border' : ''
                    }`}
                    style={{
                      background: isShowMenuBar ? '#F2F2F2' : 'white',
                      color: isMoreChannelLink ? '#000' : 'rgb(84, 84, 84)',
                    }}
                    value={channelLink}
                    type="text"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      this.setState({ isShowChannelLinkError: false })
                      if (
                        e.currentTarget.value.slice(0, 12) === 'messages.gg/'
                      ) {
                        this.setState({
                          channelLink: e.currentTarget.value,
                          isMoreChannelLink: true,
                        })
                      }
                      if (e.currentTarget.value === 'messages.gg/') {
                        this.setState({ isMoreChannelLink: false })
                      }
                    }}
                  />
                </div>

                <div className="d-flex pt-4 pl-2">
                  <div>
                    <img src={dollarSymbol} alt="dollar" />
                  </div>
                  <div className="text-gray pt-1 pl-2">
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={(): void => {
                        if (this.props?.isMobile) {
                          BrowserHistoryHelper.moveTo(
                            `/${this.state.channelName}/participation-levels?id=${channelId}`
                          )
                        } else {
                          this.props?.setChosedModal('channel-levels')
                          this.props?.setChosedChannel(this.state.channelName)
                        }
                      }}
                    >
                      <b className="text-dark">
                        {levelsList && levelsList.length}
                      </b>{' '}
                      уровень участия
                    </div>
                  </div>
                </div>

                <div className="d-flex pt-2 edit-channel-text">
                  Добавьте уровни участия, чтобы получать доход.
                </div>

                {/* <div className="remove-channel-block pt-4  d-flex">
                  <div>
                    <img src={deleteChannelIcon} alt="delete channel" />
                  </div>
                  <button
                    className=" pl-3"
                    style={{ paddingTop: '3px' }}
                    onClick={(): void => {
                      const isDeleteChannel = window.confirm('Удалить канал?')
                      if (isDeleteChannel) {
                        this.channelViewModel.onDeleteChannel()
                      }
                    }}
                  >
                    Удалить канал
                  </button>
                </div> */}

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
                        <div className="pl-2">
                          <label htmlFor="upload-image">
                            Загрузить фотографию
                          </label>
                          <input
                            id="upload-image"
                            type="file"
                            className="d-none"
                            onChange={(e: any): void => {
                              this.channelViewModel.editChannelImage(
                                e.target.files[0],
                                e.target.files[0]?.name,
                                'channel'
                              )
                              this.setState({ isShowMenuBar: false })
                            }}
                          />
                        </div>
                      </div>

                      <Link
                        to="/channels/edit-channel"
                        onClick={() => {
                          this.setState({ isShowMenuBar: false })
                        }}
                      >
                        <div
                          className="d-flex pt-3 pl-4"
                          style={{ cursor: 'pointer' }}
                        >
                          <div>
                            <img
                              className="pl-1"
                              src={removeImageIcon}
                              alt="remove icon"
                              onClick={(): void => {
                                const isDeleteChannel =
                                  window.confirm('Удалить канал?')
                                if (isDeleteChannel) {
                                  this.channelViewModel.onDeleteChannel()
                                }
                              }}
                            />
                          </div>
                          <div className="pl-3">Удалить</div>
                        </div>
                      </Link>
                    </div>

                    <div className="pt-3 d-flex justify-content-center w-100 pb-3">
                      <Button onClick={handleClick}>Отменить</Button>
                    </div>
                  </div>
                ) : undefined}
              </div>
            </div>
          </div>
        ) : undefined}
      </div>
    )
  }
}

//@ts-ignore
export default withRouter(EditChannelComponent)
