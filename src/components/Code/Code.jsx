// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import ApiHelper from '../../helpers/api/auth/auth';
// import storage from '../../helpers/storage';

// import {
//   Redirect,
// } from 'react-router-dom';

// function Code(props) {
//   const {
//     setCode,
//     code,
//     email,
//     storageEmail,
//     setToken,
//   } = props;

//   const [message, setMessage] = useState('');
//   const [isRedirect, setRedirect] = useState(false);
//   const api = new ApiHelper();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const data = await api.setCode(email || storageEmail(), code);
//     if(data.status !== 201) return setMessage(data.message);
//     const { data: { token } } = data;
//     storage.set('token', token);
//     setToken(token);
//     setTimeout(() => {
//       return setRedirect(true);
//     }, 200);
//   };

//   if(isRedirect){
//     return <Redirect
//       to={{
//         pathname: '/settings'
//       }}
//     />;
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <label>
//             Code:
//           <input type="text" value={code} onChange={e => setCode(e.target.value)} />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//       {message ? <div>{message}</div> : null}
//     </>
//   );
// }

// export default Code;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ApiHelper from "../../helpers/api/auth/auth";
import storage from "../../helpers/storage";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Collapse,
  CssBaseline,
} from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import ArrowButton from "../Helpers/ArrowButton";
import { makeStyles } from "@material-ui/core/styles";
import BrowserHistoryHelper from "../../utils/BrowserHistoryRouter";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginTop: theme.spacing(1),
  },
  top: {
    marginBottom: 5,
  },
  bottom: {
    marginTop: 5,
  },
  button: {
    position: "fixed",
    right: 15,
    bottom: 15,
  },
}));
function SignUp(props) {
  const classes = useStyles();

  const { setCode, code, email, storageEmail, setToken } = props;

  const [message, setMessage] = useState("");
  const [isRedirect, setRedirect] = useState(false);
  const api = new ApiHelper();

  useEffect(() => {
    if (storage.get("token")) return BrowserHistoryHelper.moveTo("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await api.setCode(email || storageEmail(), code);
    if (data.status !== 201) return setMessage(data.message);
    const {
      data: { token },
    } = data;
    storage.set("token", token);
    setToken(token);
    setTimeout(() => {
      return window.location.reload();
    }, 200);
  };

  if (isRedirect) {
    return (
      <Redirect
        to={{
          pathname: isRedirect,
        }}
      />
    );
  }

  return (
    <Container component="div" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h3>Проверьте сообщения на почте</h3>
        <p className={classes.top}>
          Мы отправили код на Ваш адрес электронной почты
        </p>
        <p className={classes.bottom}>{email}</p>

        <div className={classes.paper}>
          <TextField
            id="standard-basic"
            label="Введите код"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="email"
            helperText={!!message && "Неверный код"}
            variant="outlined"
            fullWidth
          />
          <div className={classes.button}>
            <ArrowButton
              className={classes.button}
              callback={handleSubmit}
            ></ArrowButton>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SignUp;
