/* eslint-disable no-unused-vars */
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";
import CustomAvatar from "../Helpers/Avatar";
import { APPLICATION_SERVER } from "../../constants";
import lastOnlineFn from "../../helpers/time/lastOnline";
import UserAvatar from "../../presentation/ui/user-avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
  },
}));
function Contact(props) {
  const classes = useStyles();
  const { id, displayedName, isOnline, lastOnline, avatar } = props;

  const redirectToChat = () => {
    props.history.push(`/messages/private/${id}`);
  };
  return (
    <ListItem className={classes.root} onClick={redirectToChat}>
      <ListItemAvatar>
        <UserAvatar isOnline={isOnline} avatar={avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={displayedName}
        secondary={lastOnlineFn(lastOnline, isOnline)}
      />
    </ListItem>
  );
}

export default Contact;
