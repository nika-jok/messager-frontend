import BrowserHistoryHelper from '../../utils/BrowserHistoryRouter'
import { APPLICATION_SERVER } from '../../constants'
import styled from 'styled-components'
import lastOnlineFn from '../../helpers/time/lastOnline'
import uploadIcon from '../../assets/img/channels/upload-image.svg'

const DisplayUserWrap = styled.div`
  .contact-container {
    display: flex;
    padding-top: 17px;
  }

  .avatar-wrap {
    img {
      width: 48px;
      height: 48px;
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-radius: 50%;
    }
  }

  .displayed-name {
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    color: rgba(0, 0, 0, 0.9);
  }

  .last-online {
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    padding-top: 6px;
    color: rgba(0, 0, 0, 0.5);
  }

  .user-info {
    padding-left: 14px;
    padding-top: 6px;
  }

  .username {
    font-size: 14px;
    line-height: 19px;
    font-style: normal;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.5);
  }
`

function Contact(props) {
  const {
    user: {
      id,
      firstName,
      lastName,
      displayedName,
      isOnline,
      lastOnline,
      avatar,
      username,
    },
    setChosedId,
    type,
    isMobile,
  } = props
  // debugger;
  const redirectToChat = () => {
    if (isMobile) {
      return BrowserHistoryHelper.moveTo(`/messages/private/${id}`)
    } else {
      setChosedId(id)
    }
  }
  const fullname = `${firstName} ${lastName}`
  return (
    <DisplayUserWrap>
      {type === 'contact' ? (
        <div className="contact-container" onClick={redirectToChat}>
          <div className="avatar-wrap">
            <img
              src={
                avatar ? `${APPLICATION_SERVER}/files/${avatar}` : uploadIcon
              }
              isOnline={isOnline}
              name={displayedName.charAt(0)}
              alt="contact"
            />
          </div>
          <div className="user-info">
            <div className="displayed-name">{props.user.firstName === props.user.lastName ? props.user.firstName : `${props.user.firstName} ${props.user.lastName}`}</div>
            <div className="last-online">
              {lastOnlineFn(lastOnline, isOnline)}
            </div>
          </div>
        </div>
      ) : (
        <div className="contact-container" onClick={redirectToChat}>
          <div className="avatar-wrap">
            <img
              src={
                avatar ? `${APPLICATION_SERVER}/files/${avatar}` : uploadIcon
              }
              isOnline={isOnline}
              name={displayedName?.charAt(0)}
              alt="contact"
            />
          </div>
          <div className="user-info">
            <div className="displayed-name">{props.user.firstName === props.user.lastName ? props.user.firstName : `${props.user.firstName} ${props.user.lastName}`}</div>
            <div className="username">@{username}</div>
          </div>
        </div>

        // <div  >
        //   <ListItemAvatar>
        //     <CustomAvatar
        //       src={`${APPLICATION_SERVER}/files/${avatar}`}
        //       isOnline={isOnline}
        //       name={fullname.charAt(0)}
        //     />
        //   </ListItemAvatar>
        //   <ListItemText primary={fullname} secondary={`@${username}` || ''} />
        // </div>
      )}
    </DisplayUserWrap>
  )
}

export default Contact
