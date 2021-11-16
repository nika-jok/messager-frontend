import React, { useState, useEffect, useRef } from "react";
import { Redirect, Link } from "react-router-dom";
import ApiHelper from "../../helpers/api/bio/me";
import PageName from "../Helpers/PageName";
import Back from "../Navigation/Back";
import Menu from "../Menu/Menu";
import BrowserHistoryHelper from "../../utils/BrowserHistoryRouter";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 300,
    },
  },
  name: {
    fontWeight: "bold",
  },
  confirm: {
    position: "fixed",
    bottom: 15 /* Положение от нижнего края */,
    left: 280 /* Положение от правого края */,
    // line-height: 1px;
  },
}));
function Me(props) {
  const classes = useStyles();

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
  const [message, setMessage] = useState({
    username: false,
    phone: false,
  });
  const [successMessage, setSuccessMessage] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [localAvatar, setLocalAvatar] = useState("");
  const photo = useRef(null);

  const [isRedirect, setRedirect] = useState(false);
  const api = new ApiHelper();

  useEffect(() => {
    (async () => {
      setLoading(true);

      const data = await api.getMe(token);
      if (data.status !== 200) {
        return setRedirect(true);
      }

      const {
        email,
        username,
        firstName,
        lastName,
        phone,
        about,
        avatar,
      } = data.data.bio;

      setLocalAvatar(await api.getAvatar(avatar));
      setEmail(email);
      setUsername(username);
      setFirstname(firstName);
      setLastname(lastName);
      setPhone(phone);
      setAbout(about);
      setAvatar(avatar);
      setLoading(false);
      return;
    })();
  }, []);

  const uploadPhoto = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", photo.current.files[0]);
    const result = await api.changeAvatar(formData);
    if (result.status === 200) {
      setLocalAvatar(await api.getAvatar(result.data.bio.avatar));
    }
    return setMessage({});
  };

  const updateFullBio = async (e) => {
    e.preventDefault();
    setMessage("");
    const data = await api.updateFullBio({
      firstName,
      lastName,
      phone,
      username,
      about,
    });
    setMessage({
      username: data.data.includes("username"),
      phone: data.data.includes("phone"),
    });
    if (!data.data.includes("username") && !data.data.includes("phone")) {
      setSuccessMessage(true);
    }
    return;
  };
  const displayName = () => {
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName && !lastName) return firstName;
    if (!firstName && lastName) return lastName;
    if (username) return username;
    return email;
  };

 

  return (
    <>
      <Menu />
      <Back callback={() => BrowserHistoryHelper.goBack()} />

      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <hr />
          <h3>Account</h3>
          <p>
            <label>Your photo: </label>
            <img alt="Avatar" src={localAvatar} width="200" height="200" />
            <br />
            <input
              type="file"
              ref={photo}
              accept="image/*"
              id="contained-button-file"
              multiple
            />
            <button onClick={uploadPhoto}>Upload photo</button>
          </p>
          <p className={classes.name}>{displayName()}</p>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="firstName"
                label="Имя"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="lastName"
                label="Фамилия"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <TextField
                error={!!message.username}
                id="filled-error-helper-text"
                label="Имя пользователя"
                helperText={!!message.username && "Имя пользователя уже занято"}
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <TextField
                disabled
                id="filled-error-helper-text"
                label="Электронная почта"
                variant="outlined"
                value={email}
              />
            </div>
            <div>
              <TextField
                error={!!message.phone}
                id="filled-error-helper-text"
                label="Номер телефона"
                helperText={message.phone && "Номер телефона уже используется"}
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="filled-error-helper-text"
                label="О себе"
                variant="outlined"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
          </form>
          {successMessage ? <div>Успешно обновлено</div> : null}
          <button className={classes.confirm} onClick={updateFullBio}>
            Update
          </button>
          <br />
          <br />
        </>
      )}
    </>
  );
}

export default Me;
