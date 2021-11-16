import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Menu from "@material-ui/core/Menu";
import Picker from "emoji-picker-react";
import emojiIcon from "../../assets/img/channels/emojiIconSvg.svg";

const useStyles = makeStyles((theme) => ({}));

export default function Emoticons(props) {
  const { emoticonCb } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onEmojiClick = (e, emojiObject) => {
    setAnchorEl(null);
    emoticonCb(emojiObject);
  };

  return (
    <div className={classes.mainInfo}>
      <div onClick={handleClick}>
        <img src={emojiIcon} alt="emoji" />
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Picker onEmojiClick={onEmojiClick} />
      </Menu>
    </div>
  );
}
