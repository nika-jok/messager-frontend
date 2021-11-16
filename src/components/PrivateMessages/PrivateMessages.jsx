import { useState, useEffect, useRef, useMemo } from 'react'
import './private-message.css'

import ApiHelperUser from '../../helpers/api/bio/users'
import ApiHelperMessages from '../../helpers/api/private_messages'
import socket from '../../helpers/socket'

import Loading from '../../utils/LoadingComponent'
import DateUtils from '../../utils/DateUtils'
import StorageHelper from '../../utils/StorageHelper'

import { DIALOGS_COUNT_OF_UPLOADING_MESSAGES } from '../../constants'
import PrivateMessagesHeader from '../PrivateMessagesHeader'
import MessagesList from '../MessagesList'
import PrivateMessageFooter from '../PrivateMessageFooter'

const PrivateMessages = (props) => {
  const {
    id,
    messages,
    setPrivateMessagesList,
    pushPrivateMessagesList,
    readPrivateMessagesList,
    setUserOnlineStatus,
    setUserOfflineOnlineStatus,
    shouldAutoFocus,
  } = props

  const [user, setUser] = useState()
  const [userId, setUserId] = useState()
  const [isShowMenuBar, setIsShowMenuBar] = useState(false)
  const [differentDateIds, setDifferentDateIds] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const apiUser = new ApiHelperUser()
  const apiMessages = new ApiHelperMessages()
  const [page, setPage] = useState(2)
  const divRef = useRef(null)
  const [file, setFile] = useState()
  const [totalPages, setTotalPages] = useState()
  const [isCleanInput, setIsClearInput] = useState(false)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const data = await apiUser.getUser(id)
      const userData = await apiUser.getUser(
        StorageHelper.getUserData().user_id
      )
      setUserId(userData && userData.data && userData.data.bio.id)

      const messagesData = await apiMessages.getInitialMessages(
        id,
        1,
        DIALOGS_COUNT_OF_UPLOADING_MESSAGES
      )
      const {
        email,
        username,
        firstName,
        lastName,
        phone,
        about,
        avatar,
        contact,
        isOnline,
        lastOnline,
        displayedFirstName,
        displayedLastName,
        inBan,
        isBanned,
      } = data.data.bio

      setUser({
        email,
        username,
        firstName,
        lastName,
        phone,
        about,
        avatar,
        contact,
        isOnline,
        lastOnline,
        displayedFirstName,
        displayedLastName,
        inBan,
        isBanned,
      })

      setPrivateMessagesList(
        messagesData.data.list.length ? messagesData.data.list.reverse() : []
      )
      console.log(messagesData?.data?.total)
      setTotalPages(
        Math.round(
          Number(messagesData?.data?.total) /
            DIALOGS_COUNT_OF_UPLOADING_MESSAGES
        )
      )

      if (messagesData?.data?.list) {
        setDifferentDateIds(
          DateUtils.getDifferentDates(messagesData?.data?.list)
        )
      }

      if (messagesData.data.list.length) {
        await apiMessages.readMessage(
          messagesData.data.list[messagesData.data.list.length - 1].id
        )
      }

      setLoading(false)

      if (divRef?.current)
        divRef.current.scrollTop = divRef?.current?.scrollHeight || 0

      return
    })()
  }, [])

  const loadMore = async () => {
    console.log(totalPages)
    console.log(page)
    if (totalPages >= page) {
      setIsLoadingMessages(true)
      const messagesData = await apiMessages.getInitialMessages(
        id,
        page,
        DIALOGS_COUNT_OF_UPLOADING_MESSAGES
      )
      console.log(messagesData)

      if (messagesData) {
        setPage((prev) => prev + 1)

        setPrivateMessagesList([
          ...messagesData?.data?.list.reverse(),
          ...messages,
        ])
      }

      setIsLoadingMessages(false)
    }
  }

  console.log(messages)

  useEffect(() => {
    socket.getSocket().on('private_message', (data) => {
      const { user1, user2, id: messageId } = data

      if (
        (+user1?.id === +id || +user2?.id === +id) &&
        window.location.pathname === `/messages/private/${id}`
      ) {
        apiMessages.readMessage(messageId)
        pushPrivateMessagesList(data)
        divRef.current.scrollTop = divRef.current.scrollHeight
        return
      }
    })
    socket.getSocket().on('private_message_read', (data) => {
      const { id: userId } = data
      if (+userId === +id) {
        return readPrivateMessagesList()
      }
    })
    socket.getSocket().on('online', (data) => {
      const { userId } = data

      if (+userId === +id) {
        return setUserOnlineStatus(true)
      }
    })
    socket.getSocket().on('offline', (data) => {
      const { userId, lastOnline } = data
      if (+userId === +id) {
        return setUserOfflineOnlineStatus(false, lastOnline)
      }
    })
    return () => {
      socket.getSocket().off('private_message')
      socket.getSocket().off('private_message_read')
      socket.getSocket().off('online')
      socket.getSocket().off('offline')
    }
  }, [])

  const deleteMessage = async (id) => {
    const data = await apiMessages.deleteMessage(id)
    if (data.status === 200) {
      setPrivateMessagesList(messages.filter((el) => el.id !== id))
    }
    return
  }

  const sendTextMessage = async (newMessage) => {
    await apiMessages.create('text', id, newMessage, file)
    setFile(null)
    setIsClearInput(!isCleanInput)

    document.querySelector(
      '.messages-wrapper-textarea .textarea'
    ).style.height = '34px'
    const messages = document.querySelector('.messages-scrollbar')
    const wHeight = window.innerHeight
    wHeight <= 575
      ? (messages.style.height = '94vh')
      : (messages.style.height = '90vh')

    if (divRef?.current) {
      return (divRef.current.scrollTop = divRef?.current?.scrollHeight || 0)
    }
  }

  const onChangeFile = async (selectedFfile, newMessage) => {
    setError('')
    if (selectedFfile.size > 25 * 1000 * 1000) {
      return setError('Допустимый размер файла 25MB')
    }

    await apiMessages.create('text', id, newMessage, selectedFfile)
  }

  useEffect(() => {
    setDifferentDateIds(DateUtils.getDifferentDates(messages))
  }, [messages])

  const name = useMemo(() => {
    if (user && user.displayedFirstName) {
      return (
        user.displayedFirstName +
        (user.displayedLastName ? ' ' + user.displayedLastName : '')
      )
    }
    if ((user && user.firstName) || (user && user.lastName)) {
      return `${user.firstName ? user.firstName : ''}${
        user.firstName && user.lastName ? ' ' : ''
      }${user.lastName ? user.lastName : ''}`
    }
    return user?.email
  }, [user])

  return (
    <div
      className="w-100 messages-wrapper-content"
      style={{
        background: isShowMenuBar ? 'rgba(0, 0, 0, 0.05) ' : '#ffffff',
        maxWidth: '488px',
        borderRight: '0.5px solid rgba(0, 0, 0, 0.05)',
        borderLeft: '0.5px solid rgba(0, 0, 0, 0.05)',
        height: '100vh',
        position: 'fixed',
      }}
    >
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {user?.lastOnline && id && name ? (
          <div
            className="messages-header"
            style={{
              position: 'fixed',
              background: 'white',
              zIndex: 2,
              width: '486px',
            }}
          >
            <div className="d-flex w-100">
              <PrivateMessagesHeader
                isMobile
                lastOnline={user?.lastOnline}
                id={id}
                isOnline={user?.isOnline}
                name={name}
                avatar={user?.avatar}
              />
            </div>
          </div>
        ) : undefined}

        <div>
          {isLoading && !messages?.length ? (
            <div className="d-flex justify-content-center pt-4 pb-4">
              <Loading />
            </div>
          ) : (
            <MessagesList
              isLoadingMessages={isLoadingMessages}
              totalPages={totalPages}
              page={page}
              divRef={divRef}
              setIsShowMenuBar={setIsShowMenuBar}
              name={name}
              isShowMenuBar={isShowMenuBar}
              deleteMessage={deleteMessage}
              username={user?.username}
              about={user?.about}
              messages={messages}
              loadMore={loadMore}
              differentDateIds={differentDateIds}
              setChosedModal={props.setChosedModal}
              setUserIdModal={props.setUserIdModal}
              isMobile={props.isMobile}
              avatar={user?.avatar}
              userId={userId}
            />
          )}
        </div>
        {!isShowMenuBar ? (
          <>
            <PrivateMessageFooter
              onChangeFile={onChangeFile}
              inBan={user?.inBan}
              isBanned={user?.isBanned}
              isCleanInput={isCleanInput}
              shouldAutoFocus={shouldAutoFocus}
              sendTextMessage={sendTextMessage}
              id={id}
            />
          </>
        ) : undefined}
      </div>
      )}
    </div>
  )
}

export default PrivateMessages
