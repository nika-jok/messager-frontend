/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import UserUpdate from "./UserUpdate";

function UserContainer(props) {
  let { id } = useParams();


  return <UserUpdate id={id} history={props.history} />;
}

const putStateToProps = (state) => ({});

const putActionsToProps = {};

export default connect(putStateToProps, putActionsToProps)(UserContainer);
