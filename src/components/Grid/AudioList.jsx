import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import messageSentTime from "../../helpers/time/messageSent";
import { APPLICATION_SERVER } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "start",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 700,
    height: 450,
    border: 1,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function TitlebarGridList(props) {
  const classes = useStyles();
  const { audios } = props;
  return (
    <li>
      {audios.map((el, index) => {
        return (
          <ul>
            <audio src={APPLICATION_SERVER + "/files/" + el.path} controls />{" "}
            {messageSentTime(el.createdAt)}
          </ul>
        );
      })}
    </li>
  );
}
