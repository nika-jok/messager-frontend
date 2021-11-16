import { useState, useEffect } from 'react'
import styled from 'styled-components'
import userIcon from '../../assets/img/channels/add-user-icon.svg'
import Chat from '../Chats/Chat'
import ApiHelperMessages from '../../helpers/api/private_messages'
import BrowserHistoryRouter from '../../utils/BrowserHistoryRouter'
import { DIALOGS_COUNT_OF_UPLOADING_CHATS } from '../../constants'
import InfiniteWaypoint from '../InfiniteWayPoint'

const DesktopChatsListWrap = styled.div``

const DesktopChatsList = ({
  setLastOpened,
  history,
  id,
  setChosedId,
  chosedId,
  isMobile,
  setChosedModal,
}) => {
  const [initialChosedDialog, setInitialChosedDialog] = useState()
  const [chatsList, setChatsList] = useState([])
  const apiMessages = new ApiHelperMessages()
  const [page, setPage] = useState(2)
  const [totalPages, setTotalPages] = useState()
  useEffect(() => {
    if (
      BrowserHistoryRouter?.getHistory()?.location?.pathname?.includes(
        '/messages/private'
      )
    ) {
      return setChosedId(
        BrowserHistoryRouter.getHistory()?.location?.pathname?.slice(18)
      )
    }
  }, [chatsList])

  useEffect(() => {
    ;(async () => {
      const data = await apiMessages.getChats(
        1,
        DIALOGS_COUNT_OF_UPLOADING_CHATS
      )
      console.log(data?.data)
      setChatsList(data?.data?.list?.rows)
      console.log(data?.data?.list?.rows[0])
      setInitialChosedDialog(data?.data?.list?.rows[0]?.chatId)
      setTotalPages(
        Math.round(data?.data?.list?.total / DIALOGS_COUNT_OF_UPLOADING_CHATS)
      )
    })()
  }, [])

  // const readMessageInChats = (chatId) => {
  //   const changedChatsList = chatsList?.map((chat) =>
  //     chat.chatId === chatId ? Object.assign(chat, (chat.count = '')) : chat
  //   )
  //   setChatsList(changedChatsList)
  // }

  const loadMore = async () => {
    // if (totalPages >= page) {
    //   const chats = await apiMessages.getChats(
    //     page,
    //     DIALOGS_COUNT_OF_UPLOADING_CHATS
    //   )
    //   if (chats) {
    //     setPage((prev) => prev + 1)
    //     setChatsList((prev) => [...prev, ...chats.data?.list?.rows])
    //   }
    // }
  }

  return (
    <DesktopChatsListWrap
      id="user-messages-block"
      className="messages-scrollbar"
    >
      {chatsList?.length ? (
        chatsList?.map((chat) => {
          // const isChatYouself =
          //   StorageHelper.getUserData()?.user_id === chat?.user1.id &&
          //   StorageHelper.getUserData()?.user_id === chat?.user2.id
          const opponent = chat?.user1
          // Number(chosedId) === Number(chat?.user1?.id)
          //   ? isChatYouself
          //     ? chat?.user2
          //     : chat?.user1
          //   : undefined
          console.log(initialChosedDialog)
          return (
            <Chat
              key={`dialog_with_${chat?.chatId}`}
              chat={chat}
              isChosedDialog={
                (chosedId ? Number(chosedId) : initialChosedDialog) ===
                Number(chat?.chatId)
              }
              id={id}
              setChosedId={setChosedId}
              setLastOpened={setLastOpened}
              history={history}
            />
          )
        })
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
              } else {
                setChosedModal('new-contact')
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
      {chatsList?.length ? (
        <InfiniteWaypoint
          content={chatsList}
          totalPages={totalPages}
          currentPage={page}
          onEnter={loadMore}
          direction={'bottom'}
        />
      ) : undefined}
    </DesktopChatsListWrap>
  )
}

export default DesktopChatsList
