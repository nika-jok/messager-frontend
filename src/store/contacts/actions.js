const ACTION_SET_CONTACTS = 'ACTION_SET_CONTACTS';
const ACTION_SET_ADD_CONTACT = 'ACTION_SET_ADD_CONTACT';
const ACTION_SET_SEARCHED_CONTACTS_LIST = 'ACTION_SET_SEARCHED_CONTACTS_LIST';

export const setContacts = (list) => ({
  type: ACTION_SET_CONTACTS,
  payload: list,
});
  
export const addContact = (contact) => ({
  type: ACTION_SET_ADD_CONTACT,
  payload: contact,
});
  
export const setSearchedContactsList = (list) => ({
  type: ACTION_SET_SEARCHED_CONTACTS_LIST,
  payload: list,
});

  