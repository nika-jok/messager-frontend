import React, { useState } from "react";

import userIcons from "../../../assets/img/channels/user-icons.svg";
import arrowBack from ".././../../assets/img/channels/arrow-back.svg";

import UserItem from "./UserItem";
import Grid from "@material-ui/core/Grid";
import Input from "../../ui/input/Input";

import BrowserHistoryRouter from "../../../utils/BrowserHistoryRouter";

const InviteUsersComponent = () => {
  const [userName, setUserName] = useState("");

  return (
    <div className="page-container pt-2">
      <div id="invite-users-root">
        <Grid container spacing={2}>
          <Grid xs={1}>
            <div className="arrow-back-block">
              <div
                onClick={(): void =>
                  BrowserHistoryRouter.moveTo("/new-channel")
                }
              >
                <img src={arrowBack} alt="arrow back" />
              </div>
            </div>
          </Grid>
          <Grid xs={8}>
            <div className="page-title">Пригласить участников</div>
          </Grid>
          <Grid xs={2}>
            <div className="next-page pl-4">
              <button
                onClick={() => {
                  BrowserHistoryRouter.moveTo("/channel/channel");
                }}
              >
                Далее
              </button>
            </div>
          </Grid>
        </Grid>

        <div className="pt-5">
          <Input
            placeholder="Поиск людей"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setUserName(e.currentTarget.value);
            }}
          />
        </div>

        <div className="d-flex pt-4">
          <img src={userIcons} alt="userIcons" />
          <div className="pl-2 text-gray">Контакты</div>
        </div>

        <UserItem userName={"Юлия Мендель"} lastVisitTime={"30"} />
        <UserItem userName={"Артем Абдуллин"} lastVisitTime={"15"} />
      </div>
    </div>
  );
};

export default InviteUsersComponent;
