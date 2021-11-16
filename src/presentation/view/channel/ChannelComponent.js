import { useCallback, useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import initialChannelIcon from "../../../assets/img/channels/upload-image.svg";
import infoImage from "../../../assets/img/channels/info.svg";
import downloadImage from "../../../assets/img/channels/downloadImageIcon.svg";
import MicIcon from "../../../assets/img/channels/recordVoiceIcon.svg";
import fileIcon from "../../../assets/img/channels/file.svg";
import submitMessageIcon from "../../../assets/img/channels/submit-message-icon.svg";
import removeImageIcon from "../../../assets/img/channels/remove-photo.svg";
import recordPoint from "../../../assets/img/channels/record-point.svg";
import arrowBack from "../../../assets/img/channels/arrow-back.svg";
import Textarea from "../../ui/textarea";
import BrowserHistoryRouter from "../../../utils/BrowserHistoryRouter";
import Loading from "../../../utils/LoadingComponent";
import Button from "../../ui/button";
import DateUtils from "../../../utils/DateUtils";
import { APPLICATION_SERVER } from "../../../constants";
import AboutChannel from "./AboutChannel";
import ConnectToChannel from "./ConnectToChannel";
import MessageItem from "./MessageItem";
import StringUtils from "../../../utils/StringUtils";
import InfiniteWaypoint from "../../../components/InfiniteWayPoint/index";
import styled from "styled-components";
import PropTypes from "prop-types";
import StorageHelper from "../../../utils/StorageHelper";
import { CHANNEL_COUNT_OF_UPLOADING_MESSAGES } from "../../../constants";

const ChannelComponentWrap = styled.div``;

const ChannelComponent = ({ levelRepository, channelRepository }) => {
  const [page, setPage] = useState(2);
  const [totalPages, setTotalPages] = useState();
  const [channelName, setChannelName] = useState();
  const [channelInfo, setChannelInfo] = useState("");
  const [channelData, setChannelData] = useState();
  const [channelId, setChannelId] = useState();
  const [showedImageLink, setShowedImageLink] = useState("");
  const [isShowMenuBar, setIsShowMenuBar] = useState("");
  const [showedVideoLink, setShowedVideoLink] = useState("");
  const [channelFiles, setChannelFiles] = useState();
  const [userId, setUserId] = useState();
  const [messages, setMessages] = useState([]);
  const [levels, setLevels] = useState();
  const [channelAdmins, setChannelAdmins] = useState();
  const [isShowImage, setIsShowImage] = useState(false);
  const [channelUserCount, setChannelUserCount] = useState();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isUserInChannel, setIsUserInChannel] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState();
  const [differentDateIds, setDifferentDateIds] = useState([]);
  const [threePointsMessageId, setThreePointsMessageId] = useState();
  const [isRecorded, setIsRecorded] = useState(false);
  const [isShowThreePoints, setIsShowThreePoints] = useState(false);
  const [message, setMessage] = useState("");
  const [firstChosedLevelIcon, setFirstChosedLevelIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(false);
  const [isShowSubmitMessageButton, setIsShowSubmitMessageButton] =
    useState(false);
  const [isShowChosedLevels, setIsShowChosedLevels] = useState(false);
  const [adminIdMessage, setAdminIdMessage] = useState(false);
  const channelRef = useRef(null);
  const [levelsList, setLevelsList] = useState([]);
  const [chosedLevels, setChosedLevels] = useState();

  const getChannelLevelsByChannelName = useCallback(
    async (channelId) => {
      setIsLoading(true);

      if (channelName) {
        try {
          const levelsList =
            await levelRepository?.getChannelLevelsByChannelName(channelName);
          setLevels(levelsList);

          // if (levelsList?.length) {
          //   return levelsList?.map(async (level) => {
          //     const result = await channelRepository.getAdminMessages(
          //       channelId,
          //       level.id.toString(),
          //       1
          //     )

          //     if (result) {
          //       setMessages((prev) => [...prev, ...result])
          //     }

          //     setIsLoading(false)

          //     if (channelRef?.current) {
          //       channelRef.current.scrollTop = channelRef?.current?.scrollHeight
          //     }
          //   })
          // }

          if (isUserInChannel && !isUserAdmin) {
            const subscribedLevelsIds = channelInfo?.users?.filter(
              (level) => level.user_id === Number(userId)
            );

            return subscribedLevelsIds?.map(async (level) => {
              setIsLoading(true);

              const result = await this.channelRepository.getAdminMessages(
                channelId,
                level?.level_id?.toString(),
                1
              );

              if (result) {
                await setMessages((prev) => [...prev, ...result]);
              }
              setIsLoading(false);

              if (channelRef?.current) {
                channelRef.current.scrollTop =
                  channelRef?.current?.scrollHeight;
              }
            });
          }

          if (chosedLevels?.length && isShowChosedLevels) {
            return chosedLevels?.forEach(async (levelId) => {
              setIsLoading(true);
              const result = await channelRepository.getAdminMessages(
                channelId,
                levelId.toString(),
                1
              );
              if (result) setMessages((prev) => [...result, ...prev]);
              setIsLoading(false);
              if (channelRef?.current) {
                channelRef.current.scrollTop =
                  channelRef?.current?.scrollHeight;
              }
            });
          }
        } catch (e) {
          alert(e);
        }
      }

      setIsLoading(false);
    },
    [
      channelInfo,
      channelName,
      channelRepository,
      chosedLevels,
      isShowChosedLevels,
      isUserAdmin,
      isUserInChannel,
      levelRepository,
      userId,
    ]
  );

  useEffect(() => {
    setDifferentDateIds(DateUtils.getDifferentDates(messages));
  }, [messages]);

  // useEffect(() => {
  //   setChannelName(incomingChosedChannelName)
  // }, [incomingChosedChannelName])

  useEffect(() => {
    const pathName = BrowserHistoryRouter.getHistory().location.pathname;
    setChannelName(pathName.slice(1, pathName?.length));
    (async () => {
      setMessages([]);
      setUserId(StorageHelper.getUserData()?.user_id);
      if (channelName) {
        const [recievedChannelData, channelUserCount] = await Promise.all([
          channelRepository.getChannelInfoByChannelName(channelName),
          channelRepository.getChannelUsersCount(channelName),
        ]);

        const isAdmin = recievedChannelData?.channelAdmins?.length
          ? Boolean(
              recievedChannelData?.channelAdmins?.find(
                (admin) =>
                  admin?.user_id === StorageHelper.getUserData()?.user_id
              )[0]
            )
          : Object.keys(recievedChannelData)?.length
          ? Number(recievedChannelData?.channelAdmins?.user_id) ===
            Number(StorageHelper.getUserData()?.user_id)
          : false;
        const isUserSubscribed = Boolean(
          recievedChannelData?.users?.filter(
            (user) =>
              Number(user?.user_id) ===
              Number(StorageHelper.getUserData()?.user_id)
          )?.length
        );

        setChannelData(recievedChannelData);
        setChannelInfo(recievedChannelData?.channel[0]);
        setChannelAdmins(recievedChannelData?.channelAdmins);
        setIsUserAdmin(isAdmin);
        setChannelFiles(recievedChannelData?.files);
        setIsUserInChannel(isUserSubscribed);
        getChannelLevelsByChannelName(recievedChannelData?.channel[0]?.id);
        setChannelUserCount(channelUserCount?.amount);
        setChannelId(recievedChannelData?.channel[0]?.id);

        const incomingLevelsList =
          await levelRepository?.getChannelLevelsByChannelName(channelName);
        if (levelsList) {
          setLevelsList(incomingLevelsList);
          setChosedLevels(incomingLevelsList?.data);
        }

        const result = await channelRepository?.getChannelMessages(
          recievedChannelData?.channel[0]?.id,
          incomingLevelsList?.data?.map((level) => level.id).join(","),
          1,
          CHANNEL_COUNT_OF_UPLOADING_MESSAGES
        );
        setTotalPages(
          Math.round(result?.total / CHANNEL_COUNT_OF_UPLOADING_MESSAGES)
        );
        setMessages(result?.data);

        if (channelRef?.current) {
          channelRef.current.scrollTop = channelRef?.current?.scrollHeight;
        }
      }
    })();
  }, [
    channelName,
    channelRepository,
    getChannelLevelsByChannelName,
    levelRepository,
    levelsList,
  ]);

  const loadMore = async () => {
    if (totalPages >= page) {
      setIsLoading(true);
      const result = await channelRepository?.getChannelMessages(
        channelId,
        levelsList?.data?.map((level) => level.id).join(","),
        page,
        CHANNEL_COUNT_OF_UPLOADING_MESSAGES
      );

      setMessages((prev) => [...result?.data, ...prev]);
      setPage((prev) => prev + 1);
      setIsLoading(false);
    }
  };

  const createNewMessage = async (message, attachment, type) => {
    if (channelId && (message || attachment)) {
      if (chosedLevels) {
        return chosedLevels.forEach(async (level) => {
          try {
            setIsLoading(true);
            const result = await channelRepository.addAdminMessage(
              channelId,
              level.id.toString(),
              message ? message : "",
              attachment ? attachment : undefined,
              type ? type : undefined
            );

            if (result) {
              setMessages((prev) => [...prev, result[0]]);
            }
            if (channelRef?.current) {
              channelRef.current.scrollTop = channelRef?.current?.scrollHeight;
            }
          } catch (e) {
            alert(e);
          } finally {
            setIsLoading(false);
          }
        });
      }
    }

    if (channelId && (message || attachment) && !isShowChosedLevels) {
      if (levels?.length) {
        return levels.map(async (level) => {
          try {
            setIsLoading(true);
            const result = await channelRepository.addAdminMessage(
              channelId,
              level.id.toString(),
              message ? message : "",
              attachment ? attachment : undefined,
              type ? type : undefined
            );

            if (result) setMessages((prev) => [...prev, result[0]]);
            if (channelRef?.current) {
              channelRef.current.scrollTop = channelRef?.current?.scrollHeight;
            }
          } catch (e) {
            alert(e);
          } finally {
            setIsLoading(false);
          }
        });
      }
    }
  };

  const handleRemoveMessage = async () => {
    setIsLoading(true);
    if (threePointsMessageId) {
      try {
        await channelRepository.deleteAdminMessage(threePointsMessageId);

        const filteredMessages = messages?.filter(
          (adminMessage) => adminMessage.id !== Number(threePointsMessageId)
        );
        setDifferentDateIds(filteredMessages);
        setMessages(filteredMessages);
      } catch (e) {
        alert(e);
      }
    }

    setIsShowMenuBar(false);
    setIsLoading(false);
  };

  const autoSize = useCallback((elem) => {
    const messages = document.querySelector(".messages-channel-scrollbar");
    if (messages) {
      const height = Math.min(118, elem.scrollHeight);
      const wHeight = window.innerHeight;
      if (height === 34) {
        wHeight <= 575
          ? (messages.style.height = "96vh")
          : (messages.style.height = "93vh");
      } else if (height === 55) {
        wHeight <= 575
          ? (messages.style.height = "94vh")
          : (messages.style.height = "91vh");
      } else if (height === 76) {
        wHeight <= 575
          ? (messages.style.height = "92vh")
          : (messages.style.height = "89vh");
      } else if (height === 97) {
        wHeight <= 575
          ? (messages.style.height = "90vh")
          : (messages.style.height = "87vh");
      } else if (height === 118) {
        wHeight <= 575
          ? (messages.style.height = "88vh")
          : (messages.style.height = "85vh");
      }
      elem.style.height = `${height}px`;
      elem.scrollTop = elem.scrollHeight;
    }
  }, []);

  return (
    <ChannelComponentWrap>
      <div
        className="page-container"
        style={{
          padding: 0,
          background:
            showedImageLink || showedVideoLink
              ? "#996C5D"
              : isShowMenuBar
              ? "rgba(0, 0, 0, 0.05)"
              : "#ffffff",
          position: "relative",
        }}
      >
        {false ? (
          <Loading />
        ) : (
          <>
            <div id="channel-root">
              {channelInfo &&
              channelAdmins &&
              !isShowImage &&
              !showedVideoLink ? (
                <div>
                  <div
                    className="channel-width"
                    style={{
                      position: "relative",
                      zIndex: 2,
                      background: "white",
                    }}
                  >
                    <div
                      className="d-flex"
                      style={{
                        background: isShowMenuBar
                          ? "rgba(0, 0, 0, 0.05)"
                          : "white",
                      }}
                    >
                      <div
                        className="col-1 arrow-back-wrap"
                        style={{ maxWidth: "10.333333%" }}
                      >
                        <div
                          className="text-right c-p "
                          style={{
                            paddingTop: "10px",
                          }}
                        >
                          <div
                            className="icon-hover"
                            onClick={() => {
                              BrowserHistoryRouter.goBack();
                            }}
                          >
                            <img src={arrowBack} alt="arrow back" />
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-9 pl-0 pb-2 messages-channel-header"
                        style={{ marginLeft: "5px" }}
                      >
                        <div className="d-flex pl-2 pt-2">
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              BrowserHistoryRouter.moveTo(
                                `/${channelName}/info`
                              );
                            }}
                          >
                            {channelFiles?.length >= 1 ? (
                              <img
                                src={channelFiles[0]?.link}
                                style={{
                                  width: "44px",
                                  height: "44px",
                                  borderRadius: "50%",
                                  border: " 1px solid rgba(0, 0, 0, 0.05)",
                                }}
                                alt="channel-icon"
                              />
                            ) : (
                              <img
                                src={initialChannelIcon}
                                style={{
                                  width: "44px",
                                  height: "44px",
                                  borderRadius: "50%",
                                  border: "1px solid rgba(0, 0, 0, 0.05)",
                                }}
                                alt="channel-icon"
                              />
                            )}
                          </div>
                          <div className="pl-2">
                            <div
                              onClick={() => {
                                BrowserHistoryRouter.moveTo(
                                  `/${channelName}/info`
                                );
                              }}
                            >
                              <div className="channel-name">
                                {channelInfo.name}
                              </div>
                            </div>
                            <div className="channel-count-members">
                              {channelUserCount}{" "}
                              {channelData?.users?.length ||
                              channelUserCount === 0
                                ? StringUtils.getRightDeclination(
                                    channelUserCount,
                                    ["участник", "участника", "участников"]
                                  )
                                : "участник"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-2 pl-0 pl-1">
                        <div
                          className="next-page icon-hover c-p"
                          style={{ padding: 0, marginTop: "10px" }}
                          onClick={() => {
                            BrowserHistoryRouter.moveTo(`/${channelName}/info`);
                          }}
                        >
                          <img src={infoImage} alt="more info" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {isUserAdmin || isUserInChannel ? (
                    <>
                      <div className="w-100">
                        <div
                          ref={channelRef}
                          className="messages-scrollbar"
                          id="channel-messages-block"
                        >
                          <div className="w-100 pt-5 pb-3">
                            <AboutChannel
                              name={channelInfo.name}
                              desc={channelInfo.description}
                              isShowChannelName={true}
                              link={channelInfo.link}
                            />
                          </div>
                          {isLoadingMessages ? (
                            <div className="d-flex justify-content-center pt-4 pb-4">
                              <Loading />
                            </div>
                          ) : undefined}
                          {messages?.length >= 1
                            ? messages.map((adminMessage) => {
                                return (
                                  <div key={`level_message_item_${uuidv4()}`}>
                                    {differentDateIds &&
                                    differentDateIds.length >= 1 &&
                                    differentDateIds.includes(
                                      adminMessage.id
                                    ) ? (
                                      <div className="text-center pt-3 pb-3 text-gray">
                                        {DateUtils.getDayAndMonthsFromDate(
                                          new Date(adminMessage.createdAt)
                                        )}
                                      </div>
                                    ) : undefined}

                                    <MessageItem
                                      isShowAvatar={differentDateIds?.includes(
                                        adminMessage.id
                                      )}
                                      whiteBackground={!isShowMenuBar}
                                      isUserAdmin={isUserAdmin}
                                      channelAvatar={
                                        channelFiles[0]?.name &&
                                        channelFiles[0]?.type &&
                                        `storage/icons/${channelFiles[0].name}.${channelFiles[0].type}`
                                      }
                                      channelName={channelName}
                                      adminMessage={adminMessage}
                                      isUserMessage={false}
                                      isChannelMessages={true}
                                      setIsShowMenuBar={(
                                        isShowMenuBar,
                                        adminMessageId
                                      ) => {
                                        setIsShowMenuBar(isShowMenuBar);
                                        setAdminIdMessage(adminMessageId);
                                      }}
                                      setIsShowThreePoints={(
                                        isShowThreePoints,
                                        messageId
                                      ) => {
                                        setIsShowThreePoints(isShowThreePoints);

                                        if (isShowThreePoints) {
                                          setThreePointsMessageId(messageId);
                                        }
                                      }}
                                      isShowThreePoints={
                                        adminMessage.id ===
                                          threePointsMessageId &&
                                        isShowThreePoints
                                      }
                                      setShowedImageLink={(showedImageLink) => {
                                        setShowedImageLink(showedImageLink);
                                      }}
                                      setLinkOfShowedVideo={(
                                        showedVideoLink
                                      ) => {
                                        setShowedImageLink(showedImageLink);
                                      }}
                                    />
                                  </div>
                                );
                              })
                            : undefined}

                          {messages?.length ? (
                            //@ts-ignore
                            <InfiniteWaypoint
                              content={messages}
                              onEnter={loadMore}
                            />
                          ) : undefined}

                          {isLoading ? (
                            <div className="d-flex justify-content-center pt-4 pb-4">
                              <Loading />
                            </div>
                          ) : undefined}
                        </div>
                      </div>

                      {isUserAdmin ? (
                        <div className="channel-messages-enter-block container">
                          <div
                            className="container channel-wrapper-footer-block"
                            style={{ maxWidth: "600px", marginBottom: '50px' }}
                          >
                            <div className="channel-messages-enter-block">
                              <div className="row w-100 messages-channel-footer">
                                {!isRecorded ? (
                                  <>
                                    <div className="col-1 pl-0 pr-2 channel-wrapper-upload">
                                      <div className="image-upload">
                                        <label
                                          htmlFor="file-input"
                                          className="icon-hover"
                                          style={{ marginBottom: 0 }}
                                        >
                                          <img
                                            src={fileIcon}
                                            style={{ cursor: "pointer" }}
                                            alt="file"
                                          />
                                        </label>

                                        <input
                                          id="file-input"
                                          type="file"
                                          onChange={(e) => {
                                            // this.channelViewModel.createAdminMessage(
                                            //   message,
                                            //   //@ts-ignore
                                            //   e.target.files[0]
                                            // )
                                            // this.setState({
                                            //   message: '',
                                            //   isShowSubmitMessageButton: false,
                                            //   startRecord: 0,
                                            //   recordMs: 0,
                                            // })
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className="col-8 pr-0 channel-wrapper-textarea"
                                      style={{ paddingTop: "5px" }}
                                    >
                                      <Textarea
                                        size="sm"
                                        autofocus={true}
                                        className="pr-2 textarea-channel"
                                        placeholder="Напишите сообщение"
                                        value={
                                          chosenEmoji
                                            ? message + chosenEmoji
                                            : message
                                        }
                                        onChange={(e) => {
                                          setMessage(e.currentTarget.value);
                                          setIsShowSubmitMessageButton(true);
                                        }}
                                        onKeyDown={(e) => {
                                          if (
                                            e.keyCode === 13 &&
                                            e.shiftKey === false &&
                                            message
                                          ) {
                                            createNewMessage(message);
                                          }
                                          autoSize(e.target);
                                        }}
                                      />
                                    </div>
                                  </>
                                ) : undefined}

                                <div
                                  className="col-3 d-flex channel-wrapper-right"
                                  style={{
                                    alignItems: "center",
                                    paddingRight: 0,
                                  }}
                                >
                                  {!isRecorded ? (
                                    <>
                                      <div
                                        style={{ cursor: "pointer" }}
                                        className="d-flex choose-level-item ml-2 pr-2"
                                        onClick={() => {
                                          BrowserHistoryRouter.moveTo(
                                            `/${channelName}/admin/choose-level`
                                          );
                                        }}
                                      >
                                        <div
                                          className="count-levels pt-1 choose-level-circle"
                                          style={{
                                            position: "relative",
                                            top: "5px",
                                            left: "7px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              position: "relative",
                                              top: "-3px",
                                              left: " 2px",
                                            }}
                                          >
                                            +
                                            {isShowChosedLevels
                                              ? chosedLevels &&
                                                chosedLevels.length
                                              : levelsList?.data?.length &&
                                                levelsList?.data?.length}
                                          </div>
                                        </div>
                                        <div
                                          className="choose-level-circle"
                                          style={{
                                            position: "relative",
                                            top: "5px",
                                            left: "6px",
                                          }}
                                        >
                                          <img
                                            style={{
                                              position: "relative",
                                              top: "-5px",
                                              left: "-4px",
                                              width: "32px",
                                            }}
                                            //@ts-ignore
                                            src={
                                              !firstChosedLevelIcon
                                                ? chosedLevels?.length
                                                  ? chosedLevels[0]
                                                      .level_image_link
                                                  : undefined
                                                : firstChosedLevelIcon
                                            }
                                            alt="level"
                                          />
                                        </div>
                                      </div>
                                    </>
                                  ) : undefined}

                                  {isShowSubmitMessageButton || message ? (
                                    <div
                                      className="channel-wrapper-send-message"
                                      style={{
                                        marginBottom: "3px",
                                        marginLeft: "10px",
                                      }}
                                      onClick={() => {
                                        createNewMessage(message);

                                        const textarea =
                                          document.querySelector(
                                            ".textarea-channel"
                                          );
                                        const messages = document.querySelector(
                                          ".messages-channel-scrollbar"
                                        );
                                        if (textarea && messages) {
                                          textarea.style.height = "34px";
                                          const wHeight = window.innerHeight;
                                          wHeight <= 575
                                            ? (messages.style.height = "96vh")
                                            : (messages.style.height = "93vh");
                                        }
                                      }}
                                    >
                                      <div>
                                        <label
                                          className="icon-hover"
                                          style={{
                                            marginBottom: 0,
                                            cursor: "pointer",
                                            paddingRight: "7px",
                                          }}
                                        >
                                          <img
                                            src={submitMessageIcon}
                                            alt="submit message"
                                            className="pl-1"
                                            style={{
                                              transform: "rotate(45deg) ",
                                            }}
                                          />
                                        </label>
                                      </div>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : undefined}

                      {!isUserAdmin ? (
                        <ConnectToChannel
                          userId={userId}
                          isMobile={true}
                          levelIcon={
                            ""
                            // allChannelMessages
                            //   ? //@ts-ignore
                            //     allChannelMessages[0]?.level?.level_image_link
                            //   : ''
                          }
                          channelName={channelName}
                          channelImage={
                            channelFiles && channelFiles.length >= 1
                              ? `${APPLICATION_SERVER}/files/storage/icons/${channelFiles[0].name}.${channelFiles[0].type}`
                              : undefined
                          }
                        />
                      ) : undefined}

                      {isShowMenuBar ? (
                        <div className="row menu-bar-wrapper ml-0">
                          <div>
                            <div
                              onClick={() => {
                                handleRemoveMessage(adminIdMessage?.toString());
                                setIsShowMenuBar(false);
                              }}
                            >
                              <div
                                className="d-flex pt-3 pl-4"
                                style={{ cursor: "pointer" }}
                              >
                                <div>
                                  <img
                                    className="pl-1"
                                    src={removeImageIcon}
                                    alt="remove icon"
                                  />
                                </div>
                                <div
                                  className="pl-3"
                                  style={{
                                    cursor: "pointer",
                                    paddingTop: "2px",
                                  }}
                                >
                                  Удалить
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="pt-3 d-flex justify-content-center w-100 pb-3">
                            <Button
                              onClick={() => {
                                setIsShowMenuBar(false);
                              }}
                            >
                              Отменить
                            </Button>
                          </div>
                        </div>
                      ) : undefined}
                    </>
                  ) : (
                    <>
                      <div className="w-100 pt-5 pb-3">
                        <AboutChannel
                          name={channelInfo.name}
                          desc={channelInfo.description}
                          isShowChannelName={true}
                          link={channelInfo.link}
                        />
                      </div>
                      <div className="classsssssssss">
                        <ConnectToChannel
                          userId={userId}
                          isMobile={true}
                          channelName={channelName}
                          channelImage={
                            channelFiles && channelFiles.length >= 1
                              ? `${APPLICATION_SERVER}/files/storage/icons/${channelFiles[0].name}.${channelFiles[0].type}`
                              : undefined
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              ) : undefined}
            </div>

            {showedImageLink ? (
              <>
                <div className="p-4 d-flex justify-content-between">
                  <div
                    onClick={() => {
                      setShowedImageLink("");
                    }}
                    style={{ cursor: "pointer", color: "white" }}
                  >
                    Закрыть
                  </div>
                  <div>
                    <a href={`${showedImageLink}`} download={true}>
                      <img src={downloadImage} alt="download" />
                    </a>
                  </div>
                </div>
                <div
                  style={{
                    height: "72%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <img
                      src={showedImageLink}
                      className="w-100"
                      alt="opened message"
                    />
                  </div>
                </div>
              </>
            ) : undefined}

            {showedVideoLink ? (
              <>
                <div className="p-4 d-flex justify-content-between">
                  <div
                    onClick={() => {
                      setShowedVideoLink("");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Закрыть
                  </div>
                  <div>
                    <a href={`${showedVideoLink}`} download={true}>
                      <img src={downloadImage} alt="download" />
                    </a>
                  </div>
                </div>
                <div
                  style={{
                    height: "72%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="message-video-block">
                    <video width="375" controls>
                      <source src={`${showedVideoLink}`} />
                    </video>
                  </div>
                </div>
              </>
            ) : undefined}
          </>
        )}
      </div>
    </ChannelComponentWrap>
  );
};

export default withRouter(ChannelComponent);
