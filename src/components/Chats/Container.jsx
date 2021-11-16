/* eslint-disable no-unused-vars */
import { connect } from 'react-redux'

import Chats from './Chats'

import {
  setChatsList,
  pushChatsList,
  readChatsList,
  readForeignChatsList,
  setUserOnlineStatus,
  setUserOfflineStatus,
} from '../../store/chats_list/actions'

function ChatsContainer(props) {
  const {
    setChatsList,
    pushChatsList,
    list,
    readChatsList,
    readForeignChatsList,
    setId,
    id,
    setUserOnlineStatus,
    setUserOfflineStatus,
    isMobile,
  } = props
  return (
    <Chats
      setChatsList={setChatsList}
      pushChatsList={pushChatsList}
      list={list}
      isMobile={isMobile}
      readChatsList={readChatsList}
      setId={setId}
      readForeignChatsList={readForeignChatsList}
      history={props.history}
      setUserOnlineStatus={setUserOnlineStatus}
      setUserOfflineStatus={setUserOfflineStatus}
    />
  )
}

const putStateToProps = (state) => ({
  list: state.chatsList.list,
})

const putActionsToProps = {
  setChatsList,
  pushChatsList,
  readChatsList,
  readForeignChatsList,
  setUserOnlineStatus,
  setUserOfflineStatus,
}

export default connect(putStateToProps, putActionsToProps)(ChatsContainer)
