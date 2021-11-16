import { useEffect, useState } from 'react'
import NotificationsApi from '../../../helpers/api/notifications'
import NotificationItem from './NotificationItem'
import styled from 'styled-components'
import { NOTIFICATIONS_COUNT_OF_UPLOADING } from '../../../constants'
import InfiniteWaypoint from '../../../components/InfiniteWayPoint'
import Menu from '../../../components/Menu/Menu'
import BrowserHistoryRouter from '../../../utils/BrowserHistoryRouter'
import addContactIcon from '../../../assets/img/channels/add-contact.svg'

const NotificationWrap = styled.div`
  .notifications-list {
    padding: 0 18px;
  }
`

const NotificationComponent = ({ isMobile }): JSX.Element => {
  const [notifications, setNotifications] = useState([])
  const [totalPages, setTotalItems] = useState()
  const [page, setPage] = useState(2)
  //@ts-ignore
  useEffect(async () => {
    const result = await NotificationsApi.getNotifications(
      1,
      NOTIFICATIONS_COUNT_OF_UPLOADING
    )
    if (result) {
      setNotifications(result?.data)
      setTotalItems(
        Math.floor(Number(result?.count) / NOTIFICATIONS_COUNT_OF_UPLOADING)
      )
    }
  }, [])

  const loadMore = async () => {
    if (totalPages > page) {
      const notifications = await NotificationsApi.getNotifications(
        1,
        NOTIFICATIONS_COUNT_OF_UPLOADING
      )
      if (notifications) {
        setPage((prev) => prev + 1)
        setNotifications((prev) => [...prev, ...notifications.data])
      }
    }
  }

  return (
    <NotificationWrap style={{ paddingLeft: isMobile ? '' : '' }}>
      <Menu />
      {isMobile ? undefined : (
        <div className="page-title scroll-padding">Уведомления</div>
      )}
      <div id="user-messages-block" className="messages-scrollbar">
        <div className="notifications-list">
          {notifications?.length ? (
            notifications?.map((notification, i) => {
              return (
                <NotificationItem
                  key={`notification_item_${i}`}
                  notification={notification}
                />
              )
            })
          ) : (
            <div className="row justify-content-center pt-3 text-gray">
              Здесь будут показаны Ваши уведомления
            </div>
          )}

          {notifications?.length && totalPages >= page ? (
            <InfiniteWaypoint
              content={notifications}
              totalPages={totalPages}
              currentPage={page}
              onEnter={loadMore}
              direction={'bottom'}
            />
          ) : undefined}
        </div>
      </div>

      <div
        className="centre-to-right-bottom"
        onClick={() => {
          BrowserHistoryRouter.moveTo('/account/new-message')
        }}
      >
        <div className="text-right">
          <img className="c-p" src={addContactIcon} alt="add message" />
        </div>
      </div>
    </NotificationWrap>
  )
}

export default NotificationComponent
