/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import User from './User'

function UserContainer(props) {
  const { id } = useParams()
  return <User id={id} history={props.history} isMobile={props.isMobile} />
}

const putStateToProps = (state) => ({})

const putActionsToProps = {}

export default connect(putStateToProps, putActionsToProps)(UserContainer)
