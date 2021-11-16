const ACTION_SET_EMAIL = 'ACTION_SET_EMAIL';
const ACTION_SET_USERNAME = 'ACTION_SET_USERNAME';
const ACTION_SET_FIRSTNAME = 'ACTION_SET_FIRSTNAME';
const ACTION_SET_LASTNAME = 'ACTION_SET_LASTNAME';
const ACTION_SET_PHONE = 'ACTION_SET_PHONE';
const ACTION_SET_ABOUT = 'ACTION_SET_ABOUT';
const ACTION_SET_AVATAR = 'ACTION_SET_AVATAR';

const initialState = {
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  phone: '',
  about: '',
  avatar: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_SET_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case ACTION_SET_USERNAME:
    return {
      ...state,
      username: action.payload,
    };
  case ACTION_SET_FIRSTNAME:
    return {
      ...state,
      firstName: action.payload,
    };
  case ACTION_SET_LASTNAME:
    return {
      ...state,
      lastName: action.payload,
    };
  case ACTION_SET_PHONE:
    return {
      ...state,
      phone: action.payload,
    };
  case ACTION_SET_ABOUT:
    return {
      ...state,
      about: action.payload,
    };
  case ACTION_SET_AVATAR:
    return {
      ...state,
      avatar: action.payload,
    };
  default:
    return state;
  }
};
