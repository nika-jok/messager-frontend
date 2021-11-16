//@ts-nocheck

import { useState, useRef, useEffect } from "react";

import "./index.css";
import waveSvg from "../../../assets/img/audio/wave.svg";
import blackWaveSvg from "../../../assets/img/audio/black-wave.svg";
import playSvg from "../../../assets/img/channels/pause-icon.svg";
import bluePlaySvg from "../../../assets/img/channels/blue-pause-icon.svg";
import bluePauseSvg from "../../../assets/img/channels/blue-pause.svg";
import pauseSvg from "../../../assets/img/channels/pauseAudio.svg";
import DateUtils from "../../../utils/DateUtils";
import messageReadedIcon from "../../../assets/img/messages/message-readed.svg";
import messageNotReadedIcon from "../../../assets/img/messages/message-not-readed.svg";

interface Props {
  audioSrc: string;
  createdAt: string;
  isChannelMessages?: boolean;
  isUserMessage?: boolean;
  isRead?: boolean;
  levelIcon?: string;
}

const AudioMessage = ({
  audioSrc,
  createdAt,
  isChannelMessages,
  isUserMessage,
  isRead,
  levelIcon,
}: Props) => {
  const audioElem = useRef(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShowCurrentTime, setIsShowCurrentTime] = useState(false);
  const [audioMessageDuration, setAudioMessageDuration] = useState();

  const togglePlay = () => {
    setIsShowCurrentTime(true);
    if (!isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  };

  useEffect(() => {
    audioElem.current.addEventListener(
      "playing",
      () => {
        setIsPlaying(true);
      },
      false
    );
    audioElem.current.addEventListener(
      "ended",
      () => {
        setIsShowCurrentTime(false);
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      },
      false
    );
    audioElem.current.addEventListener(
      "pause",
      () => {
        setIsPlaying(false);
      },
      false
    );
    audioElem.current.addEventListener("timeupdate", () => {
      const duration = (audioElem.current && audioElem.current.duration) || 0;
      setCurrentTime(audioElem.current.currentTime);
      setProgress((audioElem.current.currentTime / duration) * 100);
    });
  }, []);

  return (
    <div className="mb-2" style={{ position: "relative" }}>
      {isChannelMessages ? (
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
          <img
            src={levelIcon}
            alt="level"
            style={{ position: "absolute", top: "-1px", width: '24px'}}
          />
        </div>
      ) : undefined}

      <div
        className="message__audio"
        style={{
          borderRadius: isUserMessage
            ? "15px 15px 0px 15px"
            : "15px 15px 15px 0px",
          backgroundColor: !isUserMessage ? "white" : "#50bcff",
        }}
      >
        <audio
          preload="metadata"
          ref={audioElem}
          src={audioSrc}
          preload="auto"
        />
        <div
          className="message__audio-progress"
          style={{
            width: progress + "%",
            backgroundColor: isUserMessage
              ? "white"
              : "rgba(80, 188, 255, 0.3)",
            borderRadius: isUserMessage
              ? "15px 15px 0px 15px"
              : "15px 15px 15px 0px",
          }}
        />
        <div className="message__audio-info">
          <div className="message__audio-btn">
            <button onClick={togglePlay}>
              {isPlaying ? (
                <img
                  src={!isUserMessage ? bluePauseSvg : pauseSvg}
                  alt="Pause svg"
                />
              ) : (
                <img
                  src={!isUserMessage ? bluePlaySvg : playSvg}
                  alt="Play svg"
                />
              )}
            </button>
          </div>
          <div className="message__audio-wave" style={{ paddingRight: "60px" }}>
            <img src={isUserMessage ? waveSvg : blackWaveSvg} alt="Wave svg" />
          </div>

          {isRead && createdAt && isUserMessage ? (
            <div
              className="message-date"
              style={{
                position: "absolute",
                right: "-7px",
                bottom: "-12px",
                color: isUserMessage ? "white" : "",
              }}
            >
              <div className="d-flex">
                <div className="pr-1" style={{ paddingTop: "2px" }}>
                  {createdAt}
                </div>

                <div className="pl-1">
                  <img
                    src={isRead ? messageReadedIcon : messageNotReadedIcon}
                    alt="isread message"
                  />
                </div>
              </div>
            </div>
          ) : (
            createdAt && (
              <div
                className="message-date"
                style={{
                  position: "absolute",
                  right: "-7px",
                  bottom: "-12px",
                  color: isUserMessage ? "white" : "",
                }}
              >
                {createdAt}
              </div>
            )
          )}
        </div>

        <span
          className="pl-4 message-date"
          style={{ position: "relative", color: "white", fontSize: "12px" }}
        >
          {isShowCurrentTime &&
          audioElem &&
          audioElem.current &&
          audioElem.current.duration
            ? `${DateUtils.convertTimeToCurrentTime(
                currentTime
              )}/${DateUtils.convertMsToMinutesAndSeconds(
                audioElem.current.duration
              )}`
            : undefined}
        </span>
      </div>
    </div>
  );
};

export default AudioMessage;
