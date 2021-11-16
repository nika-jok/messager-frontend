/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ApiHelper from '../../helpers/api/auth/auth';

import {
  Redirect,
  Link,
} from 'react-router-dom';

function SignUp(props) {
  const { 
    setEmail,
    setStorageEmail,
    email,
  } = props;

  const [message, setMessage] = useState('');
  const [isRedirect, setRedirect] = useState(false);

  const api = new ApiHelper();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await api.signIn(email);
    if(data.status !== 200) return setMessage(data.message);
    setStorageEmail(email);
    return setRedirect(true);
  };

  if(isRedirect){
    return <Redirect
      to={{
        pathname: '/code'
      }}
    />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
            Email:
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <input type="submit" value="SignIn" />
      </form>
      <div></div>
      <Link to='/signup'>Don't have an account?</Link>
      < br/>
      { message ? message : null }
    </>
  );
}

export default SignUp;