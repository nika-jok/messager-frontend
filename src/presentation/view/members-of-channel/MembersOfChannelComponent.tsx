import React from "react";

import Grid from "@material-ui/core/Grid";
import UserItem from "../invite-users/UserItem";

import arrowBack from "../../../assets/img/channels/arrow-back.svg";
import Input from "../../ui/input/Input";
import BrowserHistoryRouter from "../../../utils/BrowserHistoryRouter";

const MembersOfChannel = () => {
  return (
    <div className="page-container pt-2">
      <div id="edit-channel-root">
        <Grid container spacing={2}>
          <Grid xs={1}>
            <div className="arrow-back-block">
              <div
                onClick={(): void =>
                  BrowserHistoryRouter.moveTo("/channel/edit-channel")
                }
              >
                <img  src={arrowBack} alt="arrow back" />
              </div>
            </div>
          </Grid>
          <Grid xs={8}>
            <div className="page-title">Участники</div>
          </Grid>
        </Grid>

        <div className="d-flex pt-5">
          <Input placeholder="Поиск людей" />
        </div>

        <UserItem userName={"Артем Абдуллин"} lastVisitTime={"25"} />
        <UserItem userName={"Юлия Мендель"} lastVisitTime={"14"} />
      </div>
    </div>
  );
};

export default MembersOfChannel;
