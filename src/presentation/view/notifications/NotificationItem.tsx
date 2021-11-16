import styled from 'styled-components'
import DateUtils from '../../../utils/DateUtils'
import NotificationFields from '../../../domain/models/notifications/NotificationFields'
import { APPLICATION_SERVER } from '../../../constants'
import avatarImage from '../../../assets/img/channels/upload-image.svg'

const NotificationWrapper = styled.div`
  display: flex;
  padding-top: 17px;

  .notification-from-block {
    display: flex;
  }

  .notification-icon-wrap img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .notification-info-block {
    padding-left: 15px;
  }

  .notification-from-block-name {
    font-weight: bold;
    font-size: 15px;
    line-height: 19px;
    scolor: rgba(0, 0, 0, 0.9);
  }

  .notification-from-block-username {
    padding-left: 4px;
    font-size: 15px;
    line-height: 19px;
    color: rgba(0, 0, 0, 0.5);
  }

  .notification-text {
    font-size: 15px;
    line-height: 19px;
    color: rgba(0, 0, 0, 0.5);
  }
`

interface NotificationItemProps {
  notification: NotificationFields
}

const NotificationItem = (props: NotificationItemProps) => {
  const {
    firstname,
    lastname,
    level_name,
    subscribed_at,
    admin_id,
    avatar,
    channel_id,
    channel_name,
    subscribed_to,
    type,
    username,
  } = props?.notification

  return (
    <NotificationWrapper>
      <div className="notification-icon-wrap">
        {avatar ? (
          <img
            src={`${APPLICATION_SERVER}/files/${avatar}`}
            alt="notification user icon"
          />
        ) : (
          <img src={avatarImage} alt="notification empty user icon" />
        )}
      </div>
      <div className="notification-info-block">
        <div className="notification-from-block">
          <div className="notification-from-block-name">{`${firstname} ${lastname}`}</div>
          <div className="notification-from-block-username">
            @{username} ·{' '}
            {DateUtils.getDayAndShortMonthsFromDate(new Date(subscribed_at))}
          </div>
        </div>
        <div className="notification-text">
          Присоеденился(ась) к каналу {channel_name} с уровнем {`${level_name}`}
        </div>
      </div>
    </NotificationWrapper>
  )
}

export default NotificationItem
