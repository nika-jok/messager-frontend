import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import ApiHelper from '../../helpers/api/bio/users'
import { Grid } from '@material-ui/core'
import BrowserHistoryRouter from '../../utils/BrowserHistoryRouter'
import arrowBack from '../../assets/img/channels/arrow-back.svg'
import confirmCheck from '../../assets/img/channels/confirm-check.svg'
import addContactImage from '../../assets/img/menu/add-contacts-image.svg'
import Input from '../../presentation/ui/input/Input'
import FormValidator from '../../utils/FormValidator'

function Me(props) {
  const params = new URLSearchParams(window.location.search)
  const [message, setMessage] = useState('')

  const { isMobile, goBack, side = 'left', newContact, setLastOpened } = props
  const [email, setEmail] = useState(params.get('email') || '')
  const [firstName, setFirstName] = useState(params.get('firstName') || '')
  const [lastName, setLastName] = useState(params.get('lastName') || '')
  const [isShowFirstNameError, setIsShowFirstNameError] = useState(false)
  const [isShowLastNameError, setIsShowLastNameError] = useState(false)
  const [isShowEmailError, setIsShowEmailError] = useState(false)

  useEffect(() => {
    if (!isMobile) {
      if (Object.keys(newContact)?.length) {
        setEmail(newContact.email)
        setFirstName(newContact.firstName)
        setLastName(newContact.lastName)
      }
    }
  }, [])

  const [redirect, setRedirect] = useState(false)
  const api = new ApiHelper()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    const user = await api.getContactByEmail(email.trim())
    if (!user.message !== 'Success') {
      setMessage(`${firstName} is not in messages yet`)
    }

    const data = await api.addContact(
      user.data.id,
      firstName.trim(),
      lastName.trim()
    )
    if (data.status === 200 || data.status === 422) {
      if (isMobile) {
        return setRedirect(`/messages/private/${user.data.id}`)
      } else {
        setLastOpened('dialogs')
      }
    }

    return setMessage(data.message)
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

  const isValidFieldsForAddContact = () => {
    let isValid = true

    if (!firstName) {
      setIsShowFirstNameError(true)
      isValid = false
    }

    if (!lastName) {
      setIsShowLastNameError(true)
      isValid = false
    }

    if (!email) {
      setIsShowEmailError(true)
      isValid = false
    }

    if (!FormValidator.isValidEmail(email)) {
      setIsShowEmailError(true)
      isValid = false
    }

    return isValid
  }

  return (
    <div
      className="page-container pt-2"
      style={{
        position: isMobile ? 'fixed' : 'relative',
        maxWidth: isMobile ? '488px' : '100% ',
      }}
    >
      <div style={{ padding: isMobile ? '3px 15px' : '' }}>
        <Grid container spacing={2}>
          <Grid xs={1} style={{ marginRight: '10px' }}>
            <div className="arrow-back-block">
              <div
                className="icon-hover"
                onClick={() => {
                  if (isMobile) {
                    BrowserHistoryRouter.goBack()
                  } else {
                    goBack(side)
                  }
                }}
              >
                <img src={arrowBack} alt="arrow back" />
              </div>
            </div>
          </Grid>
          <Grid xs={9}>
            <div className="page-title">Новый контакт</div>
          </Grid>
          <Grid xs={1}>
            <div className="next-page pt-0">
              <button
                className="icon-hover"
                style={{ lineHeight: '36px', paddingTop: 0, marginTop: '7px' }}
                onClick={(e) => {
                  e.preventDefault()
                  if (isValidFieldsForAddContact()) {
                    handleSubmit(e)
                  }
                }}
              >
                <img src={confirmCheck} alt="confirm-checkmark" />
              </button>
            </div>
          </Grid>

          <Grid xs={12}>
            <div
              className="d-flex justify-content-center"
              style={{ paddingTop: '33px' }}
            >
              <div className="image-upload">
                <label htmlFor="file-input">
                  <img
                    src={addContactImage}
                    alt="upload"
                    style={{
                      width: '80px',
                      height: '80px',
                      border: ' 1px solid rgba(0, 0, 0, 0.05)',
                      borderRadius: '50%',
                    }}
                  />
                </label>
                <input
                  id="file-input"
                  type="file"
                  onChange={(e) => {
                    if (
                      e.target &&
                      e.target.files &&
                      e.target.files.length >= 1
                    ) {
                      this.setState({ levelImage: e.target.files[0] })
                    }
                  }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
        <div style={{ width: '600px', margin: 'auto' }}>
          <div style={{ paddingTop: '20px' }}>
            <label className="d-block">Имя</label>
            <Input
              className={`${isShowFirstNameError ? 'error-border' : ''}`}
              value={firstName}
              type="text"
              placeholder="Имя нового контакта"
              onChange={(e) => {
                setIsShowFirstNameError(false)
                setFirstName(e.target.value)
              }}
            />
          </div>

          <div style={{ paddingTop: '10px' }}>
            <label className="d-block">Фамилия</label>
            <Input
              className={`${isShowLastNameError ? 'error-border' : ''}`}
              value={lastName}
              type="text"
              placeholder="Фамилия нового контакта"
              onChange={(e) => {
                setIsShowLastNameError(false)
                setLastName(e.target.value)
              }}
            />
          </div>
          <div style={{ paddingTop: '10px' }}>
            <label className="d-block">Адрес электронной почты</label>
            <Input
              className={`${isShowEmailError ? 'error-border' : ''}`}
              value={email}
              type="text"
              placeholder="Адрес эл. почты контакта"
              onChange={(e) => {
                setIsShowEmailError(false)
                setEmail(e.target.value)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Me
