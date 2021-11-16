import React from "react";

import settingsIcon from "../../../assets/img/messages/settings-icon.svg";
import usersIcon from "../../../assets/img/messages/usersIcon.svg";
import messagesIcon from "../../../assets/img/messages/messages-icon.svg";
import notificationIcon from "../../../assets/img/messages/notifyIcon.svg";

const MessagesBar = (): JSX.Element => {
  return (
    <div
      style={{ position: "absolute", bottom: "15px", left: "-5px" }}
      className="d-flex justify-content-center w-100"
    >
      <div className="d-flex justify-content-between w-75">
        <div className="messages-block">
          <img src={messagesIcon} alt="messages" />
        </div>

        <div className="users-block">
          <img src={usersIcon} alt="users" />
        </div>

        <div className="notification-block">
          <img src={notificationIcon} alt="notification" />
        </div>

        <div className="settings-block">
          <img src={settingsIcon} alt="settings" />
        </div>
      </div>
    </div>
  );
};

export default MessagesBar;
