import PropTypes from 'prop-types'
import styled from 'styled-components'
import BrowserHistoryRouter from '../../utils/BrowserHistoryRouter'
import arrowBack from '../../assets/img/channels/arrow-back.svg'
import infoImage from '../../assets/img/channels/info.svg'
import UserAvatar from '../../presentation/ui/user-avatar'
import DateUtils from '../../utils/DateUtils'

const PrivateMessagesHeaderWrap = styled.div`
  display: flex;
  width: 100%;

  .arrow-back-col {
    padding-left: 7px;
    .arrow-back {
      padding-top: 9px;
    }
  }
`

const PrivateMessagesHeader = ({
  lastOnline,
  id,
  isOnline,
  name,
  avatar,
  isMobile,
  setLastOpened,
  setUserIdModal,
}) => {
  const redirectTo = (pathname) => BrowserHistoryRouter.moveTo(pathname)

  const redirectToPageInfo = () => {
    if (isMobile) {
      redirectTo(`/users/${id}`)
    } else {
      setUserIdModal(id)
      setLastOpened('user-info')
    }
  }

  const wasLastTime = isOnline
    ? 'В сети'
    : DateUtils?.lastSeenAt(new Date(lastOnline))
    ? `был(а) ${DateUtils?.lastSeenAt(new Date(lastOnline))} назад`
    : 'был(а) недавно'

  return (
    <PrivateMessagesHeaderWrap>
      {isMobile ? (
        <div className="col-1 arrow-back-col" onClick={() => redirectTo('/')}>
          <div className="arrow-back">
            <div className="icon-hover">
              <img src={arrowBack} alt="arrow back" />
            </div>
          </div>
        </div>
      ) : undefined}

      <div
        className="col-8 pl-0 pb-2 messages-wrapper-info"
        style={{ marginLeft: '34px' }}
      >
        <div className="d-flex pt-2" onClick={redirectToPageInfo}>
          <div className="c-p">
            <UserAvatar isOnline={isOnline} avatar={avatar} />
          </div>
          <div className="pl-2">
            <div>
              <div className="username">{name}</div>
              <div className="text-gray">{wasLastTime}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-2 pl-0 pl-3">
        <div
          className="next-page icon-hover"
          style={{ marginTop: '10px', padding: 0 }}
          onClick={redirectToPageInfo}
        >
          <img className="c-p" src={infoImage} alt="more info" />
        </div>
      </div>
    </PrivateMessagesHeaderWrap>
  )
}

PrivateMessagesHeader.propTypes = {
  lastOnline: PropTypes.string,
  id: PropTypes.string,
  isOnline: PropTypes.bool,
  name: PropTypes.string,
  avatar: PropTypes.string,
  isMobile: PropTypes.bool,
}

PrivateMessagesHeader.defaultProps = {
  lastOnline: '',
  id: '',
  isOnline: false,
  name: '',
  avatar: '',
  isMobile: false,
}

export default PrivateMessagesHeader
