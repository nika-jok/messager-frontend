/* eslint-disable no-unused-vars */
import { connect } from 'react-redux'
import PrivateMessages from './PrivateMessages'
import {
  setPrivateMessagesList,
  pushPrivateMessagesList,
  readPrivateMessagesList,
} from '../../store/private_messages/actions'
import {
  setUser,
  setUserOnlineStatus,
  setUserOfflineOnlineStatus,
} from '../../store/user_profile/actions'
import { useParams } from 'react-router-dom'

function PrivateMessagesContainer(props) {
  const { id } = useParams()
  const {
    setPrivateMessagesList,
    pushPrivateMessagesList,
    readPrivateMessagesList,
    messages,
    setUser,
    user,
    setUserOnlineStatus,
    setUserOfflineOnlineStatus,
  } = props

  return (
    <PrivateMessages
      id={id}
      setPrivateMessagesList={setPrivateMessagesList}
      pushPrivateMessagesList={pushPrivateMessagesList}
      readPrivateMessagesList={readPrivateMessagesList}
      messages={messages}
      isMobile
      history={props.history}
      setUser={setUser}
      user={user}
      shouldAutoFocus={false}
      setUserOnlineStatus={setUserOnlineStatus}
      setUserOfflineOnlineStatus={setUserOfflineOnlineStatus}
    />
  )
}

const putStateToProps = (state) => ({
  messages: state.privateMessages.list,
  user: state.userProfile,
})

const putActionsToProps = {
  setPrivateMessagesList,
  pushPrivateMessagesList,
  readPrivateMessagesList,
  setUser,
  setUserOnlineStatus,
  setUserOfflineOnlineStatus,
}

export default connect(
  putStateToProps,
  putActionsToProps
)(PrivateMessagesContainer)
