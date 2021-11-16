/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';

import {
  setEmail,
  setUsername,
  setFirstname,
  setLastname,
  setPhone,
  setAbout,
  setAvatar,
} from '../../store/me/actions';

import Me from './Settings';

function MeContainer(props) {
  const {
    setEmail,
    setUsername,
    setFirstname,
    setLastname,
    setPhone,
    setAbout,
    setAvatar,

    email,
    username,
    firstName,
    lastName,
    phone,
    about,
    avatar,
    token,
  } = props;

  return (
    <Me
      setEmail={setEmail}
      setUsername={setUsername}
      setFirstname={setFirstname}
      setLastname={setLastname}
      setPhone={setPhone}
      setAbout={setAbout}
      setAvatar={setAvatar}

      email={email}
      username={username}
      firstName={firstName}
      lastName={lastName}
      phone={phone}
      about={about}
      avatar={avatar}
      token={token}
      history={props.history}

    />
  );
}

const putStateToProps = (state) => ({
  email: state.me.email,
  username: state.me.username,
  firstName: state.me.firstName,
  lastName: state.me.lastName,
  phone: state.me.phone,
  about: state.me.about,
  avatar: state.me.avatar,
  token: state.auth.token,
});

const putActionsToProps = {
  setEmail,
  setUsername,
  setFirstname,
  setLastname,
  setPhone,
  setAbout,
  setAvatar,
};

export default connect(putStateToProps, putActionsToProps)(MeContainer);
