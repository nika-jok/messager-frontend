import React from "react";
import messageSentTime from "../../helpers/time/messageSent";
import { APPLICATION_SERVER } from "../../constants";

export default function TitlebarGridList(props) {
  const { files } = props;
  return (
    <li>
      {files.map((el, index) => {
        return (
          <ul key={index}>
            <a href={APPLICATION_SERVER + "/files/" + el.path} download>
              Загрузить
            </a>{" "}
            {messageSentTime(el.createdAt)}
          </ul>
        );
      })}
    </li>
  );
}
