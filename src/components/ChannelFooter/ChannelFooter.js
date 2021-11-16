import { useEffect, useState } from "react";
import styled from "styled-components";
import MicIcon from "../../assets/img/channels/recordVoiceIcon.svg";
import fileIcon from "../../assets/img/channels/file.svg";
import submitMessageIcon from "../../assets/img/channels/submit-message-icon.svg";
import Textarea from "../../presentation/ui/textarea";
import recordPoint from "../../assets/img/channels/record-point.svg";
import Recorder from "../../components/Recorder/Recorder";
import PropTypes from "prop-types";
import DateUtils from "../../utils/DateUtils";
import BrowserHistoryRouter from "../../utils/BrowserHistoryRouter";
import Utils from "../../utils/Utils";
import InfoModal from "../InfoModal";
import useStopWatch from "../PrivateMessages/useStopWatch";
import ApiHelperMessages from "../../helpers/api/private_messages";
import useHover from "../PrivateMessages/useHover";

const ChannelFooterWrap = styled.div``;

const ChannelFooter = ({
  createNewMessage,
  isMobile,
  channelName,
  setLastOpened,
  savedLevels,
  sendAudioMessage,
}) => {
  const [isRecorded, setIsRecorded] = useState(false);
  const [audioMessage, setAudioMessage] = useState(null);
  const [ref, isHovered] = useHover(null);
  const { ms, start, stop } = useStopWatch();
  const [message, setMessage] = useState();
  const [isShowSubmitMessageButton, setIsShowSubmitMessageButton] = useState();
  const [isShowErrorModal, setIsShowErrorModal] = useState(false);

  const record = (e) => {
    e.preventDefault();
    setIsRecorded(true);
    start();
  };

  const stopRecord = (e) => {
    e.preventDefault();
    setIsRecorded(false);
    stop();
  };

  const fileChangedHandler = (e) => {
    e.preventDefault();
    const fileSize = Utils.convertBytesToMegaBytes(e.target.files[0].size);
    if (fileSize <= 25) {
      createNewMessage(message, e.target.files[0]);
      setMessage("");
      setIsShowSubmitMessageButton(false);
    } else {
      setIsShowErrorModal(true);
    }
  };

  useEffect(() => {
    (async () => {
      if (
        !isHovered ||
        !audioMessage ||
        audioMessage.stopTime - audioMessage.startTime < 200
      ) {
        return setIsRecorded(false);
      }
      setIsRecorded(false);
      audioMessage.blob.lastModified = new Date();
      audioMessage.blob.name = "audio.mp3";
      debugger;
      await sendAudioMessage(audioMessage);
    })();
  }, [audioMessage]);

  return (
    <ChannelFooterWrap>
      <div className="">
        <div className="messages-container pt-0">
          <div style={{ maxWidth: "600px", margin: "auto" }}>
            <div className="container channel-wrapper-footer-block">
              <div
                className="channel-messages-enter-block container"
                style={{ width: "600px", margin: "auto" }}
              >
                <div className="row w-100 messages-channel-footer">
                  {isRecorded ? (
                    <div className="d-flex w-100 pl-4 pr-4 justify-content-between align-items-center">
                      <div className="d-flex">
                        <div>
                          <img src={recordPoint} alt="record" />
                        </div>
                        <div className="time-record pl-2 message-date pt-1">
                          {ms}
                        </div>
                      </div>
                      <div onClick={stopRecord}>
                        <div>
                          <label
                            className="icon-hover c-p"
                            style={{
                              paddingRight: "5px",
                              marginBottom: 0,
                            }}
                          >
                            <img
                              src={submitMessageIcon}
                              alt="submit message"
                              style={{
                                transform: "rotate(45deg)",
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : undefined}
                  {!isRecorded ? (
                    <>
                      <div className="col-1 pr-2 channel-wrapper-upload">
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
                            onChange={(e) => fileChangedHandler(e)}
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
                          value={message}
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
                              setMessage("");
                              setIsShowSubmitMessageButton(false);
                            }
                          }}
                        />
                      </div>
                    </>
                  ) : undefined}

                  <div
                    className="col-2 d-flex channel-wrapper-right pr-0"
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
                            if (isMobile) {
                              BrowserHistoryRouter.moveTo(
                                `/${channelName}/admin/choose-level`
                              );
                            } else {
                              setLastOpened("choose-level");
                            }
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
                              +{savedLevels?.length ? savedLevels.length : 0}
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
                              src={
                                savedLevels?.length >= 1
                                  ? savedLevels[0].level_image_link
                                  : undefined
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
                          setMessage("");
                          setIsShowSubmitMessageButton(false);

                          const textarea =
                            document.querySelector(".textarea-channel");
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
                      <>
                        <Recorder
                          record={isRecorded}
                          onStop={(data) => {
                            setAudioMessage(data);
                          }}
                        />
                        {isRecorded ? undefined : (
                          <>
                            <div
                              className="ml-2 channel-wrapper-mic icon-hover"
                              style={{ cursor: "pointer" }}
                              onClick={record}
                            >
                              <img src={MicIcon} alt="record audio message" />
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {console.log(isShowErrorModal)}
      {isShowErrorModal ? (
        <InfoModal
          isOpen={isShowErrorModal}
          onClose={() => setIsShowErrorModal(false)}
          title={"Ошибка"}
          desc={"Максимальный размер загружаемого файла до 25 МБ."}
        />
      ) : undefined}
    </ChannelFooterWrap>
  );
};

ChannelFooter.propTypes = {
  createNewMessage: PropTypes.func,
  isMobile: PropTypes.bool,
  channelName: PropTypes.string,
  setLastOpened: PropTypes.func,
  savedLevels: PropTypes.array,
};

ChannelFooter.defaultProps = {
  createNewMessage: () => {},
  isMobile: false,
  channelName: "",
  setLastOpened: () => {},
  savedLevels: [],
};

export default ChannelFooter;
