import { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";
import UserAvatar from "../../presentation/ui/user-avatar";
import Avatar from "@material-ui/core/Avatar";
import messageSentTime from "../../helpers/time/messageSent";
import DayUtils from "../../utils/DateUtils";
import readMessageIcon from "../../assets/img/messages/read.svg";
import unReadedMessageIcon from "../../assets/img/messages/unread.svg";
import StringUtils from "../../utils/StringUtils";
import BrowserHistoryHelper from "../../utils/BrowserHistoryRouter";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
    maxWidth: 800,
    padding: 0,
  },
  isRead: {
    fontSize: 15,
  },
  newMessagesCounter: {
    color: "white",
    backgroundColor: "blue",
    width: 20,
    height: 20,
    fontSize: 14,
  },
  item: {
    display: "flex",
    flexDirection: "column",
  },

  bottom: {
    display: "flex",
    flexDirection: "row-reverse",
    paddingRight: "10px",
  },
  date: {
    marginLeft: 4,
    fontFamily: "Segoe UI",
  },
  badge: {
    backgroundColor: "#50BCFF",
    color: "#50BCFF",

    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));

function Chat(props) {
  const classes = useStyles();
  const { id, chat, setChosedId, isChosedDialog, setLastOpened } = props;
  const {
    attachment,
    isRead,
    senderId,
    text,
    type,
    user1,
    user2,
    createdAt,
    count,
  } = chat;

  const [opponent, setOpponent] = useState(
    (() => {
      const user = id === user1?.id ? user2 : user1;
      return user;
    })()
  );

  useEffect(() => {
    setOpponent(
      (() => {
        const user = id === user1.id ? user2 : user1;
        return user;
      })()
    );
  }, [user1, user2]);

  const textMessage = () => {
    const content = () => {
      if (type === "audio")
        return <label>{id === senderId ? "Вы: " : null}Аудио сообщение</label>;
      if (text)
        return (
          <label>
            {id === senderId ? "Вы: " : null}
            {StringUtils.cutBySymbolsLength(text, 20)}
          </label>
        );
      if (attachment) {
        const arr = attachment.split(".");
        const ext = arr[arr.length - 1];
        if (ext === "mp4") return <label>Видео</label>;
        if (ext === "mp3") return <label>Аудио</label>;
        if (["jpg", "jpeg", "png"].includes(ext)) return <label>Фото</label>;
        return <label>Файл</label>;
      }
    };

    const redirect = () => {
      console.log('id', id)
      if (chat.recipientId !== id) {
        if (setChosedId) setChosedId(chat.recipientId);
        if (setLastOpened) setLastOpened("dialogs");
        BrowserHistoryHelper.moveTo(`/messages/private/${chat.recipientId}`);
      } else {
        if (setChosedId) setChosedId(chat.senderId);
        if (setLastOpened) setLastOpened("dialogs");
        BrowserHistoryHelper.moveTo(`/messages/private/${chat.senderId}`);
      }
    };

    const name = () => {
      if (opponent) {
        if (opponent.displayedName) {
          return opponent.displayedName;
        }
        if (opponent.firstName && opponent.lastName) {
          return `${opponent.firstName} ${opponent.lastName}`;
        } else if (opponent.firstName) {
          return `${opponent.firstName}`;
        }

        if (opponent.firstName !== null && opponent.lastName !== null) {
          return `${opponent.firstName && opponent.firstName}${
            opponent.firstName && opponent.lastName && " "
          }${opponent.lastName && opponent.lastName}`;
        }
        return opponent.email;
      }
    };
    return (
      <div
        id="message-item"
        style={{
          padding: "0px 20px",
          borderRight: isChosedDialog ? "2px solid #50BCFF" : "",
        }}
      >
        <ListItem className={classes.root} onClick={redirect}>
          <ListItemAvatar>
            <UserAvatar
              isOnline={opponent?.isOnline}
              avatar={opponent?.avatar}
            />
          </ListItemAvatar>

          <ListItemText
            primary={
              <div
                style={{
                  fontFamily: "Segoe UI",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                {name()}
              </div>
            }
            secondary={
              <div style={{ fontFamily: "Segoe UI" }}>{content()}</div>
            }
          />
          <div style={{ width: "100px" }}>
            <div
              className={`d-flex`}
              style={{
                position: "relative",
                top: "-8px",
                right: 0,
              }}
            >
              <div className="d-flex justify-content-end w-100 pr-2">
                <div>
                  {id === senderId ? (
                    isRead ? (
                      <img
                        style={{ position: "relative", top: "-2px" }}
                        width="12"
                        height="12"
                        src={readMessageIcon}
                        alt="readed message"
                      />
                    ) : (
                      <img
                        style={{ position: "relative", top: "-2px" }}
                        width="12"
                        height="12"
                        src={unReadedMessageIcon}
                        alt="not readed message"
                      />
                    )
                  ) : null}
                </div>
                <div className={`${classes.date} text-gray`}>
                  {createdAt
                    ? new Date().toDateString() ===
                      new Date(createdAt).toDateString()
                      ? messageSentTime(createdAt)
                      : DayUtils.getDayAndShortMonthsFromDate(
                          new Date(createdAt)
                        )
                    : undefined}
                </div>
              </div>
            </div>
            <div className={classes.bottom}>
              {id !== senderId ? (
                +count ? (
                  <Avatar
                    style={{
                      background: "#50BCFF",
                      color: "white",
                      fontSize: "12px",
                    }}
                    className={classes.newMessagesCounter}
                  >
                    {+count}
                  </Avatar>
                ) : null
              ) : null}
            </div>
          </div>
        </ListItem>
      </div>
    );
  };

  return <div>{textMessage()}</div>;
}

export default Chat;
