import React, { useState } from 'react'
import ApiHelper from '../../helpers/api/auth/auth'
import { Button, Container, CssBaseline } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import useStyles from './style'

function Base() {
  const classes = useStyles()

  const [redirect, setRedirect] = useState(null)
  const api = new ApiHelper()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await api.verify()
    if (data.status === 200) return setRedirect('/')
  }

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: redirect,
        }}
      />
    )
  }

  return (
    <Container component="div" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1>Messages</h1>
        <h3 className={classes.top}>Бесплатный мессенджер с диалогами</h3>
        <h3 className={classes.bottom}>и каналами с монетизацией</h3>
        <br />
        <Button onClick={handleSubmit}>Начать общение</Button>
      </div>
    </Container>
  )
}

export default Base
