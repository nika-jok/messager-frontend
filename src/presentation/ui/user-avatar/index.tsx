import { withStyles, createStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { APPLICATION_SERVER } from "../../../constants";
import emptyAvatar from "../../../assets/img/channels/upload-image.svg";

interface Props {
  isOnline: boolean;
  avatar: string;
  isBigImage?: boolean;
  isMediumImage?: boolean;
}

const UserAvatar = (props: Props): JSX.Element => {
  const { isOnline, avatar, isBigImage, isMediumImage } = props;

  const StyledBadge = withStyles((theme) =>
    createStyles({
      badge: {
        backgroundColor: isOnline ? "#50BCFF" : "",
        color: isOnline ? "#50BCFF" : "",
        boxShadow: isOnline
          ? `0 0 0 2px ${theme.palette.background.paper}`
          : "",
        "&::after": {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          animation: isOnline ? "$ripple 1.2s infinite ease-in-out" : "",
          border: isOnline ? "1px solid currentColor" : "",
          content: '""',
        },
      },
      "@keyframes ripple": {
        "0%": {
          transform: "scale(.8)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(2.4)",
          opacity: 0,
        },
      },
    })
  )(Badge);
  return (
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      variant="dot"
    >
      {avatar ? (
        <Avatar
          style={{
            height: isBigImage ? "72px" : "48px",
            width: isBigImage ? "72px" : "48px",
          }}
          alt="user"
          src={`${APPLICATION_SERVER}/files/${avatar}`}
        />
      ) : (
        <Avatar
          style={{
            height: isBigImage ? "72px" : isMediumImage ? "48px" : "48px",
            width: isBigImage ? "72px" : isMediumImage ? "48px" : "48px",
          }}
          alt="user"
          src={emptyAvatar}
        />
      )}
    </StyledBadge>
  );
};

export default UserAvatar;
