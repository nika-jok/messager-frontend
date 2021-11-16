import React from 'react'

import { RouteComponentProps, withRouter, Link } from 'react-router-dom'

import arrowBack from '../../../assets/img/channels/arrow-back.svg'
import initialChannelIcon from '../../../assets/img/channels/upload-image.svg'
import emailIcon from '../../../assets/img/channels/email-symbol.svg'
import moreInfoIcon from '../../../assets/img/channels/more-info.svg'
import shareIcon from '../../../assets/img/channels/share-icon.svg'
import editChannelIcon from '../../../assets/img/channels/edit-icon.svg'
import addUsersIcon from '../../../assets/img/channels/add-user-icon.svg'

import AboutChannel from '../channel/AboutChannel'
import BrowserHistoryRouter from '../../../utils/BrowserHistoryRouter'
import Channel from '../../../domain/models/channel/Channel'
import User from '../../../domain/models/auth/User'
import Button from '../../ui/button'
import StorageHelper from '../../../utils/StorageHelper'
import { APPLICATION_SERVER } from '../../../constants'
import StringUtils from '../../../utils/StringUtils'
import Popup from 'reactjs-popup'
import editIcon from '../../../assets/img/channels/edit-icon.svg'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'
import ChannelViewModel from '../../view-model/channels/ChannelViewModel'

interface PathParamsType {
  pathParam: string
}

interface Props extends RouteComponentProps<PathParamsType> {
  channelViewModel: ChannelViewModel
  path: string
  isMobile: boolean
  setChosedChannelForEdit(chosedChannel: string): void
  setLastOpened(openedModal: string): void
}

interface State {
  isShowMenuBar: boolean
  channelId?: string
  channelName: string
  channelInfo?: Channel
  channelAdmins?: User
  userId?: number
  channelFiles: any
  users?: User[]
}

class ChannelInfoComponent extends React.Component<Props, State> {
  private readonly channelViewModel: ChannelViewModel
  private popupRef: any
  constructor(props: Props) {
    super(props)

    const { channelViewModel } = this.props

    this.popupRef = React.createRef()

    this.state = {
      isShowMenuBar: false,
      userId: undefined,

      channelInfo: channelViewModel.channelData?.channel[0],
      channelId: channelViewModel.channelId,
      channelAdmins: channelViewModel.channelData?.channelAdmins,
      //@ts-ignore
      channelName: this.props.match.params.channel
        ? this.props.match.params.channel
        : this.props?.channelName,
      //@ts-ignore
      channelFiles: channelViewModel.channelData?.files,
      users: channelViewModel.channelData?.users,
    }

    this.channelViewModel = channelViewModel
  }

  public componentDidMount() {
    this.channelViewModel.attachView(this)

    this.channelViewModel.getChannelInfo(
      this.props.channelInfoName
        ? this.props.channelInfoName
        : this.state.channelName
    )

    const userId = StorageHelper.getUserData()?.user_id

    this.setState({ userId: userId ? userId : 0 })
  }

  public componentWillUnmount() {
    this.channelViewModel.detachView(this)
  }

  public scrollToBottom() {}

  public onViewModelChanged() {
    this.setState({
      channelId: this.channelViewModel.channelId,
      channelInfo: this.channelViewModel.channelData?.channel[0],
      channelAdmins: this.channelViewModel.channelData?.channelAdmins,
      users: this.channelViewModel.channelData?.users,
      //@ts-ignore
      channelFiles: this.channelViewModel.channelData?.files,
    })
  }

  render() {
    const {
      isShowMenuBar,
      channelInfo,
      channelAdmins,
      userId,
      channelFiles,
      users,
    } = this.state

    return (
      <div className="channel-info-container">
        <div
          className="page-container"
          style={{
            background: `${isShowMenuBar ? 'rgba(0, 0, 0, 0.05)' : 'white'}`,
            position: 'relative',
          }}
        >
          <div id="channel-info-root">
            {channelInfo ? (
              <>
                <div style={{padding: '0 15px'}}>
                  <div className='container' style={{display: 'flex'}}>
                    <div className="channel-info-arrow-back-wrap">
                      <div
                        className="text-right c-p"
                        style={{
                          paddingTop: '10px',
                        }}
                      >
                        <div
                          className="icon-hover"
                          onClick={(): void => {
                            if (this.props.isMobile) {
                              BrowserHistoryRouter.goBack()
                            } else {
                              this.props.goBack('right')
                            }
                          }}
                        >
                          <img src={arrowBack} alt="arrow back" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="page-title">Информация об канале</div>
                    </div>
                  </div>
                  <div style={{ maxWidth: '600px', margin: 'auto' }}>
                    <div className="d-flex pl-2 pt-4">
                      <div
                        className="channel-info-icon"
                        style={{ cursor: 'pointer' }}
                      >
                        {channelFiles && channelFiles.length >= 1 ? (
                          <img
                            style={{
                              width: '72px',
                              height: '72px',
                              borderRadius: '50%',
                              border: '1px solid rgba(0, 0, 0, 0.05)',
                            }}
                            src={`${APPLICATION_SERVER}/files/storage/icons/${channelFiles[0].name}.${channelFiles[0].type}`}
                            alt="channel-icon"
                          />
                        ) : (
                          <img
                            src={initialChannelIcon}
                            style={{
                              width: '72px',
                              height: '72px',
                              borderRadius: '50%',
                              border: '1px solid rgba(0, 0, 0, 0.05)',
                            }}
                            alt="channel-icon"
                          />
                        )}
                      </div>
                      <div className="pl-2">
                        <div className="channel-name">{channelInfo.name}</div>
                        <div className="channel-count-members">
                          {users?.length ? users?.length : 1}{' '}
                          {users?.length
                            ? StringUtils.getRightDeclination(users?.length, [
                                'участник',
                                'участника',
                                'участников',
                              ])
                            : 'участник'}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex pt-4">
                      <div
                        onClick={() => {
                          if (channelAdmins && userId) {
                            if (channelAdmins.user_id === userId) {
                              this.setState({ isShowMenuBar: true })
                            }
                          }
                        }}
                      >
                        <button>
                          <img src={moreInfoIcon} alt="more-info" />
                        </button>
                      </div>


                      {/* {this.props?.isMobile ? (
                        <div
                          onClick={() => {
                            if (channelAdmins && userId) {
                              if (channelAdmins.user_id === userId) {
                                this.setState({ isShowMenuBar: true })
                              }
                            }
                          }}
                        >
                          <button>
                            <img src={moreInfoIcon} alt="more-info" />
                          </button>
                        </div>
                      ) : (
                        <Popup
                          ref={this.popupRef}
                          trigger={
                            <button>
                              <img src={moreInfoIcon} alt="more-info" />
                            </button>
                          }
                        >
                          <div
                            className="popup-wrap"
                            onClick={() => {
                              this.props.setLastOpened('edit-channel')
                              this.props.setChosedChannelForEdit(
                                this.state.channelName
                              )
                            }}
                          >
                            <div className="d-flex">
                              <div>
                                <img src={editIcon} alt="edit" />
                              </div>
                              <span className="pl-2">Редактировать канал</span>
                            </div>
                          </div>
                        </Popup>
                      )} */}

                      <div>
                        <button>
                          <img src={shareIcon} alt="share-icon" />
                        </button>
                      </div>
                    </div>

                    <AboutChannel
                      desc={channelInfo.description}
                      isShowChannelName={false}
                      isNotCenteredText={true}
                    />

                    <div className="channel-link pt-4">
                      <img src={emailIcon} alt="email symbol" />
                      <label className="pl-2">
                        <div
                          className="link"
                          style={{ cursor: 'pointer' }}
                          onClick={(): void => {
                            BrowserHistoryRouter.moveTo(`/${channelInfo.link}`)
                          }}
                        >
                          {channelInfo.link}
                        </div>
                      </label>
                    </div>
                    {console.log(this.props?.isMobile)}
                    {isShowMenuBar && this.props?.isMobile ? (
                      <div className="row menu-bar-wrapper">
                        <div>
                          <div
                            onClick={() => {
                              if (this.props.isMobile) {
                                BrowserHistoryHelper.moveTo(
                                  `/${this.state.channelName}/edit-channel`
                                )
                              } else {
                                this.props.setLastOpened('edit-channel')
                                this.props.setChosedChannelForEdit(
                                  this.state.channelName
                                )
                              }
                            }}
                          >
                            <div
                              className="d-flex pt-3 pl-4"
                              style={{ cursor: 'pointer' }}
                            >
                              <div style={{ width: '30px' }}>
                                <img src={editChannelIcon} alt="edit channel" />
                              </div>
                              <div className="pl-2">Редактировать канал</div>
                            </div>
                          </div>

                          {/* <Link to="/invite-users">
                            <div
                              className="d-flex pt-4 pl-4"
                              style={{ cursor: 'pointer' }}
                            >
                              <div style={{ width: '30px' }}>
                                <img src={addUsersIcon} alt="add new users" />
                              </div>
                              <div className="pl-2">Пригласить учасников</div>
                            </div>
                          </Link> */}
                        </div>

                        <div className="pt-4 d-flex justify-content-center w-100 pb-3">
                          <Button
                            onClick={(): void => {
                              this.setState({ isShowMenuBar: false })
                            }}
                          >
                            Отменить
                          </Button>
                        </div>
                      </div>
                    ) : undefined}
                  </div>
                </div>
              </>
            ) : undefined}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ChannelInfoComponent)
