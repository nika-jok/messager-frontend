const ACTION_SET_CHATS_LIST = 'ACTION_SET_CHATS_LIST'
const ACTION_PUSH_CHATS_LIST = 'ACTION_PUSH_CHATS_LIST'
const ACTION_READ_CHATS_LIST = 'ACTION_READ_CHATS_LIST'
const ACTION_READ_FOREIGN_LIST = 'ACTION_READ_FOREIGN_LIST'
const ACTION_SET_ONLINE_STATUS = 'ACTION_SET_ONLINE_STATUS'

const initialState = {
  list: [],
}

const push = (state, action) => {
  const filtered = state.list.filter(
    (el) => +el.chatId !== +action.payload.chatId
  )
  if (filtered.length === state.list.length) {
    return [action.payload, ...state.list]
  }
  action.payload.count = action.payload.count ? +action.payload.count++ : 1

  return [action.payload, ...filtered]
}

const read = (state, action) => {
  return [
    ...state.list.map((el) => {
      if (el.id === action.payload.id) {
        el.count = 0
        return el
      }
      return el
    }),
  ]
}

const setOnlineStatus = (state, action) => {
  return [
    ...state.list.map((el) => {
      if (el.user1.id === action.payload.id) {
        el.user1.isOnline = action.payload.isOnline
        return el
      }
      if (el?.user2?.id === action?.payload?.id) {
        el.user2.isOnline = action.payload.isOnline
        return el
      }
      return el
    }),
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SET_CHATS_LIST:
      return {
        ...state,
        list: action.payload,
      }
    case ACTION_READ_FOREIGN_LIST:
      return {
        ...state,
        list: [
          ...state.list.map((el) => {
            if (el.chatId === action.payload.chatId) el.isRead = true
            return el
          }),
        ],
      }
    case ACTION_PUSH_CHATS_LIST:
      return {
        ...state,
        list: push(state, action),
      }
    case ACTION_READ_CHATS_LIST:
      return {
        ...state,
        list: read(state, action),
      }
    case ACTION_SET_ONLINE_STATUS:
      return {
        ...state,
        list: setOnlineStatus(state, action),
      }

    default:
      return state
  }
}
