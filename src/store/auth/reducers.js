const ACTION_SET_EMAIL = 'ACTION_SET_EMAIL';
const ACTION_SET_CODE = 'ACTION_SET_CODE';
const ACTION_SET_TOKEN = 'ACTION_SET_TOKEN';
const ACTION_SET_ID = 'ACTION_SET_ID';

const initialState = {
  email: '',
  code: '',
  token: '',
  id: null
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_SET_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case ACTION_SET_ID:
    return {
      ...state,
      id: action.payload,
    }; 
  case ACTION_SET_CODE:
    return {
      ...state,
      code: action.payload,
    };
  case ACTION_SET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};
