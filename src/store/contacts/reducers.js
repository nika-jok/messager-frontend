const ACTION_SET_CONTACTS = 'ACTION_SET_CONTACTS';
const ACTION_SET_ADD_CONTACT = 'ACTION_SET_ADD_CONTACT';
const ACTION_SET_SEARCHED_CONTACTS_LIST = 'ACTION_SET_SEARCHED_CONTACTS_LIST';

const initialState = {
  contacts: [],
  list: [],
  files: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_SET_CONTACTS:
    return {
      ...state,
      contacts: action.payload,
    };
  case ACTION_SET_ADD_CONTACT:
    return {
      ...state,
      contacts: [...state.contacts, action.payload],
    };

  case ACTION_SET_SEARCHED_CONTACTS_LIST:
    return {
      ...state,
      list: action.payload,
    };
  default:
    return state;
  }
};
