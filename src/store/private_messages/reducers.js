const ACTION_SET_PRIVATE_MESSAGES_LIST = 'ACTION_SET_PRIVATE_MESSAGES_LIST'
const ACTION_PUSH_PRIVATE_MESSAGES_LIST = 'ACTION_PUSH_PRIVATE_MESSAGES_LIST'
const ACTION_READ_PRIVATE_MESSAGES_LIST = 'ACTION_READ_PRIVATE_MESSAGES_LIST'

const initialState = {
  list: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SET_PRIVATE_MESSAGES_LIST:
      return {
        ...state,
        list: action.payload,
      }
    case ACTION_PUSH_PRIVATE_MESSAGES_LIST:
      return {
        ...state,
        list: [...state.list, action.payload],
      }

    case ACTION_READ_PRIVATE_MESSAGES_LIST:
      return {
        ...state,
        list: state.list.map((el) => {
          el.isRead = true
          return el
        }),
      }
    default:
      return state
  }
}
