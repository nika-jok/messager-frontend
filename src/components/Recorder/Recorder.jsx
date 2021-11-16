import { ReactMic } from "react-mic";
import "./Recorder.css";

function Recorder(props) {
  const { record, onStop } = props;

  return (
    <ReactMic
      record={record}
      className={"hidden-recorder"}
      onStop={onStop}
      strokeColor="#0000ff"
      backgroundColor="#FFFFFF"
      mimeType={"audio/mp3"}
    />
  );
}

export default Recorder;
