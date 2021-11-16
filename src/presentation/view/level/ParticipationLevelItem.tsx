import React from "react";

import Grid from "@material-ui/core/Grid";

import whiteEllipse from "../../../assets/img/channels/white-ellipse.svg";
import star from "../../../assets/img/channels/star.svg";
import arrowDown from "../../../assets/img/channels/arrow-bottom.svg";
import ChannelListLevels from "../../../data/models/level/ChannelListLevels";

interface Props {
  level: ChannelListLevels;
}

const ParticipationLevelItem = (props: Props) => {
  const { level } = props;
  const { name, description, price_per_month, level_image_link } = level;

  return (
    <div style={{ paddingTop: "25px" }}>
      <Grid container spacing={2}>
        <Grid xs={2}>
          <div
            className="d-flex justify-content-center pt-2"
            style={{ paddingTop: "10px" }}
          >
            <img
              src={level_image_link ? level_image_link : whiteEllipse}
              alt="level icon"
              className="user-icon"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.05)",
              }}
            />
          </div>
        </Grid>

        <Grid xs={9}>
          <div style={{ paddingTop: "10px" }}>
            <div className="d-flex">
              <div>{name}</div>
              <div
                className="text-gray"
                style={{ paddingLeft: "4px", paddingTop: "2px" }}
              >
                ${price_per_month} per month
              </div>
              <div className="text-gray" style={{ paddingLeft: "4px" }}>
                <img src={star} alt="star" />
              </div>
            </div>

            <div className="text-gray" style={{ wordBreak: "break-all" }}>
              {description}
            </div>
          </div>
        </Grid>

        <Grid xs={1}>
          <div style={{ paddingTop: "10px" }}>
            <img src={arrowDown} alt="apple" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ParticipationLevelItem;
