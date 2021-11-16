import imageDontExist from '../../../assets/img/channels/upload-image.svg'
import { APPLICATION_SERVER } from '../../../constants'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'

interface Props {
  userName: string
  lastVisitTime: string
  userImage?: string
  id?: number
  setLastOpened?(lastOpened: string): void
  setChosedId?(id: number): void
  isMobile: boolean
}

const UserItem = (props: Props) => {
  const {
    userName,
    lastVisitTime,
    userImage,
    id,
    setChosedId,
    setLastOpened,
    isMobile,
    isFirstItem,
  } = props
  return (
    <div
      className="d-flex"
      style={{ paddingTop: isFirstItem ? '' : '17px' }}
      id="user-item-root"
      onClick={(): void => {
        if (isMobile) {
          BrowserHistoryHelper.moveTo(`/messages/private/${id}`)
        } else {
          setChosedId(id)
          setLastOpened('dialogs')
          BrowserHistoryHelper.moveTo(`/messages/private/${id}`)
        }
      }}
    >
      <div style={{ paddingTop: '3px' }}>
        <img
          className="user-icon"
          src={
            userImage
              ? `${APPLICATION_SERVER}/files/${userImage}`
              : imageDontExist
          }
          alt="user icon"
        />
      </div>
      <div className="pl-3">
        <div className="user-name c-p">{userName}</div>
        <div className="text-gray user-time-last-visit">{lastVisitTime}</div>
      </div>
    </div>
  )
}

export default UserItem
