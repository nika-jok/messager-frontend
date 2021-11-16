const ACTION_SET_CHATS_LIST = 'ACTION_SET_CHATS_LIST';
const ACTION_PUSH_CHATS_LIST = 'ACTION_PUSH_CHATS_LIST';
const ACTION_READ_CHATS_LIST = 'ACTION_READ_CHATS_LIST';
const ACTION_READ_FOREIGN_LIST = 'ACTION_READ_FOREIGN_LIST';

const ACTION_SET_ONLINE_STATUS = 'ACTION_SET_ONLINE_STATUS';

export const setChatsList = (list) => ({
  type: ACTION_SET_CHATS_LIST,
  payload: list,
});

export const pushChatsList = (el) => ({
  type: ACTION_PUSH_CHATS_LIST,
  payload: el,
});

export const readChatsList = (el) => ({
  type: ACTION_READ_CHATS_LIST,
  payload: el,
});

export const readForeignChatsList = (el) => ({
  type: ACTION_READ_FOREIGN_LIST,
  payload: el,
});

export const setUserOnlineStatus = (id) => ({
  type: ACTION_SET_ONLINE_STATUS,
  payload: { id, isOnline: true },
});

export const setUserOfflineStatus = (id) => ({
  type: ACTION_SET_ONLINE_STATUS,
  payload: { id, isOnline: false },
});
