//@ts-nocheck

import { useState, useRef, useEffect } from "react";

import "./index.css";
import playSvg from "../../../assets/img/channels/pause-icon.svg";
import pauseSvg from "../../../assets/img/channels/pauseAudio.svg";
import DateUtils from "../../../utils/DateUtils";
import bluePlaySvg from "../../../assets/img/channels/blue-pause-icon.svg";
import bluePauseSvg from "../../../assets/img/channels/blue-pause.svg";

interface Props {
  audioSrc: string;
  createdAt: string;
  isUserMessage?: boolean;
}

const MusicMessage = ({ audioSrc, createdAt, isUserMessage,levelIcon }: Props) => {
  const audioElem = useRef(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShowCurrentTime, setIsShowCurrentTime] = useState(false);

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
      const duration = (audioElem?.current && audioElem?.current?.duration) || 0;
      setCurrentTime(audioElem?.current?.currentTime);
      setProgress((audioElem?.current?.currentTime / duration) * 100);
    });
  }, []);

  return (
    <div
      className="message__audio"
      style={{ backgroundColor: isUserMessage ? "" : "white" }}
    >
      <audio ref={audioElem} src={audioSrc} preload="auto" id="audiofile" />
      <div
        className="message__audio-progress"
        style={{
          width: progress + "%",
          backgroundColor: isUserMessage ? "white" : "rgba(80, 188, 255, 0.3)",
          borderRadius: isUserMessage
            ? "15px 15px 0px 15px"
            : "15px 15px 15px 0px",
        }}
      />
      <div className="message__audio-info">
        <div className="message__audio-btn pr-2">
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
        <div
          className="pl-2 message-name-file"
          style={{
            wordWrap: "break-word",
            width: "156px",
            color: !isUserMessage ? "" : "white",
          }}
        >
          {audioSrc.slice(40)}
        </div>
      </div>

      <span
        className="pl-4 message-date"
        style={{
          position: "relative",
          color: "white",
          bottom: "3px",
          fontSize: "12px",
        }}
      >
        {isShowCurrentTime
          ? `${DateUtils.convertTimeToCurrentTime(
              currentTime
            )}/${DateUtils.convertMsToMinutesAndSeconds(
              document.getElementById("audiofile").duration
            )}`
          : document.getElementById("audiofile") &&
            DateUtils.convertMsToMinutesAndSeconds(
              document.getElementById("audiofile").duration
            )}
      </span>
    </div>
  );
};

export default MusicMessage;
