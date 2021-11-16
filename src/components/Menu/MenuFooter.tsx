import { useEffect, useState } from 'react'

import messagesImage from '../../assets/img/menu/messages-block.svg'
import usersImage from '../../assets/img/menu/users-icon.svg'
import settingsImage from '../../assets/img/menu/settings.svg'
import notificationImage from '../../assets/img/menu/notification-icon.svg'
import chosedMessagesImage from '../../assets/img/menu/chosed-message.svg'
import chosedUsersImage from '../../assets/img/menu/chosed-users.svg'
import chosedSettingsImage from '../../assets/img/menu/chosed-settings.svg'
import chosedNotificationImage from '../../assets/img/menu/chosed-notifications.svg'
import BrowserHistoryHelper from '../../utils/BrowserHistoryRouter'
import channelsIcon from '../../assets/img/menu/gray-channels-icon.svg'
import chosedChannelsIcon from '../../assets/img/menu/blue-channels-icon.svg'

interface Props {
  children?: JSX.Element
  isMobile?: boolean
}

const MenuFooter = (props: Props): JSX.Element => {
  const { children, isMobile } = props
  const [isSettingsChosed, setIsSettingChosed] = useState(false)
  const [isSettingsHover, setIsSettingsHover] = useState(false)

  const [isMessagesChosed, setIsMessagesChosed] = useState(false)
  const [isMessagesHover, setIsMessagesHover] = useState(false)
  const [isNotificationChosed, setIsNotificationChosed] = useState(false)
  const [isNotificationHover, setIsNotificationHover] = useState(false)
  const [isUsersChosed, setIsUsersChosed] = useState(false)
  const [isUsersHover, setIsUsersHover] = useState(false)

  const [isChannelsChosed, setIsChannelsChosed] = useState(false)
  const [isChannelsHover, setIsChannelsHover] = useState(false)

  const nullifyChosedTabs = (): void => {
    setIsSettingChosed(false)
    setIsMessagesChosed(false)
    setIsNotificationChosed(false)
    setIsUsersChosed(false)
    setIsChannelsChosed(false)
  }

  useEffect((): void => {
    if (
      BrowserHistoryHelper.getHistory().location.pathname ===
      '/account/settings'
    ) {
      nullifyChosedTabs()
      setIsSettingChosed(true)
    }

    if (
      BrowserHistoryHelper.getHistory().location.pathname ===
      '/account/contacts'
    ) {
      nullifyChosedTabs()
      setIsUsersChosed(true)
      setIsUsersHover(false)
    }

    if (
      BrowserHistoryHelper.getHistory().location.pathname ===
      '/contacts/new_contact'
    ) {
      nullifyChosedTabs()
      setIsUsersChosed(true)
      setIsUsersHover(false)
    }

    if (
      BrowserHistoryHelper.getHistory().location.pathname ===
      '/account/notifications'
    ) {
      nullifyChosedTabs()
      setIsNotificationChosed(true)
      setIsNotificationHover(false)
    }

    if (
      BrowserHistoryHelper.getHistory().location.pathname ===
      '/account/channels'
    ) {
      nullifyChosedTabs()
      setIsChannelsChosed(true)
      setIsChannelsHover(false)
    }

    if (BrowserHistoryHelper.getHistory().location.pathname === '/') {
      nullifyChosedTabs()
      setIsMessagesChosed(true)
      setIsMessagesHover(false)
    }
  })
  const isPathname =
    BrowserHistoryHelper.getHistory().location.pathname === '/' ||
    BrowserHistoryHelper.getHistory().location.pathname ===
      '/account/settings' ||
    BrowserHistoryHelper.getHistory().location.pathname === '/account/channels'

  return (
    <div
      className="page-container pt-2"
      style={{
        padding: isPathname ? 0 : undefined,
        width: !isMobile ? '388px !important' : '488px',
      }}
    >
      {children}
      <div
        style={{
          height: '44px',
          background: 'white',
          position: 'absolute',
          zIndex: 66,
          bottom: '0',
          width: '100%',
          right: 0,
        }}
      >
        <div className="row">
          <div
            className="d-flex w-100 page-footer"
            style={{ justifyContent: 'space-evenly' }}
          >
            <div
              className="icon-hover"
              style={{ cursor: 'pointer' }}
              onClick={(): void => BrowserHistoryHelper.moveTo('/')}
              onMouseOver={() => setIsMessagesHover(true)}
              onMouseOut={() => setIsMessagesHover(false)}
            >
              <img
                src={
                  isMessagesChosed || isMessagesHover
                    ? chosedMessagesImage
                    : messagesImage
                }
                alt="message link"
              />
            </div>
            <div
              className="icon-hover"
              style={{ cursor: 'pointer' }}
              onClick={(): void =>
                BrowserHistoryHelper.moveTo('/account/channels')
              }
              onMouseOver={() => setIsChannelsHover(true)}
              onMouseOut={() => setIsChannelsHover(false)}
            >
              <img
                src={
                  isChannelsChosed || isChannelsHover
                    ? chosedChannelsIcon
                    : channelsIcon
                }
                alt="message link"
              />
            </div>
            <div
              className="icon-hover"
              onClick={(): void =>
                BrowserHistoryHelper.moveTo('/account/contacts')
              }
              style={{ cursor: 'pointer' }}
              onMouseOver={() => setIsUsersHover(true)}
              onMouseOut={() => setIsUsersHover(false)}
            >
              <img
                src={
                  isUsersChosed || isUsersHover ? chosedUsersImage : usersImage
                }
                alt="users link"
              />
            </div>
            <div
              className="icon-hover"
              onClick={(): void => {
                BrowserHistoryHelper.moveTo('/account/notifications')
              }}
              style={{ cursor: 'pointer' }}
              onMouseOver={() => setIsNotificationHover(true)}
              onMouseOut={() => setIsNotificationHover(false)}
            >
              <img
                src={
                  isNotificationChosed || isNotificationHover
                    ? chosedNotificationImage
                    : notificationImage
                }
                alt="notification link"
              />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuFooter
