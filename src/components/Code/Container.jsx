/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';

import {
  setCode,
  setToken,
} from '../../store/auth/actions';
import Storage from '../../helpers/storage';

import Code from './Code';
const storageEmail = () => Storage.get('email');

function CodeContainer(props) {
  const {
    setCode,
    setToken,
    code,
    email,
  } = props;

  return <Code
    setCode={setCode}
    setToken={setToken}
    code={code}
    email={email}
    storageEmail={storageEmail}
    history={props.history}
  />;
}

const putStateToProps = state => ({
  code: state.auth.code,
  email: state.auth.email,
  token: state.auth.token,
});

const putActionsToProps = {
  setCode,
  setToken,
};

export default connect(putStateToProps, putActionsToProps)(CodeContainer);
