import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Recorder from "../Recorder/Recorder";
import MicIcon from "../../assets/img/channels/record-voice.svg";
import recordPoint from "../../assets/img/channels/record-point.svg";
import submitMessageIcon from "../../assets/img/channels/submit-message-icon.svg";
import fileIcon from "../../assets/img/channels/file.svg";
import Textarea from "../../presentation/ui/textarea";
import useHover from "../PrivateMessages/useHover";
import useStopwatch from "../PrivateMessages/useStopWatch";
import ApiHelperMessages from '../../helpers/api/private_messages'

const PrivateMessageFooterWrap = styled.div`
  position: fixed;
  bottom: 0;
`;

const PrivateMessageFooter = ({
  id,
  inBan,
  isBanned,
  onChangeFile,
  shouldAutoFocus,
  sendTextMessage,
  isCleanInput,
}) => {
  const [newMessage, setNewMessage] = React.useState("");
  const [ref, isHovered] = useHover(null);
  const [isRecorded, setRecorded] = React.useState(false);
  const [audioMessage, setAudioMessage] = React.useState(null);
  const { ms, start, stop } = useStopwatch();
  const [error, setError] = React.useState("");

  const apiMessages = new ApiHelperMessages()

  const autoSize = React.useCallback((e) => {
    const messages = document.querySelector(".messages-scrollbar");
    e.target.style.height = 0;
    const height = Math.min(118, e.target.scrollHeight);
    const wHeight = window.innerHeight;
    if (height === 34) {
      wHeight <= 575
        ? (messages.style.height = "94vh")
        : (messages.style.height = "90vh");
    } else if (height === 55) {
      wHeight <= 575
        ? (messages.style.height = "92vh")
        : (messages.style.height = "88vh");
    } else if (height === 76) {
      wHeight <= 575
        ? (messages.style.height = "88vh")
        : (messages.style.height = "85vh");
    } else if (height === 97) {
      wHeight <= 575
        ? (messages.style.height = "85vh")
        : (messages.style.height = "82vh");
    } else if (height === 118) {
      wHeight <= 575
        ? (messages.style.height = "81vh")
        : (messages.style.height = "79vh");
    }
    e.target.style.height = `${height}px`;
    e.target.scrollTop = e.target.scrollHeight;
  }, []);

  const printNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  React.useEffect(() => {
    setNewMessage("");
  }, [isCleanInput]);

  const record = (e) => {
    e.preventDefault();
    setRecorded(true);
    start();
  };

  const stopRecord = (e) => {
    e.preventDefault();
    setRecorded(false);
    stop();
  };

  useEffect(() => {
    (async () => {
      if (
        !isHovered ||
        !audioMessage ||
        audioMessage.stopTime - audioMessage.startTime < 200
      ) {
        return setRecorded(false);
      }
      setRecorded(false);
      audioMessage.blob.lastModified = new Date();
      audioMessage.blob.name = "audio.mp3";
      await apiMessages.create("audio", id, null, audioMessage.blob);
    })();
  }, [audioMessage]);

  return (
    <PrivateMessageFooterWrap>
      {inBan ? <div>You are in ban</div> : undefined}
      {isBanned ? <div>You've added this user to ban</div> : undefined}
      {inBan || isBanned ? undefined : (
        <div className="messages-container">
          <div className="container">
            <div className="messages-enter-block pl-2">
              <div className="d-flex w-100">
                {isRecorded ? (
                  <div className="w-100">
                    <div className="d-flex pl-4 pr-4 justify-content-between send-audio-message">
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
                                width: "24px",
                                transform: "rotate(45deg)",
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : undefined}
                {!isRecorded ? (
                  <>
                    <div
                      className="col-1 pl-0 d-flex align-items-center messages-wrapper-upload"
                      style={{ marginRight: "2px" }}
                    >
                      <div className="image-upload" style={{ paddingTop: 0 }}>
                        <label
                          htmlFor="file-input"
                          className="icon-hover c-p"
                          style={{ marginBottom: 0 }}
                        >
                          <img src={fileIcon} alt="file" />
                        </label>

                        <input
                          id="file-input"
                          type="file"
                          onChange={(e) =>
                            onChangeFile(e.target.files[0], newMessage)
                          }
                        />
                      </div>
                    </div>

                    <div
                      className="col-9 pl-1 pr-0 messages-wrapper-textarea"
                      style={{ paddingTop: "5px" }}
                    >
                      <Textarea
                        shouldAutoFocus={shouldAutoFocus}
                        style={{
                          resize: "none",
                          overflow: "hidden auto",
                        }}
                        isSmallInput={true}
                        size={"lg"}
                        placeholder="Напишите сообщение"
                        value={newMessage}
                        onChange={(e) => {
                          printNewMessage(e);
                        }}
                        onKeyDown={(e) => {
                          if (
                            e.keyCode === 13 &&
                            e.shiftKey === false &&
                            newMessage
                          ) {
                            sendTextMessage(newMessage);
                          }
                          autoSize(e);
                        }}
                      />
                    </div>
                  </>
                ) : undefined}

                <div className="col-1 pl-4 d-flex align-items-center messages-wrapper-send">
                  {newMessage ? (
                    <div
                      style={{
                        textAlign: "end",
                      }}
                      onClick={() => sendTextMessage(newMessage)}
                    >
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
                              width: "24px",
                              transform: "rotate(45deg)",
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Recorder
                        record={isRecorded}
                        onStop={(data) => {
                          setAudioMessage(data);
                        }}
                      />
                      {isRecorded ? undefined : (
                        <div className="icon-hover c-p" onClick={record}>
                          <img src={MicIcon} alt="record audio message" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PrivateMessageFooterWrap>
  );
};

PrivateMessageFooter.propTypes = {
  inBan: PropTypes.bool,
  isBanned: PropTypes.bool,
  onChangeFile: PropTypes.func,
  shouldAutoFocus: PropTypes.bool,
  sendTextMessage: PropTypes.func,
};

PrivateMessageFooter.defaultProps = {
  inBan: false,
  isBanned: false,
  shouldAutoFocus: false,
  onChangeFile: () => {},
  sendTextMessage: () => {},
};

export default PrivateMessageFooter;
