import { connect } from "react-redux";
import Notitications from "./Notifications";
import { setId } from "../../store/auth/actions";

const NotificationsContainer = (props) => {
  const {  id, setId } = props;

  return <Notitications  id={id} setId={setId} />;
};
const putStateToProps = (state) => ({
  id: state.auth.id,
});

const putActionsToProps = {
  setId,
};
export default connect(
  putStateToProps,
  putActionsToProps
)(NotificationsContainer);
