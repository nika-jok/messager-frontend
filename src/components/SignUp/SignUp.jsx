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

  const { setEmail, setStorageEmail, email } = props;

  const [message, setMessage] = useState("");
  const [isRedirect, setRedirect] = useState(null);

  const api = new ApiHelper();

  useEffect(() => {
    if (storage.get("token")) return setRedirect("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await api.signUp(email);
    if (data.status !== 200) return setMessage(data.message);
    setStorageEmail(email);
    return setRedirect("/code");
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
        <TextField
          id="standard-basic"
          label="Адрес электронной почты"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          helperText={!!message && "Неверный адрес электронной почты"}
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
    </Container>
  );
}

export default SignUp;
