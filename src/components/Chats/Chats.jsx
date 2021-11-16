import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

import Chat from './Chat'
import ApiHelperMe from '../../helpers/api/bio/me'
import ApiHelperMessages from '../../helpers/api/private_messages'
import BrowserHistoryRouter from '../../utils/BrowserHistoryRouter'
import socket from '../../helpers/socket/'
import Menu from '../Menu/Menu'
import { fade, makeStyles } from '@material-ui/core/styles'
import ApiHelper from '../../helpers/api/contacts'
import DisplaySearch from './DisplaySearch'
import LoadingComponent from '../../utils/LoadingComponent'
import InfiniteWaypoint from '../InfiniteWayPoint'
import userIcon from '../../assets/img/channels/add-user-icon.svg'
import addContactIcon from '../../assets/img/channels/add-contact.svg'
import { DIALOGS_COUNT_OF_UPLOADING_CHATS } from '../../constants'
import SearchInput from '../SearchInput'

const Me = (props) => {
  const {
    readChatsList,
    readForeignChatsList,
    setUserOnlineStatus,
    setUserOfflineStatus,
    isMobile,
    setChatsList,
    list,
    pushChatsList,
  } = props

  const [userId, setId] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [search, setSearch] = useState('')
  const [searchedContactList, setSearchedContactList] = useState([])
  const [searchedGlobalList, setSearchedGlobalList] = useState([])

  const [isAlreadyHas, setAlreadyHas] = useState(false)
  const apiContacts = new ApiHelper()
  const apiMessages = new ApiHelperMessages()
  const apiMe = new ApiHelperMe()
  const [totalPages, setTotalPages] = useState()
  const [page, setPage] = useState(2)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const data = await apiMessages.getChats(
          1,
          DIALOGS_COUNT_OF_UPLOADING_CHATS
        )
        const { id } = (await apiMe.getMe()).data.bio
        setId(id)
        setChatsList(data?.data?.list?.rows)
        setTotalPages(
          Math.round(data?.data?.list?.total / DIALOGS_COUNT_OF_UPLOADING_CHATS)
        )
        setLoading(false)
      } catch (e) {
        console.log(e)
      }

      return
    })()
  }, [])

  const loadMore = async () => {
    // if (totalPages > page) {
    //   const chats = await apiMessages.getChats(
    //     page,
    //     DIALOGS_COUNT_OF_UPLOADING_CHATS
    //   )
    //   if (chats) {
    //     setPage((prev) => prev + 1)
    //     setChatsList((prev) => [...prev, ...chats?.data?.list?.rows])
    //   }
    // }
  }

  const [debouncedCallback] = useDebouncedCallback(async (value) => {
    if (value[0] === '@') {
      const slicedUsername = value.slice(1)
      if (!slicedUsername) return
      const data = await apiContacts.getGlobalUsersUsername(slicedUsername)
      setSearchedContactList(data?.data?.bio?.contacts)
      setSearchedGlobalList(data?.data?.bio?.global)
      setAlreadyHas(true)
    } else {
      if (!value) return
      const data = await apiContacts.getGlobalUsersName(value)
      setSearchedContactList(data?.data?.bio?.contacts)
      setSearchedGlobalList(data?.data?.bio?.global)
      setAlreadyHas(true)
    }
  }, 100)

  const changeInput = async (e) => {
    setAlreadyHas(false)
    setSearch(e.target.value)
    debouncedCallback(e.target.value)
  }

  useEffect(() => {
    socket.getSocket().on('private_message', (data) => {
      return pushChatsList(data)
    })
    socket.getSocket().on('private_message_read', (data) => {
      if (+data.id === +userId) {
        readChatsList(data) //прочитал с другой вкладки
      } else {
        readForeignChatsList(data) //получатель прочитал сообщение
      }
    })
    socket.getSocket().on('online', (data) => {
      const { userId: onlineUserId } = data
      if (+onlineUserId) {
        return setUserOnlineStatus(onlineUserId)
      }
    })
    socket.getSocket().on('offline', (data) => {
      const { userId: onlineUserId } = data
      if (+onlineUserId) {
        return setUserOfflineStatus(onlineUserId)
      }
    })
    return () => {
      socket.getSocket().off('private_message')
      socket.getSocket().off('private_message_read')
      socket.getSocket().off('online')
      socket.getSocket().off('offline')
    }
  }, [userId])

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: redirect,
        }}
      />
    )
  }
  return (
    <div className="w-100 h-100">
      <Menu />
      <div className="search-input-wrap">
        <SearchInput placeholder="Поиск людей" onChange={changeInput} />
      </div>

      {isLoading ? (
        <div className="row justify-content-center pt-4">
          <LoadingComponent customColor="#50BCFF" />
        </div>
      ) : (
        <div id="user-messages-block" className="messages-scrollbar">
          {search && isAlreadyHas ? (
            (searchedContactList && searchedContactList.length) ||
            (searchedGlobalList && searchedGlobalList.length) ? (
              <div>
                <DisplaySearch
                  global={searchedGlobalList}
                  contacts={searchedContactList}
                  history={props.history}
                  isMobile={isMobile}
                />
              </div>
            ) : (
              <div className="text-center text-gray pt-3">
                Ничего не найдено
              </div>
            )
          ) : list && list.length ? (
            <div>
              {list && list.length >= 1
                ? list.map((chat) => (
                    <Chat
                      key={`dialog_with_${chat.chatId}`}
                      chat={chat}
                      id={userId}
                      setRedirect={setRedirect}
                      history={props.history}
                    />
                  ))
                : undefined}
            </div>
          ) : (
            <>
              <div className="text-gray text-center pt-4">
                Здесь будут показаны Ваши чаты
              </div>

              <div
                className="d-flex justify-content-center pt-3"
                onClick={() => {
                  if (isMobile) {
                    BrowserHistoryRouter.moveTo('/contacts/new_contact')
                  }
                }}
              >
                <div>
                  <img src={userIcon} alt="user" />
                </div>
                <div className="pl-2 c-p">Новый контакт</div>
              </div>
            </>
          )}

          {(searchedContactList?.length || list?.length) &&
          totalPages > page ? (
            <InfiniteWaypoint
              content={searchedContactList ? searchedContactList : list}
              totalPages={totalPages}
              currentPage={page}
              onEnter={loadMore}
              direction={'bottom'}
            />
          ) : undefined}
        </div>
      )}

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
    </div>
  )
}

export default Me
