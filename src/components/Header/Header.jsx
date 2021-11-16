import { useState, useEffect, useRef } from "react";
import { Redirect, Link } from "react-router-dom";
import ApiHelper from "../../helpers/api/bio/me";
import storage from "../../helpers/storage";

function Me(props) {
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
  const [message, setMessage] = useState("");
  const [localAvatar, setLocalAvatar] = useState("");
  const photo = useRef(null);

  const [isRedirect, setRedirect] = useState(false);
  const api = new ApiHelper();

  useEffect(() => {
    (async () => {
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
      return;
    })();
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    storage.clear("token");
    storage.clear("adminToken");
    return setRedirect(true);
  };

  if (isRedirect) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <>
      <Link to="/account/settings">Profile</Link>
      <Link to="/me/contacts">Contacts</Link>
      <button onClick={logOut}>Logout</button>
    </>
  );
}

export default Me;
