import BrowserHistoryRouter from '../../utils/BrowserHistoryRouter'
import StringUtils from '../../utils/StringUtils'
import initialChannelIcon from '../../assets/img/channels/upload-image.svg'
import infoImage from '../../assets/img/channels/info.svg'
import arrowBack from '../../assets/img/channels/arrow-back.svg'
import { APPLICATION_SERVER } from '../../constants'
import PropTypes from 'prop-types'

const ChannelInfo = ({
  isShowMenuBar,
  isMobile,
  setLastOpened,
  channelInfo,
  setChannelInfoName,
  channelName,
  channelFiles,
  channelUserCount,
  goBack,
  channelUsers,
}) => {
  return (
    <div>
      <div
        className="channel-width"
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'white',
        }}
      >
        <div
          className="d-flex"
          style={{
            background: isShowMenuBar ? 'rgba(0, 0, 0, 0.05)' : 'white',
          }}
        >
          <div
            className="col-1 arrow-back-wrap"
            style={{ maxWidth: '10.333333%' }}
          >
            <div
              className="text-right c-p "
              style={{
                paddingTop: '10px',
              }}
            >
              <div
                className="icon-hover"
                onClick={() => {
                  if (isMobile) {
                    BrowserHistoryRouter.moveTo('/account/channels')
                  } else {
                    goBack('left')
                  }
                }}
              >
                <img src={arrowBack} alt="arrow back" />
              </div>
            </div>
          </div>
          <div
            className="col-9 pl-0 pb-2 messages-channel-header"
            style={{ marginLeft: '5px' }}
          >
            <div className="d-flex pl-2 pt-2">
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (isMobile) {
                    BrowserHistoryRouter.moveTo(`/${channelName}/info`)
                  } else {
                    setChannelInfoName(channelInfo?.link)
                    setLastOpened('channel-info')
                  }
                }}
              >
                {channelFiles && channelFiles.length >= 1 ? (
                  <img
                    src={`${APPLICATION_SERVER}/files/storage/icons/${channelFiles[0].name}.${channelFiles[0].type}`}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      border: ' 1px solid rgba(0, 0, 0, 0.05)',
                    }}
                    alt="channel-icon"
                  />
                ) : (
                  <img
                    src={initialChannelIcon}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                    alt="channel-icon"
                  />
                )}
              </div>
              <div className="pl-2">
                <div
                  onClick={() => {
                    if (isMobile) {
                      BrowserHistoryRouter.moveTo(`/${channelName}/info`)
                    } else {
                      setChannelInfoName(channelInfo?.link)
                      setLastOpened('channel-info')
                    }
                  }}
                >
                  <div className="channel-name">{channelInfo.name}</div>
                </div>
                <div className="channel-count-members">
                  {channelUsers || 0}{' '}
                  {StringUtils.getRightDeclination(channelUsers || 0, [
                    'участник',
                    'участника',
                    'участников',
                  ])}
                </div>
              </div>
            </div>
          </div>
          <div className="col-2 pl-0 pl-1">
            <div
              className="next-page icon-hover c-p"
              style={{ padding: 0, marginTop: '10px' }}
              onClick={() => {
                if (isMobile) {
                  BrowserHistoryRouter.moveTo(`/${channelName}/info`)
                } else {
                  setChannelInfoName(channelInfo?.link)
                  setLastOpened('channel-info')
                }
              }}
            >
              <img src={infoImage} alt="more info" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ChannelInfo.propTypes = {
  isShowMenuBar: PropTypes.bool,
  isMobile: PropTypes.bool,
  setLastOpened: PropTypes.func,
  channelInfo: PropTypes.object,
  setChannelInfoName: PropTypes.string,
  channelName: PropTypes.string,
  channelFiles: PropTypes.array,
  channelUserCount: PropTypes.number,
  goBack: PropTypes.func,
}

ChannelInfo.defaultProps = {
  isShowMenuBar: false,
  isMobile: false,
  setLastOpened: () => {},
  channelInfo: {},
  setChannelInfoName: () => {},
  channelName: '',
  channelFiles: [],
  channelUserCount: 0,
  goBack: () => {},
}

export default ChannelInfo
