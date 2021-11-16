import { useState } from "react";

import AudioMessage from "../../ui/audio-message/AudioMessage";
import MusicMessage from "../..//ui/audio-message/MusicMessage";
import whiteEllips from "../../../assets/img/channels/white-ellipse.svg";
import threeDots from "../../../assets/img/channels/three-dots.svg";
import chosedThreeDots from "../../../assets/img/channels/chosed-three-dots.svg";
import blueFileIcon from "../../../assets/img/channels/file-icon.svg";
import whiteFileIcon from "../../../assets/img/channels/white-file-icon.svg";
import { APPLICATION_SERVER } from "../../../constants";
import messageReadedIcon from "../../../assets/img/messages/message-readed.svg";
import messageNotReadedIcon from "../../../assets/img/messages/message-not-readed.svg";
import BrowserHistoryRouter from "../../../utils/BrowserHistoryRouter";
import DateUtils from "../../../utils/DateUtils";
import StringUtils from "../../../utils/StringUtils";
import { linkify } from "../../../utils/LinkifyUtils";
import initialImage from "../../../assets/img/channels/upload-image.svg";

interface Props {
  adminMessage: any; //AdminMessage
  setShowedImageLink(showedImageLink: string): void;
  setIsShowMenuBar(isShowMenuBar: boolean, adminMessageId: number): void;
  setLinkOfShowedVideo?(showedVideoLink: string): void;
  setIsShowThreePoints?(isShowThreePoints: boolean, messageId: number): void;
  isChannelMessages?: boolean;
  isUserMessage?: boolean;
  userAvatar?: string;
  channelAvatar?: string;
  isShowThreePoints?: boolean;
  isUserAdmin: boolean;
  whiteBackground?: boolean;
  channelName?: string;
  isShowAvatar?: boolean;
  userId?: number;
  isDesktop?: boolean;
  setChosedModal(openedModal: string): void;
  setUserIdModal(userId: number): void;
  isMobile?: boolean;
}
const MessageItem = (props: Props): JSX.Element => {
  const {
    right,
    setShowedImageLink,
    setIsShowMenuBar,
    setLinkOfShowedVideo,
    isChannelMessages,
    isUserMessage,
    userAvatar,
    isShowThreePoints,
    channelAvatar,
    setIsShowThreePoints,
    isUserAdmin,
    whiteBackground,
    channelName,
    isShowAvatar,
    userId,
    isDesktop,
    setChosedModal,
    isMobile,
    setUserIdModal,
    setChannelInfoName,
    adminMessage,
  } = props;
  const [isMouseDots, setIsMouseDots] = useState(false);
  // debugger;

  const isContainMessageAudio = !!(
    adminMessage &&
    adminMessage.attachment &&
    StringUtils.defineFileType(adminMessage.attachment as string) === "audio" &&
    adminMessage.attachment.includes("audio_messages")
  );

  const isContainImage =
    StringUtils.defineFileType(
      adminMessage && (adminMessage.attachment as string)
    ) === "image";

  const isContainVideo = !!(
    StringUtils.defineFileType(
      adminMessage && (adminMessage.attachment as string)
    ) === "video"
  );

  const isContainFile = !!(
    StringUtils.defineFileType(
      adminMessage && (adminMessage.attachment as string)
    ) === "file"
  );

  const isContainYoutubeLink = !!(
    (adminMessage &&
      adminMessage.message &&
      adminMessage.message.includes("https://www.youtube.com")) ||
    adminMessage?.text?.includes("https://www.youtube.com")
  );

  const isContainOnlyText = !!(
    (adminMessage && !adminMessage.attachment && adminMessage.text) ||
    adminMessage.message
  );

  return (
    <div>
      {!isContainMessageAudio ? (
        <div className="d-flex pb-2">
          <div
            className={`${
              isUserMessage ? "justify-content-end" : "justify-content-start"
            } w-100 d-flex`}
          >
            {!isUserMessage ? (
              <div className="col-1 pt-2">
                {isShowAvatar ? (
                  <div
                    className="user-icon c-p"
                    onClick={(): void => {
                      if (isChannelMessages) {
                        if (isMobile) {
                          BrowserHistoryRouter.moveTo(`/${channelName}/info`);
                        } else {
                          setChosedModal();
                          setChannelInfoName();
                          // setLastOpened('user-info')
                          // setUserIdModal(userId)
                        }
                      } else {
                        if (isMobile) {
                          BrowserHistoryRouter.moveTo(`/users/${userId}`);
                        } else {
                          setChosedModal("user-info");
                          setUserIdModal(userId);
                        }
                      }
                    }}
                  >
                    <img
                      src={
                        userAvatar
                          ? `${APPLICATION_SERVER}/files/${userAvatar}`
                          : channelAvatar
                          ? channelAvatar
                          : initialImage
                      }
                      width="32"
                      height="32"
                      style={{ borderRadius: "50%" }}
                      alt="user"
                    />
                  </div>
                ) : undefined}
              </div>
            ) : undefined}

            {isShowThreePoints && isContainOnlyText && isUserMessage ? (
              <div
                className="col-1 pl-1 pt-2 hover-three-dots"
                style={{ cursor: "pointer" }}
                onClick={(): void => {
                  setIsShowMenuBar(true, adminMessage.id);
                }}
                onMouseEnter={() => setIsMouseDots(true)}
                onMouseLeave={() => setIsMouseDots(false)}
              >
                <div>
                  <img
                    src={isMouseDots ? chosedThreeDots : threeDots}
                    alt="three dots"
                  />
                </div>
              </div>
            ) : undefined}

            {(isContainMessageAudio ||
              isContainImage ||
              isContainVideo ||
              isContainFile ||
              (adminMessage?.attachment?.includes("audio") &&
                !adminMessage?.attachment?.includes("audio_messages"))) &&
            !isChannelMessages &&
            isUserMessage ? (
              <div
                className={`col-1 pl-1 hover-three-dots ${
                  isContainFile ||
                  (adminMessage?.attachment?.includes("audio") &&
                    !adminMessage?.attachment?.includes("audio_messages"))
                    ? "pt-3"
                    : "pt-2"
                }`}
                style={{
                  cursor: "pointer",
                }}
                onClick={(): void => {
                  setIsShowMenuBar(true, adminMessage.id);
                }}
                onMouseEnter={() => setIsMouseDots(true)}
                onMouseLeave={() => setIsMouseDots(false)}
              >
                <div>
                  <img
                    src={isMouseDots ? chosedThreeDots : threeDots}
                    alt="three dots"
                  />
                </div>
              </div>
            ) : undefined}

            <div className={"col-10 ml-2"}>
              <div
                className="d-flex"
                style={{
                  justifyContent: isUserMessage ? "flex-end" : "start",
                }}
              >
                <div
                  className={`${
                    !isUserMessage ? "justify-content-between w-100" : ""
                  } d-flex`}
                >
                  <div
                    className={
                      isUserMessage
                        ? "admin-message-wrap"
                        : "opponent-message-wrap"
                    }
                    onClick={() => {
                      if (isContainOnlyText && setIsShowThreePoints) {
                        setIsShowThreePoints(true, adminMessage.id);
                      }
                    }}
                    onMouseEnter={(): void => {
                      if (isContainOnlyText && setIsShowThreePoints) {
                        setIsShowThreePoints(
                          !isShowThreePoints,
                          adminMessage.id
                        );
                      }
                    }}
                    style={{
                      position: "relative",
                      border: isUserMessage
                        ? "1px solid #50bcff"
                        : "1px solid rgba(0, 0, 0, 0.05)",
                      background: isUserMessage
                        ? "#50BCFF"
                        : !whiteBackground
                        ? "rgba(0, 0, 0, 0.05)"
                        : "white",
                      borderRadius: isUserMessage
                        ? "15px 15px 0px 15px"
                        : "15px 15px 15px 0px",
                      maxWidth: "400px",
                    }}
                  >
                    {!isContainMessageAudio && isChannelMessages ? (
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          border: "1px solid rgba(0, 0, 0, 0.05)",
                          borderRadius: "50%",
                          position: "absolute",
                          right: "-7px",
                          top: "-7px",
                          background: "white",
                        }}
                      >
                        {adminMessage?.level_image_link ? (
                          <img
                            src={adminMessage?.level_image_link}
                            alt="level"
                            width="24"
                            height="24"
                            style={{ position: "relative", top: "-1px" }}
                          />
                        ) : undefined}
                      </div>
                    ) : undefined}

                    <div>
                      {adminMessage &&
                      (adminMessage.text || adminMessage.message) ? (
                        <div
                          style={{
                            paddingBottom: "7px",
                            paddingRight:
                              adminMessage?.text?.length >= 22
                                ? "24px"
                                : isUserMessage
                                ? "73px"
                                : "43px",
                            paddingLeft: "12px",
                            paddingTop: "7px",
                            textAlign: "initial",
                            wordWrap: "break-word",
                            color: isUserMessage ? "white" : "",
                          }}
                        >
                          {!isChannelMessages && adminMessage?.text ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: linkify(adminMessage?.text as string),
                              }}
                            />
                          ) : (
                            adminMessage?.message && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: linkify(
                                    adminMessage?.message as string
                                  ),
                                }}
                              />
                            )
                          )}
                        </div>
                      ) : undefined}

                      {adminMessage &&
                      adminMessage.createdAt &&
                      !isContainMessageAudio &&
                      isUserMessage ? (
                        <div
                          className="message-date"
                          style={{
                            position: "absolute",
                            right: "8px",
                            bottom: "6px",
                            color: isUserMessage
                              ? "rgb(255 255 255 / 60%)"
                              : "",
                          }}
                        >
                          <div className="d-flex">
                            <div className="pr-1" style={{ paddingTop: "2px" }}>
                              {DateUtils.getHoursAndMinutesFromCreatedDate(
                                adminMessage.createdAt
                              )}
                            </div>

                            <div className="pl-1">
                              <img
                                src={
                                  adminMessage && adminMessage.isRead
                                    ? messageReadedIcon
                                    : messageNotReadedIcon
                                }
                                alt="isread message"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          {adminMessage && adminMessage.createdAt ? (
                            <div
                              className="message-date"
                              style={{
                                position: "absolute",
                                right: "8px",
                                bottom: "7px",
                                color: isUserMessage
                                  ? "rgb(255 255 255 / 60%)"
                                  : "",
                              }}
                            >
                              {DateUtils.getHoursAndMinutesFromCreatedDate(
                                adminMessage.createdAt
                              )}
                            </div>
                          ) : undefined}
                        </>
                      )}
                    </div>

                    {isContainImage ? (
                      <div
                        style={{
                          wordWrap: "break-word",
                          padding: "10px 0 30px 0",
                        }}
                      >
                        <img
                          alt="message"
                          onClick={(): void => {
                            setShowedImageLink(
                              `${APPLICATION_SERVER}/files/${adminMessage.attachment}`
                            );
                          }}
                          className="d-flex w-100 pt-1 c-p"
                          src={`${APPLICATION_SERVER}/files/${adminMessage.attachment}`}
                        />
                      </div>
                    ) : undefined}

                    {isContainFile ? (
                      <div
                        style={{
                          padding: "11px",
                          wordWrap: "break-word",
                        }}
                      >
                        <a
                          className="message-name-file d-flex"
                          href={`${APPLICATION_SERVER}/files/${adminMessage.attachment}`}
                          download={true}
                        >
                          <img
                            src={isUserMessage ? whiteFileIcon : blueFileIcon}
                            alt="file"
                          />
                          <div
                            style={{
                              wordWrap: "break-word",
                              width: "160px",
                              paddingLeft: "10px",
                              color: isUserMessage ? "white" : "",
                            }}
                          >
                            {adminMessage?.attachment?.slice(17)}
                          </div>
                        </a>
                      </div>
                    ) : undefined}

                    {isContainVideo ? (
                      <div
                        style={{ padding: "10px 0 30px 0" }}
                        className="message-video-block"
                        onClick={(): void => {
                          if (setLinkOfShowedVideo) {
                            setLinkOfShowedVideo(
                              `${APPLICATION_SERVER}/files/${adminMessage.attachment}`
                            );
                          }
                        }}
                      >
                        <video style={{ width: "100%" }} controls>
                          <source
                            src={`${APPLICATION_SERVER}/files/${adminMessage.attachment}`}
                          />
                        </video>
                      </div>
                    ) : undefined}

                    {isContainYoutubeLink ? (
                      <div
                        className="video"
                        style={{
                          position: "relative",
                          paddingBottom: "56.25%" /* 16:9 */,
                          paddingTop: 25,
                          height: 0,
                        }}
                      >
                        <iframe
                          title="youtube video"
                          className="w-100 h-100"
                          allow="fullscreen;"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                          }}
                          src={`https://www.youtube.com/embed/${
                            adminMessage.message
                              ? adminMessage.message.slice(32)
                              : adminMessage?.text?.slice(32)
                          }`}
                          frameBorder="0"
                        />
                      </div>
                    ) : undefined}

                    {adminMessage &&
                    adminMessage.attachment &&
                    adminMessage.attachment.includes("audio") &&
                    !adminMessage.attachment.includes("audio_messages") ? (
                      <MusicMessage
                        isUserMessage={isUserMessage}
                        createdAt={DateUtils.getHoursAndMinutesFromCreatedDate(
                          adminMessage && (adminMessage.createdAt as string)
                        )}
                        //@ts-ignore
                        levelIcon={adminMessage?.attachment}
                        audioSrc={`${APPLICATION_SERVER}/files/${adminMessage.attachment}`}
                      />
                    ) : undefined}
                  </div>

                  {((isShowThreePoints &&
                    isContainOnlyText &&
                    isChannelMessages &&
                    isUserAdmin) ||
                    isContainImage ||
                    isContainFile ||
                    isContainMessageAudio ||
                    isContainVideo ||
                    (adminMessage?.attachment?.includes("audio") &&
                      !adminMessage?.attachment?.includes("audio_messages"))) &&
                  isChannelMessages ? (
                    <div
                      className={`pl-1 hover-three-dots ${
                        isContainFile ? "pt-4" : "pt-2"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={(): void => {
                        setIsShowMenuBar(true, adminMessage.id);
                      }}
                      onMouseEnter={() => setIsMouseDots(true)}
                      onMouseLeave={() => setIsMouseDots(false)}
                    >
                      <div>
                        <img
                          loading="lazy"
                          src={isMouseDots ? chosedThreeDots : threeDots}
                          alt="three dots"
                        />
                      </div>
                    </div>
                  ) : undefined}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex  w-100">
            <div
              className={`${
                isUserMessage
                  ? "justify-content-end ml-3"
                  : isChannelMessages
                  ? "justify-content-end"
                  : "justify-content-start"
              } d-flex `}
            >
              {!isUserMessage ? (
                <div className="col-1 pt-2">
                  <div
                    className="user-icon"
                    onClick={(): void => {
                      BrowserHistoryRouter.moveTo(
                        `/users/${adminMessage.senderId}`
                      );
                    }}
                  >
                    <img
                      src={
                        userAvatar
                          ? `${APPLICATION_SERVER}/files/${userAvatar}`
                          : whiteEllips
                      }
                      width="32"
                      height="32"
                      style={{ borderRadius: "50%" }}
                      alt="user"
                    />
                  </div>
                </div>
              ) : undefined}

              {!isChannelMessages && isUserMessage ? (
                <div
                  className={`col-1 pl-1 hover-three-dots ${
                    isContainMessageAudio ? "" : "pt-2"
                  }`}
                  style={{
                    cursor: "pointer",
                    paddingTop: isContainMessageAudio ? "17px" : "",
                  }}
                  onClick={(): void => {
                    setIsShowMenuBar(true, adminMessage.id);
                  }}
                  onMouseEnter={() => setIsMouseDots(true)}
                  onMouseLeave={() => setIsMouseDots(false)}
                >
                  <div>
                    <img
                      src={isMouseDots ? chosedThreeDots : threeDots}
                      alt="three dots"
                    />
                  </div>
                </div>
              ) : undefined}

              <div
                className={
                  !isChannelMessages && isContainMessageAudio
                    ? "col-10 ml-2"
                    : "col-10"
                }
              >
                {isContainMessageAudio ? (
                  <>
                    <AudioMessage
                      isRead={adminMessage.isRead}
                      isChannelMessages={isChannelMessages}
                      createdAt={DateUtils.getHoursAndMinutesFromCreatedDate(
                        adminMessage && (adminMessage.createdAt as string)
                      )}
                      audioSrc={`${APPLICATION_SERVER}/files/${adminMessage.attachment}`}
                      isUserMessage={isUserMessage}
                      levelIcon={adminMessage.level_image_link}
                    />
                  </>
                ) : undefined}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageItem;
