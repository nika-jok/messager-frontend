/* eslint-disable no-unused-vars */
import { connect } from "react-redux";

import {
  setContacts,
  addContact,
  setSearchedContactsList,
} from "../../store/contacts/actions";

import Contacts from "./Contacts";

function ContactsContainer(props) {
  const {
    setContacts,
    addContact,
    setSearchedContactsList,
    contacts,
    searchedList,
  } = props;

  return (
    <Contacts
      setContacts={setContacts}
      addContact={addContact}
      contacts={contacts}
      setSearchedContactsList={setSearchedContactsList}
      searchedList={searchedList}
      history={props.history}
    />
  );
}

const putStateToProps = (state) => ({
  contacts: state.contacts.contacts,
  searchedList: state.contacts.list,
});

const putActionsToProps = {
  setContacts,
  addContact,
  setSearchedContactsList,
};

export default connect(putStateToProps, putActionsToProps)(ContactsContainer);
