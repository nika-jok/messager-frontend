import React from "react";
import messageSentTime from "../../helpers/time/messageSent";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { APPLICATION_SERVER } from "../../constants";

const useStyles = makeStyles((theme) => ({
  myMsgContainer: {
    // maxWidth: 345,
    // right: 0,
    display: "flex",
    flexDirection: "row-reverse",
  },
  myMsg: {
    width: 500,
    right: 0,
  },
  myMsgContent: {
    padding: 20,
  },
  opponentMsg: {
    maxWidth: 500,
  },
  media: {
    // height: 500,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  content: {
    display: "flex",
    flexDirection: "row-reverse",
  },
}));
function PrivateMessage(props) {
  const { userId, deleteMessage } = props;
  const classes = useStyles();

  const { id, attachment, isRead, senderId, text, type, createdAt } =
    props.message;

  const urlAttachment = `${APPLICATION_SERVER}/files/${attachment}`;

  const message = () => {
    const fileType = () => {
      const arr = attachment.split(".");
      const ext = arr[arr.length - 1];

      if (ext === "mp4")
        return <video src={urlAttachment} className={classes.media} controls />;
      if (ext === "mp3") return <audio src={urlAttachment} controls />;
      if (["jpg", "jpeg", "png"].includes(ext))
        return <CardMedia className={classes.media} image={urlAttachment} />;
      return ext;
    };
    let ytEmbed = (() => {
      // eslint-disable-next-line no-useless-escape
      const regex =
        /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
      const ytWatch = text.match(regex);
      if (ytWatch && ytWatch.length) return ytWatch[1];
      return null;
    })();

    return (
      <>
        <hr />
        {+senderId === +userId ? (
          <div className={classes.opponentMsgContainer}>
            <Card className={classes.opponentMsg}>
              {type === "text" && attachment && fileType()}
              {ytEmbed && (
                <CardMedia
                  component="iframe"
                  title="test"
                  src={`https://www.youtube.com/embed/${ytEmbed}`}
                />
              )}
              <CardContent className={classes.myMsgContent}>
                {type === "text" && (
                  <Typography variant="body2" component="span">
                    {text}
                  </Typography>
                )}
                {type === "audio" && attachment && (
                  <audio src={urlAttachment} controls />
                )}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="span"
                  className={classes.content}
                >
                  {messageSentTime(createdAt)}
                </Typography>
              </CardContent>
              <DeleteForeverIcon onClick={deleteMessage} />
            </Card>
          </div>
        ) : (
          <div className={classes.myMsgContainer}>
            <Card className={classes.myMsg}>
              {type === "text" && attachment && fileType()}
              {ytEmbed && (
                <CardMedia
                  component="iframe"
                  title="test"
                  src={`https://www.youtube.com/embed/${ytEmbed}`}
                />
              )}
              <CardContent className={classes.myMsgContent}>
                {type === "text" && (
                  <Typography variant="body2" component="p">
                    {text}
                  </Typography>
                )}
                {type === "audio" && attachment && (
                  <audio src={urlAttachment} controls />
                )}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.content}
                >
                  {isRead ? (
                    <DoneAllIcon className={classes.isRead} color="primary" />
                  ) : (
                    <DoneIcon className={classes.isRead} color="primary" />
                  )}
                  {messageSentTime(createdAt)}
                </Typography>
              </CardContent>
              <DeleteForeverIcon onClick={() => deleteMessage(id)} />
            </Card>
          </div>
        )}
        <br />
      </>
    );
  };

  return <>{message()}</>;
}

export default PrivateMessage;
