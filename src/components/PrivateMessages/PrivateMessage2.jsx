/* eslint-disable no-irregular-whitespace */
import React from "react";

import ListItemText from "@material-ui/core/ListItemText";

import { APPLICATION_SERVER } from "../../constants";

function PrivateMessage(props) {
  const { userId, deleteMessage } = props;
  const {
    id,
    attachment,
    isRead,
    senderId,
    text,
    type,
    createdAt,
  } = props.message;

  const urlAttachment = `${APPLICATION_SERVER}/files/${attachment}`;

  return (
    <>
      {+senderId === +userId ? (
        <ListItemText></ListItemText>
      ) : (
        <ListItemText></ListItemText>
      )}
      <button onClick={() => deleteMessage(id)}>Delete</button>
    </>
  );
}

export default PrivateMessage;
