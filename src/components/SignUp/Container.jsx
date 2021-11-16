/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';

import {
  setEmail,
} from '../../store/auth/actions';
import Storage from '../../helpers/storage';

import SignUp from './SignUp';

const setStorageEmail = email => Storage.set('email', email);

function SignUpContainer(props) {
  const {
    setEmail,
    email,
  } = props;

  return <SignUp
    setEmail={setEmail}
    email={email}
    setStorageEmail={setStorageEmail}
  />;
}

const putStateToProps = state => ({
  email: state.auth.email,
});

const putActionsToProps = {
  setEmail,
};

export default connect(putStateToProps, putActionsToProps)(SignUpContainer);
