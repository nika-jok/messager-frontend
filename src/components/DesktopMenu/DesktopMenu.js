import { useRef, useState, useEffect } from 'react'
import BrowserHistoryRouter from '../../utils/BrowserHistoryRouter'
import Popup from 'reactjs-popup'
import logoImage from '../../assets/img/menu/logo.svg'
import addContactIcon from '../../assets/img/channels/add-contact.svg'
import { APPLICATION_SERVER } from '../../constants'
import emptyImage from '../../assets/img/channels/upload-image.svg'
import exitImage from '../../assets/img/menu/exit.svg'
import faqImage from '../../assets/img/menu/faq-icon.svg'
import StorageHelper from '../../utils/StorageHelper'

const DesktopMenu = ({
  setChannelNameFromLink,
  setLastOpened,
  setChosedModal,
  setPageTitle,
  user,
  chosedModal,
  goBack,
}) => {
  useEffect(() => {
    const pathName = BrowserHistoryRouter.getHistory().location.pathname
    if (pathName?.includes('/messages/private')) {
      setLastOpened('dialogs')
      setChosedModal('chats')
    }

    if (pathName?.includes('/account/channels')) {
      setLastOpened('channels')
      setChosedModal('channels')
    }

    // if (pathName === '/account/settings') {
    //   setPageTitle('Настройки')
    // }

    // if (pathName === '/account/contacts') {
    //   setPageTitle('Контакты')
    // }

    // if (pathName === '/contacts/new_contact') {
    //   setPageTitle('Новый контакт')
    // }

    // if (pathName === '/account/notifications') {
    //   setPageTitle('Уведомления')
    // }

    // if (pathName === '/account/channels') {
    //   setPageTitle('Каналы')
    // }

    if (
      pathName !== '/' &&
      !pathName.slice(1, pathName?.length).includes('/')
    ) {
      setChannelNameFromLink(pathName.slice(1))
      setLastOpened('channels')
      setChosedModal('channels')
    }
  }, [])

  const logout = (e) => {
    e.preventDefault()
    StorageHelper.removeUserData()
    BrowserHistoryRouter.moveTo('/')
    window.location.reload()
  }

  const popupRef = useRef()
  const popupRefAvatar = useRef()
  const [isShowMoreMenuItems, setIsShowMoreMenuItems] = useState(false)

  return (
    <div className="pl-3 pt-2" style={{ paddingRight: '16px' }}>
      <div>
        <img className="c-p" src={logoImage} alt="logo" />
      </div>

      <div
        className="icon-hover mt-4"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          BrowserHistoryRouter.replaceCurrectUrlInHistory('')
          setChosedModal('chats')
          setLastOpened('dialogs')
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
            stroke={chosedModal === 'chats' ? '#50BCFF' : 'black'}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-opacity={chosedModal === 'chats' ? '0.9' : '1'}
          />
        </svg>
      </div>
      <div
        className="icon-hover mt-4"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          BrowserHistoryRouter.replaceCurrectUrlInHistory('')
          setLastOpened('channels')
          setChosedModal('channels')
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 11C6.38695 11 8.67613 11.9482 10.364 13.636C12.0518 15.3239 13 17.6131 13 20"
            stroke={chosedModal === 'channels' ? '#5BC0FF' : 'black'}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-opacity={chosedModal === 'channels' ? '0.9' : '1'}
          />
          <path
            d="M4 4C8.24346 4 12.3131 5.68571 15.3137 8.68629C18.3143 11.6869 20 15.7565 20 20"
            stroke={chosedModal === 'channels' ? '#5BC0FF' : 'black'}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-opacity={chosedModal === 'channels' ? '0.9' : '1'}
          />
          <path
            d="M5 20C5.55228 20 6 19.5523 6 19C6 18.4477 5.55228 18 5 18C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20Z"
            stroke={chosedModal === 'channels' ? '#50BCFF' : 'black'}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-opacity={chosedModal === 'channels' ? '0.9' : '1'}
          />
        </svg>
      </div>
      <div
        className="icon-hover mt-4"
        onClick={() => {
          BrowserHistoryRouter.replaceCurrectUrlInHistory('')
          setChosedModal('contacts')
        }}
        style={{ cursor: 'pointer' }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 18.7847V16.7847C17 15.7238 16.5786 14.7064 15.8284 13.9562C15.0783 13.2061 14.0609 12.7847 13 12.7847H5C3.93913 12.7847 2.92172 13.2061 2.17157 13.9562C1.42143 14.7064 1 15.7238 1 16.7847V18.7847"
            stroke={chosedModal === 'contacts' ? '#50BCFF' : 'black'}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-opacity={chosedModal === 'contacts' ? '0.9' : '1'}
          />
          <path
            d="M9 8.78467C11.2091 8.78467 13 6.99381 13 4.78467C13 2.57553 11.2091 0.784668 9 0.784668C6.79086 0.784668 5 2.57553 5 4.78467C5 6.99381 6.79086 8.78467 9 8.78467Z"
            stroke={chosedModal === 'contacts' ? '#50BCFF' : 'black'}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-opacity={chosedModal === 'contacts' ? '0.9' : '1'}
          />
          <path
            d="M23 18.7846V16.7846C22.9993 15.8983 22.7044 15.0373 22.1614 14.3369C21.6184 13.6364 20.8581 13.1361 20 12.9146"
            stroke={chosedModal === 'contacts' ? '#50BCFF' : 'black'}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-opacity={chosedModal === 'contacts' ? '0.9' : '1'}
          />
          <path
            d="M16 0.914551C16.8604 1.13485 17.623 1.63525 18.1676 2.33686C18.7122 3.03847 19.0078 3.90138 19.0078 4.78955C19.0078 5.67772 18.7122 6.54063 18.1676 7.24224C17.623 7.94385 16.8604 8.44425 16 8.66455"
            stroke={chosedModal === 'contacts' ? '#50BCFF' : 'black'}
            stroke-opacity={chosedModal === 'contacts' ? '0.9' : '1'}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div
        className="icon-hover mt-4"
        onClick={() => {
          setChosedModal('notification-settings')
          BrowserHistoryRouter.replaceCurrectUrlInHistory('')
        }}
        style={{ cursor: 'pointer' }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
            stroke={
              chosedModal === 'notification-settings' ? '#50BCFF' : 'black'
            }
            stroke-opacity={
              chosedModal === 'notification-settings' ? '0.9' : '1'
            }
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6981 21.5547 10.4458 21.3031 10.27 21"
            stroke={
              chosedModal === 'notification-settings' ? '#50BCFF' : 'black'
            }
            stroke-opacity={
              chosedModal === 'notification-settings' ? '0.9' : '1'
            }
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div
        className="icon-hover mt-4"
        onClick={() => {
          setChosedModal('payments')
          BrowserHistoryRouter.replaceCurrectUrlInHistory('')
        }}
        style={{ cursor: 'pointer' }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
            stroke={chosedModal === 'payments' ? '#50BCFF' : 'black'}
            stroke-opacity={chosedModal === 'payments' ? '0.9' : '1'}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1 10H23"
            stroke={chosedModal === 'payments' ? '#50BCFF' : 'black'}
            stroke-opacity={chosedModal === 'payments' ? '0.9' : '1'}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div
        className="icon-hover mt-4"
        onClick={() => {
          setChosedModal('settings')
          BrowserHistoryRouter.replaceCurrectUrlInHistory('')
        }}
        style={{ cursor: 'pointer' }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke={chosedModal === 'settings' ? '#50BCFF' : 'black'}
            stroke-opacity={chosedModal === 'settings' ? '1' : '0.9'}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z"
            stroke={chosedModal === 'settings' ? '#50BCFF' : 'black'}
            stroke-opacity={chosedModal === 'settings' ? '1' : '0.9'}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <Popup
        open={isShowMoreMenuItems}
        onOpen={() => setIsShowMoreMenuItems(!isShowMoreMenuItems)}
        position="right"
        ref={popupRef}
        trigger={
          <div className="icon-hover mt-4" style={{ cursor: 'pointer' }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z"
                stroke="black"
                stroke-opacity="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 13.5C19.8284 13.5 20.5 12.8284 20.5 12C20.5 11.1716 19.8284 10.5 19 10.5C18.1716 10.5 17.5 11.1716 17.5 12C17.5 12.8284 18.1716 13.5 19 13.5Z"
                stroke="black"
                stroke-opacity="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 13.5C5.82843 13.5 6.5 12.8284 6.5 12C6.5 11.1716 5.82843 10.5 5 10.5C4.17157 10.5 3.5 11.1716 3.5 12C3.5 12.8284 4.17157 13.5 5 13.5Z"
                stroke="black"
                stroke-opacity="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        }
      >
        <div className="popup-wrap">
          <div
            className="d-flex"
            onClick={() => {
              setIsShowMoreMenuItems(!isShowMoreMenuItems)
              setChosedModal('admin')
              BrowserHistoryRouter.replaceCurrectUrlInHistory('')
            }}
          >
            <div style={{ width: '26px' }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                  stroke="black"
                  stroke-opacity="0.9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
                  stroke="black"
                  stroke-opacity="0.9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <span className="pl-2">Администрирование</span>
          </div>

          <div
            onClick={() => {
              setChosedModal('faq')
              setIsShowMoreMenuItems(!isShowMoreMenuItems)
              BrowserHistoryRouter.replaceCurrectUrlInHistory('')
            }}
            className="d-flex pt-3"
          >
            <div style={{ width: '26px' }}>
              <img alt="faq" src={faqImage} />
            </div>
            <span className="pl-2">Вопросы и ответы</span>
          </div>
          <div
            className="d-flex pt-3"
            onClick={(e) => {
              setIsShowMoreMenuItems(!isShowMoreMenuItems)
              logout(e)
            }}
          >
            <div style={{ width: '26px' }}>
              <img src={exitImage} alt="exit" />
            </div>
            <span className="pl-2">Выйти</span>
          </div>
        </div>
      </Popup>

      <div
        className="mt-4 new-message-block"
        onClick={() => {
          setChosedModal('new-message')
          BrowserHistoryRouter.replaceCurrectUrlInHistory('')
        }}
      >
        <img className="c-p" src={addContactIcon} alt="add message" />
      </div>
      <div className="mt-4">
        <Popup
          position="right"
          ref={popupRefAvatar}
          trigger={
            <button className="icon-hover avatar">
              {user?.avatar ? (
                <img
                  width="42"
                  height="42"
                  src={`${APPLICATION_SERVER}/files/${user?.avatar}`}
                  alt="user avatar"
                  className="user-icon"
                />
              ) : (
                <img
                  width="42"
                  height="42"
                  src={emptyImage}
                  alt="user avatar"
                />
              )}
            </button>
          }
        >
          <div className="popup-wrap">
            <div className="d-flex">
              <div>
                {user?.avatar ? (
                  <img
                    width="48"
                    height="48"
                    src={`${APPLICATION_SERVER}/files/${user?.avatar}`}
                    alt="user avatar"
                    className="user-icon"
                  />
                ) : (
                  <img src={emptyImage} alt="user avatar" />
                )}
              </div>
              <span>{`${user?.firstName} ${user?.lastName}`}</span>
            </div>
            {user?.username ? (
              <span className="text-gray">@{user?.username}</span>
            ) : undefined}
            {user?.balance ? (
              <div>
                Мой баланс <b>{`$${user?.balance}`}</b>
              </div>
            ) : undefined}
          </div>
        </Popup>
      </div>
    </div>
  )
}

export default DesktopMenu
