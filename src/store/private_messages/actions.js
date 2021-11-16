const ACTION_SET_PRIVATE_MESSAGES_LIST = 'ACTION_SET_PRIVATE_MESSAGES_LIST';
const ACTION_PUSH_PRIVATE_MESSAGES_LIST = 'ACTION_PUSH_PRIVATE_MESSAGES_LIST';
const ACTION_READ_PRIVATE_MESSAGES_LIST = 'ACTION_READ_PRIVATE_MESSAGES_LIST';

export const setPrivateMessagesList = (list) => ({
  type: ACTION_SET_PRIVATE_MESSAGES_LIST,
  payload: list,
});

export const pushPrivateMessagesList = (el) => ({
  type: ACTION_PUSH_PRIVATE_MESSAGES_LIST,
  payload: el,
});
export const readPrivateMessagesList = (el) => ({
  type: ACTION_READ_PRIVATE_MESSAGES_LIST,
  payload: el,
});
