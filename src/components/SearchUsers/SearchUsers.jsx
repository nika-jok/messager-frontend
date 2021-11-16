import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Redirect, Link } from "react-router-dom";
import ApiHelper from "../../helpers/api/users/list";

function Me(props) {
  const { setSearchedUserList, users } = props;
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [isUsername, setIsUsername] = useState(false);
  const [isRedirect, setRedirect] = useState(false);

  const api = new ApiHelper();

  useEffect(() => {
    setSearchedUserList([]);
  }, []);

  const [debouncedCallback] = useDebouncedCallback(async (value) => {
    if (value[0] === "@") {
      setIsUsername(true);
      const slicedUsername = value.slice(1);
      const data = await api.getUsersByUsername(slicedUsername);
      setSearchedUserList(data.data);
    } else {
      setIsUsername(false);
      const data = await api.getUsersByEmail(value);
      setSearchedUserList(data.data);
    }
  }, 500);

  const changeInput = async (e) => {
    setSearch(e.target.value);
    debouncedCallback(e.target.value);
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
      <label>
        Search:
        <input onChange={changeInput} type="disabled" value={search} />
      </label>
      <br />
      <li>
        {users.length
          ? users.map((el) => {
              const { email, firstName, lastName, username, id } = el;
              return (
                <ul>
                  <label>{`${isUsername ? username : email} - ${
                    firstName || ""
                  } ${lastName || ""}`}</label>
                  <Link to={`users/${id}`}>Open</Link>
                  <br />
                </ul>
              );
            })
          : "Not found"}
      </li>
    </>
  );
}

export default Me;
