import { useState, useEffect, useRef, useMemo } from "react";
import "../../../components/PrivateMessages/private-message.css";

import ApiHelperUser from "../../../helpers/api/bio/users";
import ApiHelperMessages from "../../../helpers/api/private_messages";
import socket from "../../../helpers/socket";

import Loading from "../../../utils/LoadingComponent";
import DateUtils from "../../../utils/DateUtils";
import useHover from "../../PrivateMessages/useHover";
import { DIALOGS_COUNT_OF_UPLOADING_MESSAGES } from "../../../constants";
import PrivateMessagesHeader from "../../PrivateMessagesHeader";
import MessagesList from "../../MessagesList";
import PrivateMessageFooter from "../../PrivateMessageFooter";
import useStopwatch from "../../PrivateMessages/useStopWatch";

const PrivateMessages = (props) => {
  const {
    id,
    isMobile,
    userId,
    setLastOpened,
    setUserIdModal,
    isUpdate,
    setChosedModal,
    shouldAutoFocus,
    readMessageInChats,
  } = props;

  const [newMessage, setNewMessage] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isShowMenuBar, setIsShowMenuBar] = useState(false);
  const [messageId, setMessageId] = useState(false);
  const [isShowThreePoints, setIsShowThreePoints] = useState(false);
  const [threePointsMessageId, setThreePointsMessageId] = useState(false);
  const [showedImageLink, setShowedImageLink] = useState("");
  const [differentDateIds, setDifferentDateIds] = useState([]);
  const [ref, isHovered] = useHover(null);
  const [isRecorded, setRecorded] = useState(false);
  const [audioMessage, setAudioMessage] = useState(null);
  const { ms, start, stop } = useStopwatch();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRedirect, setRedirect] = useState(false);
  const apiUser = new ApiHelperUser();
  const apiMessages = new ApiHelperMessages();
  const [page, setPage] = useState(1);
  const divRef = useRef(null);
  const [file, setFile] = useState();
  const [user, setUser] = useState();
  const [messages, setPrivateMessagesList] = useState();
  const [totalPages, setTotalPages] = useState();
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isCleanInput, setIsCleanInput] = useState(false);

  useEffect(() => {
    if (emoji && emoji.emoji) {
      setNewMessage(newMessage + emoji.emoji);
    }
  }, [emoji]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const userData = await apiUser.getUser(id);
        const messagesData = await apiMessages.getInitialMessages(id);
        console.log(messagesData);
        if (messagesData?.data?.list?.chatId) {
          readMessageInChats(messagesData?.data?.list?.chatId);
        }
        const {
          email,
          username,
          firstName,
          lastName,
          phone,
          about,
          avatar,
          contact,
          isOnline,
          lastOnline,
          displayedFirstName,
          displayedLastName,
          inBan,
          isBanned,
        } = userData?.data?.bio;

        setUser({
          email,
          username,
          firstName,
          lastName,
          phone,
          about,
          avatar,
          contact,
          isOnline,
          lastOnline,
          displayedFirstName,
          displayedLastName,
          inBan,
          isBanned,
        });

        setPrivateMessagesList(
          messagesData?.data?.list?.length
            ? messagesData?.data?.list?.reverse()
            : []
        );
        setTotalPages(
          Math.round(
            messagesData?.data?.total / DIALOGS_COUNT_OF_UPLOADING_MESSAGES
          )
        );

        if (messagesData?.data?.list) {
          setDifferentDateIds(
            DateUtils.getDifferentDates(messagesData?.data?.list)
          );
        }

        if (messagesData?.data?.list?.length) {
          await apiMessages?.readMessage(
            messagesData?.data?.list[messagesData?.data?.list?.length - 1]?.id
          );
        }

        setLoading(false);

        if (divRef?.current) {
          divRef.current.scrollTop = divRef?.current?.scrollHeight;
        }

        return;
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [id, isUpdate]);

  const loadMore = async () => {
    if (totalPages > page) {
      const messagesData = await apiMessages.getInitialMessages(
        id,
        page + 1,
        DIALOGS_COUNT_OF_UPLOADING_MESSAGES
      );
      if (messagesData) {
        setPage((prev) => prev + 1);
        setPrivateMessagesList((prev) =>
          [...prev, ...messagesData?.data?.list].reverse()
        );
      }
    }
  };

  useEffect(() => {
    socket.getSocket().on("private_message", (data) => {
      const { user1, user2, id: messageId } = data;

      if (
        (+user1?.id === +id || +user2?.id === +id) &&
        window.location.pathname === `/messages/private/${id}`
      ) {
        readMessageInChats();
        apiMessages.readMessage(messageId);
        setPrivateMessagesList((prev) => [...prev, data]);
        divRef.current.scrollTop = divRef?.current?.scrollHeight;
        return;
      }
    });
    socket.getSocket().on("private_message_read", (data) => {
      const { id: userId } = data;
      if (+userId === +id) {
        // return readPrivateMessagesList()
      }
    });
    socket.getSocket().on("online", (data) => {
      const { userId } = data;

      if (+userId === +id) {
        // return setUserOnlineStatus(true)
      }
    });
    socket.getSocket().on("offline", (data) => {
      const { userId, lastOnline } = data;
      if (+userId === +id) {
        // return setUserOfflineOnlineStatus(false, lastOnline)
      }
    });
    return () => {
      socket.getSocket().off("private_message");
      socket.getSocket().off("private_message_read");
      socket.getSocket().off("online");
      socket.getSocket().off("offline");
    };
  }, []);

  const deleteMessage = async (id) => {
    const data = await apiMessages.deleteMessage(id);
    if (data.status === 200) {
      setPrivateMessagesList(messages.filter((el) => el.id !== id));
    }
    return;
  };

  const sendTextMessage = async (newMessage) => {
    const message = await apiMessages.create("text", id, newMessage, file);
    setPrivateMessagesList((prev) => [...prev, message]);
    setIsCleanInput(!isCleanInput);
    setFile(null);
    setNewMessage("");

    document.querySelector(
      ".messages-wrapper-textarea .textarea"
    ).style.height = "34px";
    const messages = document.querySelector(".messages-scrollbar");
    const wHeight = window.innerHeight;
    wHeight <= 575
      ? (messages.style.height = "94vh")
      : (messages.style.height = "90vh");
  };

  const onChangeFile = async (selectedFfile) => {
    setError("");
    if (selectedFfile.size > 25 * 1000 * 1000) {
      return setError("Допустимый размер файла 25MB");
    }

    await apiMessages.create("text", id, newMessage, selectedFfile);
    setNewMessage("");
  };

  useEffect(() => {
    setDifferentDateIds(DateUtils.getDifferentDates(messages));
  }, [messages]);

  // useEffect(() => {
  //   ;(async () => {
  //     if (
  //       !isHovered ||
  //       !audioMessage ||
  //       audioMessage.stopTime - audioMessage.startTime < 200
  //     ) {
  //       return setRecorded(false)
  //     }
  //     setRecorded(false)
  //     audioMessage.blob.lastModified = new Date()
  //     audioMessage.blob.name = 'audio.mp3'
  //     await apiMessages.create('audio', id, null, audioMessage.blob)
  //   })()
  // }, [audioMessage])

  const name = useMemo(() => {
    if (user && user.displayedFirstName) {
      return (
        user.displayedFirstName +
        (user.displayedLastName ? " " + user.displayedLastName : "")
      );
    }
    if ((user && user.firstName) || (user && user.lastName)) {
      return `${user.firstName ? user.firstName : ""}${
        user.firstName && user.lastName ? " " : ""
      }${user.lastName ? user.lastName : ""}`;
    }
    return user?.email;
  }, [user]);

  return (
    <div
      className="w-100 messages-wrapper-content"
      style={{
        padding: showedImageLink ? 0 : "",
        background: showedImageLink
          ? "#996C5D"
          : isShowMenuBar
          ? "rgba(0, 0, 0, 0.05)"
          : "#ffffff",
        borderRight: "0.5px solid rgba(0, 0, 0, 0.05)",
        borderLeft: "0.5px solid rgba(0, 0, 0, 0.05)",
        height: "100vh",
        display: isMobile ? "flex" : "",
        justifyContent: isMobile ? "center" : "",
      }}
    >
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {user?.lastOnline && id && name ? (
          <div
            className="messages-header"
            style={{
              position: "fixed",
              background: "white",
              zIndex: 2,
            }}
          >
            <div className="d-flex w-100">
              <PrivateMessagesHeader
                lastOnline={user?.lastOnline}
                id={id}
                isMobile={isMobile}
                isOnline={user?.isOnline}
                name={name}
                avatar={user?.avatar}
                setLastOpened={setLastOpened}
                setUserIdModal={setUserIdModal}
              />
            </div>
          </div>
        ) : undefined}

        <div>
          {isLoading && !messages?.length ? (
            <div className="d-flex justify-content-center pt-4 pb-4">
              <Loading />
            </div>
          ) : (
            <MessagesList
              isLoadingMessages={isLoadingMessages}
              totalPages={totalPages}
              page={page}
              divRef={divRef}
              setIsShowMenuBar={setIsShowMenuBar}
              name={name}
              isShowMenuBar={isShowMenuBar}
              deleteMessage={deleteMessage}
              username={user?.username}
              about={user?.about}
              messages={messages}
              loadMore={loadMore}
              differentDateIds={differentDateIds}
              setChosedModal={props.setChosedModal}
              setUserIdModal={props.setUserIdModal}
              isMobile={props.isMobile}
              avatar={user?.avatar}
              userId={userId}
            />
          )}
        </div>
        {!isShowMenuBar ? (
          <div style={{ width: "600px", margin: "auto" }}>
            <PrivateMessageFooter
              onChangeFile={onChangeFile}
              inBan={user?.inBan}
              isBanned={user?.isBanned}
              isCleanInput={isCleanInput}
              shouldAutoFocus={shouldAutoFocus}
              sendTextMessage={sendTextMessage}
            />
          </div>
        ) : undefined}
      </div>
      )}
    </div>
  );
};

export default PrivateMessages;
