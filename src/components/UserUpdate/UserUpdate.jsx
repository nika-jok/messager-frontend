/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import ApiHelper from '../../helpers/api/bio/users'
import { Grid } from '@material-ui/core'
import BrowserHistoryHelper from '../../utils/BrowserHistoryRouter'
import Loading from '../../utils/LoadingComponent'
import arrowBack from '../../assets/img/channels/arrow-back.svg'
import confirmCheck from '../../assets/img/channels/confirm-check.svg'
import addContactImage from '../../assets/img/menu/add-contact-user.svg'
import Input from '../../presentation/ui/input/Input'

function Me(props) {
  const {
    isMobile,
    setChosedModal,
    setIsUpdate,
    isUpdate,
    setLastOpened,
    goBack,
  } = props

  const [user, setUser] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    about: '',
    avatar: '',
    contact: null,
  })

  const [isLoading, setLoading] = useState(false)
  const [displayedFirstName, setDisplayedFirstName] = useState('')
  const [displayedLastName, setDisplayedLastName] = useState('')
  const [isShowFirstNameError, setIsShowFirstNameError] = useState(false)
  const [isShowLastNameError, setIsShowLastNameError] = useState(false)

  const api = new ApiHelper()

  const id = props.id
    ? props.id
    : BrowserHistoryHelper.getHistory().location.pathname.slice(14)

  useEffect(async () => {
    setLoading(true)
    const data = await api.getUser(id)

    const {
      email,
      username,
      firstName,
      lastName,
      phone,
      about,
      avatar,
      contact,
      isOnline,
      lastOnline,
      displayedFirstName,
      displayedLastName,
      inBan,
      isBanned,
    } = data.data.bio

    setUser({
      email,
      username,
      firstName,
      lastName,
      phone,
      about,
      avatar,
      contact,
      isOnline,
      lastOnline,
      displayedFirstName,
      displayedLastName,
      inBan,
      isBanned,
    })

    setDisplayedFirstName(displayedFirstName)
    setDisplayedLastName(displayedLastName)

    setLoading(false)
    return
  }, [])

  const updateDisplayedName = async (e) => {
    e.preventDefault()
    const data = await api.updateDisplayedName(
      +id,
      displayedFirstName,
      displayedLastName
    )

    if (data.status) {
      if (isMobile) {
        BrowserHistoryHelper.moveTo(`/users/${id}`)
      } else {
        setLastOpened('user-info')
      }
    }
    if (!isMobile) {
      setIsUpdate(!isUpdate)
    }
  }

  const isValidFieldsForAddContact = () => {
    let isValid = true

    if (!displayedFirstName) {
      setIsShowFirstNameError(true)
      isValid = false
    }

    if (!displayedLastName) {
      setIsShowLastNameError(true)
      isValid = false
    }

    return isValid
  }

  return (
    <div
      className="page-container pt-2"
      style={{
        position: isMobile ? 'fixed' : 'relative',
      }}
    >
      {isLoading ? (
        <div className="d-flex justify-content-center pt-4 pb-4">
          <Loading />
        </div>
      ) : (
        <div>
          <div>
            <Grid container spacing={2}>
              <Grid xs={1} style={{ marginRight: '10px' }}>
                <div className="arrow-back-block">
                  <div
                    className="icon-hover"
                    onClick={() => {
                      if (isMobile) {
                        BrowserHistoryHelper.goBack()
                      } else {
                        goBack('right')
                      }
                    }}
                  >
                    <img src={arrowBack} alt="arrow back" />
                  </div>
                </div>
              </Grid>
              <Grid xs={9}>
                <div className="page-title">Изменить контакт</div>
              </Grid>
              <Grid xs={1}>
                <div className="next-page pt-0">
                  <button
                    className="icon-hover"
                    style={{
                      lineHeight: '36px',
                      paddingTop: 0,
                      marginTop: '7px',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      if (isValidFieldsForAddContact) {
                        updateDisplayedName(e)
                      }
                    }}
                  >
                    <img src={confirmCheck} alt="confirm-checkmark" />
                  </button>
                </div>
              </Grid>
            </Grid>

            <div
              style={{
                maxWidth: !isMobile ? '600px' : '',
                margin: !isMobile ? '0 auto' : '',
              }}
            >
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
                        className="rounded-circle"
                        style={{
                          width: '80px',
                          height: '80px',
                          border: ' 1px solid rgba(0, 0, 0, 0.05)',
                        }}
                      />
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      onChange={(e) => {
                        if (e.target?.files?.length) {
                          this.setState({ levelImage: e.target.files[0] })
                        }
                      }}
                    />
                  </div>
                </div>
              </Grid>

              <div style={{ paddingTop: '20px' }}>
                <label className="d-block">Имя</label>
                <Input
                  className={`${isShowFirstNameError ? 'error-border' : ''}`}
                  value={displayedFirstName}
                  defaultValue={user.firstName}
                  placeholder="Имя контакта"
                  onChange={(e) => setDisplayedFirstName(e.target.value)}
                />
              </div>
              <div style={{ paddingTop: '20px' }}>
                <label className="d-block">Фамилия</label>
                <Input
                  className={`${isShowLastNameError ? 'error-border' : ''}`}
                  placeholder="Фамилия контакта"
                  defaultValue={user.lastName}
                  value={displayedLastName}
                  onChange={(e) => setDisplayedLastName(e.target.value)}
                />
              </div>

              <div style={{ paddingTop: '20px' }}>
                <label className="d-block">Адрес электронной почты</label>
                <Input
                  disabled={true}
                  value={user.email}
                  onChange={(e) => setDisplayedLastName(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Me
