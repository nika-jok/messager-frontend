const ACTION_SET_USER = 'ACTION_SET_USER';
const ACTION_SET_USER_ONLINE_STATUS = 'ACTION_SET_USER_ONLINE_STATUS';
const ACTION_SET_USER_OFFLINE_STATUS = 'ACTION_SET_USER_OFFLINE_STATUS';

const initialState = {
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  phone: '',
  about: '',
  avatar: '',
  contact: null,
  isOnline: false,
  lastOnline: '',
  displayedFirstName: '',
  displayedLastName: '',
  inBan: false,
  isBanned: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_SET_USER:
    return {
      ...state,
      ...action.payload,
    };
  case ACTION_SET_USER_ONLINE_STATUS:
    return {
      ...state,
      isOnline: action.payload,
    };
  case ACTION_SET_USER_OFFLINE_STATUS:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};
