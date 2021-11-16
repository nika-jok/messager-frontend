import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import messageSentTime from "../../helpers/time/messageSent";
import { APPLICATION_SERVER } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "start",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 700,
    height: 450,
    border: 1,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function TitlebarGridList(props) {
  const classes = useStyles();
  const { id, videos } = props;
  const [video, openVideo] = useState();
  const openVideoAction = (e, path) => {
    e.preventDefault();
    openVideo(path);
  };
  const closeVideoAction = (e, path) => {
    e.preventDefault();
    openVideo(null);
  };
  const redirectToVideo = (startId) => {
    props.history.push(`/users/${id}/files/video/view?start_id=${startId}`);
  };

  return (
    <>
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          <GridListTile key="Subheader" cols={3} style={{ height: "auto" }}>
            <ListSubheader component="div">Photos</ListSubheader>
          </GridListTile>
          {videos.map((tile, index) => (
            <GridListTile
              key={index}
              cols={1}
              onClick={(e) => redirectToVideo(tile.id)}
            >
              <video
                src={APPLICATION_SERVER + "/files/" + tile.path}
                alt={tile.title}
                controls
              />
              <GridListTileBar title={messageSentTime(tile.createdAt)} />
            </GridListTile>
          ))}
        </GridList>
        {video ? <AlertDialog path={video} close={closeVideoAction} /> : null}
      </div>
    </>
  );
}

function AlertDialog(props) {
  const { path, close } = props;

  return (
    <div>
      <Dialog
        open={!!path}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <video src={APPLICATION_SERVER + "/files/" + path} controls />
        </DialogContent>
      </Dialog>
    </div>
  );
}
