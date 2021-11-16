/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';

import {
  setSearchedUserList,
} from '../../store/users/actions';

import SearchUsers from './SearchUsers';


function SearchUsersContainer(props) {
  const {
    setSearchedUserList,
    users,
  } = props;

  return <SearchUsers
    users={users}
    setSearchedUserList={setSearchedUserList}
  />;
}

const putStateToProps = state => ({
  users: state.users.list,
});

const putActionsToProps = {
  setSearchedUserList,
};

export default connect(putStateToProps, putActionsToProps)(SearchUsersContainer);
