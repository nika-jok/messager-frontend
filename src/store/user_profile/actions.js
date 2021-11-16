const ACTION_SET_USER= 'ACTION_SET_USER';
const ACTION_SET_USER_ONLINE_STATUS = 'ACTION_SET_USER_ONLINE_STATUS';
const ACTION_SET_USER_OFFLINE_STATUS = 'ACTION_SET_USER_OFFLINE_STATUS';

export const setUser = (el) => ({
  type: ACTION_SET_USER,
  payload: el,
});

export const setUserOnlineStatus = (el) => ({
  type: ACTION_SET_USER_ONLINE_STATUS,
  payload: el,
});
export const setUserOfflineOnlineStatus = (isOnline, lastOnline) => ({
  type: ACTION_SET_USER_OFFLINE_STATUS,
  payload: { isOnline, lastOnline },
});
