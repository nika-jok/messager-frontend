import { useState, useEffect, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import ApiHelper from '../../helpers/api/bio/me'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import StorageHelper from '../../utils/StorageHelper'
import closeImage from '../../assets/img/channels/close-icon.svg'
import newChannelImage from '../../assets/img/menu/new-channel.svg'
import newContactImage from '../../assets/img/menu/new-contact.svg'
import administratingIcon from '../../assets/img/menu/administrating-icon.svg'
import paymentImage from '../../assets/img/menu/payment.svg'
import exitImage from '../../assets/img/menu/exit.svg'
import BrowserHistoryRouter from '../../utils/BrowserHistoryRouter'
import emptyImage from '../../assets/img/channels/upload-image.svg'
import faqImage from '../../assets/img/menu/faq-icon.svg'
import BrowserHistoryHelper from '../../utils/BrowserHistoryRouter'
import { APPLICATION_SERVER } from '../../constants'
import settingsImage from '../../assets/img/menu/settings.svg'
import addContact from '../../assets/img/contacts/add-contact.svg'

function Menu({ chosedModal, setChosedModal }) {
  const [redirect, setRedirect] = useState(null)
  const api = new ApiHelper()
  const [isOpen, setOpen] = useState(false)
  const [isAdmin, setAdmin] = useState(false)
  const [pageName, setPageName] = useState('')
  const [userDate, setUserDate] = useState(undefined)
  const [userImage, setUserImage] = useState('')
  const [isMobile, setIsMobile] = useState('')

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setOpen(open)
  }

  const resizeHandler = useCallback(() => {
    if (document.body.clientWidth <= 1008) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [document.body.clientWidth])

  useEffect(() => {
    if (document.body.clientWidth <= 1008) {
      setIsMobile(true)
    }

    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  useEffect(() => {
    ;(async () => {
      const data = await api.getMe()
      if (data.status !== 200) {
        return setRedirect(true)
      }

      setAdmin(data.data.bio.isAdmin)
      setUserDate(data.data.bio)
      setUserImage(data.data.bio.avatar)

      return
    })()

    if (isMobile) {
      if (
        BrowserHistoryHelper.getHistory().location.pathname ===
        '/account/settings'
      ) {
        setPageName('Настройки')
      }

      if (
        BrowserHistoryHelper.getHistory().location.pathname ===
        '/account/contacts'
      ) {
        setPageName('Контакты')
      }

      if (
        BrowserHistoryRouter.getHistory().location.pathname ===
        '/account/notifications'
      ) {
        setPageName('Уведомления')
      }

      if (
        BrowserHistoryHelper.getHistory().location.pathname ===
        '/account/channels'
      ) {
        setPageName('Каналы')
      }

      if (BrowserHistoryHelper.getHistory().location.pathname === '/') {
        setPageName('Сообщения')
      }
    } else {
      if (chosedModal === 'contacts') {
        setPageName('Контакты')
      }

      if (chosedModal === 'settings') {
        setPageName('Настройки')
      }

      if (chosedModal === 'notifications') {
        setPageName('Уведомления')
      }
    }
  }, [isMobile])

  const logOut = (e) => {
    e.preventDefault()
    StorageHelper.removeUserData()
    toggleDrawer(false)
    setOpen(false)
    BrowserHistoryHelper.moveTo('/')
    window.location.reload()
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <>
      {isMobile ? (
        <div className="page-header-wrapper" style={{ padding: '0 15px' }}>
          <>
            <div className="d-flex page-header">
              <button className="user-icon-hover" onClick={toggleDrawer(true)}>
                {userImage ? (
                  <img
                    src={`${APPLICATION_SERVER}/files/${userImage}`}
                    alt="user avatar"
                    width="32"
                    style={{ borderRadius: '50%' }}
                    height="32"
                  />
                ) : (
                  <img
                    src={emptyImage}
                    width="32"
                    height="32"
                    style={{ borderRadius: '50%' }}
                    alt="user avatar"
                  />
                )}
              </button>
              <div className="page-title">{pageName}</div>
            </div>

            <SwipeableDrawer
              open={isOpen}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              <div
                className="container"
                style={{ width: '326px', padding: '0' }}
              >
                <div
                  className="d-flex justify-content-between"
                  style={{ padding: '30px 30px 0', alignItems: 'center' }}
                >
                  <div className="page-title p-0">Аккаунт</div>
                  <div
                    className="icon-hover"
                    onClick={toggleDrawer(false)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={closeImage} alt="close" />
                  </div>
                </div>
                <div className="pt-4" style={{ padding: '0 30px 0' }}>
                  {userImage ? (
                    <img
                      src={`${APPLICATION_SERVER}/files/${userImage}`}
                      alt="user avatar"
                      className="user-icon"
                      width="32"
                      height="32"
                    />
                  ) : (
                    <img
                      src={emptyImage}
                      width="32"
                      height="32"
                      alt="user avatar"
                    />
                  )}
                </div>
                <div className="pt-3" style={{ padding: '0 30px 0' }}>
                  <b>
                    {userDate?.firstName && userDate?.lastName
                      ? `${userDate.firstName} ${userDate.lastName}`
                      : userDate && userDate.email}
                  </b>
                </div>
                <div className="text-gray pt-3" style={{ padding: '0 30px 0' }}>
                  {userDate?.username ? `@${userDate?.username}` : undefined}
                </div>
                <div className="text-gray pt-3" style={{ padding: '0 30px 0' }}>
                  Мой баланс
                  <b className="pl-1" style={{ color: 'rgba(0, 0, 0, 0.9)' }}>
                    ${userDate && userDate.balance ? userDate.balance : 0}
                  </b>
                </div>

                <div className="sidebar-menu-wrapper mt-3">
                  <div
                    className="d-flex"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      BrowserHistoryRouter.moveTo('/channel/create-channel')
                      setOpen(false)
                    }}
                  >
                    <div style={{ width: '22px' }}>
                      <img src={newChannelImage} alt="new channel" />
                    </div>
                    <div
                      className="pl-3 menu-item-text"
                      style={{ paddingTop: '3px' }}
                    >
                      Новый канал
                    </div>
                  </div>
                </div>
                <div className="sidebar-menu-wrapper">
                  <div
                    className="d-flex"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      BrowserHistoryRouter.moveTo('/contacts/new_contact')
                      setOpen(false)
                    }}
                  >
                    <div style={{ width: '22px' }}>
                      <img src={newContactImage} alt="new channel" />
                    </div>
                    <div
                      className="pl-3 menu-item-text"
                      style={{ paddingTop: '2px' }}
                    >
                      Новый контакт
                    </div>
                  </div>
                </div>
                <div className="sidebar-menu-wrapper">
                  <div
                    className="d-flex"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      BrowserHistoryRouter.moveTo('/account/withdrawals')
                      setOpen(false)
                    }}
                  >
                    <div style={{ width: '22px' }}>
                      <img src={paymentImage} alt="open withdrawals window" />
                    </div>
                    <div className="pl-3 menu-item-text">Платежи</div>
                  </div>
                </div>
                {isAdmin ? (
                  <div className="sidebar-menu-wrapper">
                    <div
                      className="d-flex"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        BrowserHistoryRouter.moveTo('/admin/administrating')
                        setOpen(false)
                      }}
                    >
                      <div style={{ width: '22px' }}>
                        <img
                          src={administratingIcon}
                          alt="open administrating window"
                        />
                      </div>
                      <div className="pl-3 menu-item-text">
                        Администрирование
                      </div>
                    </div>
                  </div>
                ) : undefined}

                <div className="sidebar-menu-wrapper">
                  <div
                    style={{ cursor: 'pointer' }}
                    className="d-flex"
                    onClick={() => {
                      BrowserHistoryHelper.moveTo('/account/faq')
                    }}
                  >
                    <div style={{ width: '22px' }}>
                      <img src={faqImage} alt="link on faq page" />
                    </div>
                    <div
                      className="pl-3 menu-item-text"
                      style={{ paddingTop: '2px' }}
                    >
                      Вопросы и ответы
                    </div>
                  </div>
                </div>

                <div className="sidebar-menu-wrapper">
                  <div
                    style={{ cursor: 'pointer' }}
                    className="d-flex"
                    onClick={() => {
                      BrowserHistoryHelper.moveTo('/account/settings')
                    }}
                  >
                    <div style={{ width: '22px' }}>
                      <img src={settingsImage} alt="settings link" />
                    </div>
                    <div
                      className="pl-3 menu-item-text"
                      style={{ paddingTop: '2px' }}
                    >
                      Настройки
                    </div>
                  </div>
                </div>

                <div className="sidebar-menu-wrapper">
                  <div
                    style={{ cursor: 'pointer' }}
                    className="d-flex"
                    onClick={logOut}
                  >
                    <div style={{ width: '22px' }}>
                      <img src={exitImage} alt="exit from account" />
                    </div>
                    <div
                      className="pl-3 menu-item-text"
                      style={{ paddingTop: '2px' }}
                    >
                      Выйти
                    </div>
                  </div>
                </div>
              </div>
            </SwipeableDrawer>
          </>
        </div>
      ) : (
        <>
          {pageName === 'Контакты' && !isMobile ? (
            <div
              className="d-flex justify-content-between w-100 c-p"
              style={{ paddingRight: '26px' }}
            >
              <div className="page-title">{pageName}</div>
              <div
                className="desktop-menu-icon"
                onClick={() => setChosedModal('new-contact')}
              >
                <img src={addContact} alt="add new contact" />
              </div>
            </div>
          ) : (
            <>
              {pageName ? (
                <div className="page-title pt-3">{pageName}</div>
              ) : undefined}
            </>
          )}
        </>
      )}
    </>
  )
}

export default Menu
