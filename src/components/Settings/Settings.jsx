import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import ApiHelper from '../../helpers/api/bio/me'
import Menu from '../Menu/Menu'
import avatarImage from '../../assets/img/channels/upload-image.svg'
import editChannelImage from '../../assets/img/menu/info.svg'
import notificationImage from '../../assets/img/menu/notification-icon.svg'
import addMessageIcon from '../../assets/img/channels/add-contact.svg'

import BrowserHistoryRouter from '../../utils/BrowserHistoryRouter'
import DateUtils from '../../utils/DateUtils'
import { APPLICATION_SERVER } from '../../constants'
import StorageHelper from '../../utils/StorageHelper'

function Settings({ setChosedModal, chosedModal, isMobile, goBack }) {
  const [isLoading, setLoading] = useState(false)
  const [localAvatar, setLocalAvatar] = useState('')
  const [lastOnline, setLastOnline] = useState()
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [firstName, setFirstName] = useState()
  const [phone, setPhone] = useState()
  const [lastName, setLastName] = useState()
  const [about, setAbout] = useState()

  const [isRedirect, setRedirect] = useState(false)
  const api = new ApiHelper()

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const data = await api.getMe(StorageHelper.getUserData()?.token)
      if (data.status !== 200) {
        return setRedirect(true)
      }

      const {
        email,
        username,
        firstName,
        lastName,
        phone,
        about,
        lastOnline,
        avatar,
      } = data.data.bio

      setEmail(email)
      setUsername(username)
      setFirstName(firstName)
      setPhone(phone)
      setLastName(lastName)
      setAbout(about)

      setLocalAvatar(data.data.bio.avatar)
      setLastOnline(lastOnline)
      setLoading(false)
      return
    })()
  }, [])

  const displayName = () => {
    if (firstName && lastName) return `${firstName} ${lastName}`
    if (firstName && !lastName) return firstName
    if (!firstName && lastName) return lastName
    if (username) return username
    return email
  }

  return (
    <div id="setting-page-root">
      <Menu isMobile={isMobile} chosedModal={chosedModal} />

      <div className="d-flex pt-4 pl-4">
        <div>
          <img
            src={
              localAvatar
                ? `${APPLICATION_SERVER}/files/${localAvatar}`
                : avatarImage
            }
            alt="avatar user"
            className="rounded-circle"
            style={{ width: '72px', height: '72px' }}
          />
        </div>
        <div className="pt-3 pl-3">
          <div className="username">
            {displayName() ? displayName() : email}
          </div>
          {lastOnline && (
            <div className="text-gray">
              был(а) {DateUtils.lastSeenAt(new Date(lastOnline))} назад
            </div>
          )}
        </div>
      </div>

      <div className="pt-4">
        <div
          className="d-flex setting-wrapper-item"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (isMobile) {
              BrowserHistoryRouter.moveTo('/account/edit')
            } else {
              setChosedModal('edit-settings')
            }
          }}
        >
          <div style={{ width: '20px' }}>
            <img src={editChannelImage} alt="edit channel" />
          </div>
          <div className="pl-3 list-items">Изменить профиль</div>
        </div>

        <div
          className="d-flex setting-wrapper-item"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (isMobile) {
              BrowserHistoryRouter.moveTo('/settings/detailed/notifications')
            } else {
              setChosedModal && setChosedModal('notifications')
            }
          }}
        >
          <div style={{ width: '20px' }}>
            <img src={notificationImage} alt="edit channel" />
          </div>
          <div className="pl-3 list-items">Уведомления</div>
        </div>

        {isMobile ? (
          <div
            className="centre-to-right-bottom"
            onClick={() => {
              BrowserHistoryRouter.moveTo('/account/new-message')
            }}
          >
            <div className="text-right">
              <img className="c-p" src={addMessageIcon} alt="new message" />
            </div>
          </div>
        ) : undefined}
      </div>
    </div>
  )
}

export default Settings
