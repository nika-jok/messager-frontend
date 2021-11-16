/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react'

import { Redirect } from 'react-router-dom'
import socket from '../../helpers/socket/index'
import storage from '../../helpers/storage'
import ApiHelper from '../../helpers/api/bio/me'
import sendNotification from '../../helpers/notifications'
import StorageHelper from '../../utils/StorageHelper'
import { APPLICATION_SERVER } from '../../constants'

const notifications = storage.get('notifications')
if (notifications === null) storage.set('notifications', true)
const sound = storage.get('sound')
if (sound === null) storage.set('sound', true)

const api = new ApiHelper()
const Notifications = (props) => {
  const [redirect, setRedirect] = useState(null)

  useEffect(() => {
    socket?.getSocket().on('private_message', (data) => {
      console.log('data')
      console.log(data)
      console.log('data')
      return sendNotification(
        data.displayedName || data.firstName || data.email || 'New message!',
        {
          body: data.type === 'text' ? data.text : 'Message',
          dir: 'auto',
          icon: `${APPLICATION_SERVER}/files/${data?.attachment}`,
        },
        () => setRedirect(`/messages/private/${data.senderId}`)
      )
    })

    return () => {
      socket.getSocket().off('private_message')
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      if (StorageHelper.getUserData() && StorageHelper.getUserData().token) {
        const data = await api.getMe()
        if (data.status !== 200) return
      }
    })()
  }, [socket])

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: redirect,
        }}
      />
    )
  }

  return <></>
}

export default Notifications
