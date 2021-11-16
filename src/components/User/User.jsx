/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import ApiHelper from '../../helpers/api/bio/users'
import Button from '../../presentation/ui/button'

import Grid from '@material-ui/core/Grid'
import arrowBack from '../../assets/img/channels/arrow-back.svg'
import BrowserHistoryHelper from '../../utils/BrowserHistoryRouter'
import blockUserIcon from '../../assets/img/messages/block-user.svg'
import Loading from '../../utils/LoadingComponent'
import openMoreInfo from '../../assets/img/messages/open-more-info.svg'
import openMessagesIcon from '../../assets/img/messages/open-messages.svg'
import userInContactsIcon from '../../assets/img/messages/contact-status-user.svg'
import addInContactIcon from '../../assets/img/messages/add-user-in-contacts.svg'
import editUserIcon from '../../assets/img/channels/edit-icon.svg'
import deleteIcon from '../../assets/img/messages/remove.svg'
import Popup from 'reactjs-popup'
import lastOnlineFn from '../../helpers/time/lastOnline'
import UserAvatar from '../../presentation/ui/user-avatar'
import editContact from '../../assets/img/channels/edit-icon.svg'
import blockUserImage from '../../assets/img/user/block.svg'
import declineImage from '../../assets/img/user/trash.svg'
import usernameSymbol from '../../assets/img/user/username_symbol.svg'

function Me(props) {
  const {
    id,
    setChosedModal,
    isMobile,
    setChosedChannelForEdit,
    setLastOpened,
    isUpdate,
    goBack,
    setNewContact,
  } = props
  const [isShowPopup, setIsShowPopup] = useState(false)
  const popupRef = useRef(null)
  const [isShowMenuBar, setIsShowMenuBar] = useState(false)

  const [user, setUser] = useState({
    email: '',
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    about: '',
    avatar: '',
    contact: null,
  })

  const [isLoading, setLoading] = useState(false)
  const [displayedName, setDisplayedName] = useState('')
  const [isUserInContacts, setIsUserInContacts] = useState(false)

  const api = new ApiHelper()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const data = await api.getUser(
        id ? id : BrowserHistoryHelper.getHistory().location.pathname.slice(7)
      )
      const contacts = (await api.getUserContacts()).data
      console.log(contacts)
      const isInContants = contacts.find(
        (contact) => contact.id === data?.data?.bio?.id
      )
      setIsUserInContacts(!!isInContants)

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
        id: data.data.bio.id,
        email,
        username,
        firstName,
        lastName,
        phone,
        about,
        avatar,
        contact,
        isOnline,
        lastOnline: lastOnlineFn(lastOnline, isOnline),
        displayedFirstName,
        displayedLastName,
        inBan,
        isBanned,
      })
      if (!isMobile) {
        setNewContact({
          id: data.data.bio.id,
          email,
          username,
          firstName,
          lastName,
          phone,
          about,
          avatar,
          contact,
          isOnline,
          lastOnline: lastOnlineFn(lastOnline, isOnline),
          displayedFirstName,
          displayedLastName,
          inBan,
          isBanned,
        })
      }

      setDisplayedName(displayedName)
      setLoading(false)

      //const count = await api.getAttachmentsCount(id);
      // setCount(count.data?.list);

      //const photos = (await api.getFiles(id, "photo")).data?.list;
      // const videos = (await api.getFiles(id, "video")).data?.list;
      //const audios = (await api.getFiles(id, "audio")).data?.list;
      // const files = (await api.getFiles(id, "another")).data?.list;
      // const audioMessages = (await api.getFiles(id, "audio_message")).data
      //  ?.list;

      //  setPhotos(photos);
      //  setVideo(videos);
      //setAudio(audios);
      //  setFiles(files);
      //setAudioMessages(audioMessages);

      return
    })()
  }, [isUpdate])

  /*const handleSubmitAddContact = async (e) => {
    e.preventDefault();
    setMessage("");
    const data = await api.addContact(+id, displayedName);
    if (data.status !== 200) return setMessage(data.message);

    setUser({ ...user, contact: true });
    return setMessage(data.message);
  };

  const handleSubmitAddContactRedirect = async () => {
    BrowserHistoryHelper.moveTo(`/contacts/new_contact?email=${user.email}`);
  };

  const handleSubmitRemoveContact = async (e) => {
    e.preventDefault();
    setMessage("");
    const data = await api.removeContact(+id);
    if (data.status !== 200) return setMessage(data.message);
    setUser({ ...user, contact: null });
    return setMessage(data.message);
  };

  const ban = async (e) => {
    e.preventDefault();
    setMessage("");
    const data = await api.ban(+id);
    if (data.status === 200) setUser({ ...user, isBanned: true });
    return setMessage(data.message);
  };

  const unban = async (e) => {
    e.preventDefault();
    setMessage("");
    const data = await api.unban(+id);
    if (data.status === 200) setUser({ ...user, isBanned: false });
    return setMessage(data.message);
  };*/

  const displayName = () => {
    if (user.displayedFirstName) {
      return (
        user.displayedFirstName +
        (user.displayedLastName ? ' ' + user.displayedLastName : '')
      )
    }
    if (user.firstName || user.lastName) {
      return `${user.firstName ? user.firstName : ''}${
        user.firstName && user.lastName ? ' ' : ''
      }${user.lastName ? user.lastName : ''}`
    }
    return user.email
  }

  const redirectFilesPage = async (type) => {
    BrowserHistoryHelper.moveTo(`/users/${id}/files/${type}/grid`)
  }

  return (
    <div
      className="page-container pt-2"
      style={{
        background: isShowMenuBar ? 'rgba(0, 0, 0, 0.05)' : '',
        height: '100vh',
        position: isMobile ? 'fixed' : 'relative',
      }}
      id="user-root"
    >
      <div
        style={{
          padding: isMobile ? '3px 15px' : '',
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={1} style={{ marginRight: '10px' }}>
            <div className="arrow-back-block">
              <div
                className="icon-hover"
                onClick={() => {
                  if (isMobile) {
                    BrowserHistoryHelper.goBack()
                  } else {
                    console.log('right')
                    goBack('right')
                  }
                }}
              >
                <img src={arrowBack} alt="arrow back" />
              </div>
            </div>
          </Grid>
          <Grid xs={8}>
            <div className="page-title">Информация</div>
          </Grid>
        </Grid>

        {isLoading ? (
          <div className="d-flex justify-content-center pt-4 pb-2">
            <Loading />
          </div>
        ) : (
          <div
            style={{
              margin: isMobile ? '' : 'auto',
              width: isMobile ? '' : '600px',
            }}
          >
            <div className="d-flex pl-2 pt-5">
              <div className="channel-info-icon с-p">
                <UserAvatar
                  isOnline={user.isOnline}
                  avatar={user.avatar}
                  isBigImage={true}
                />
              </div>
              <div className="pl-3 pt-3">
                <div className="username">{displayName()}</div>
                <div className="text-gray pt-1">
                  {user.isOnline ? 'В сети' : user.lastOnline}
                </div>
              </div>
            </div>

            <div className="d-flex pt-4">
              {!isMobile ? (
                <Popup
                  open={isShowPopup}
                  onOpen={() => setIsShowPopup(!isShowPopup)}
                  ref={popupRef}
                  trigger={
                    <div className="pl-2 c-p">
                      <img src={openMoreInfo} alt="open menu bar" />
                    </div>
                  }
                >
                  <div
                    className="popup-wrap"
                    onClick={() => {
                      setIsShowPopup(!isShowPopup)
                      if (isMobile) {
                        setChosedModal('edit-channel')
                        setChosedChannelForEdit(this.state.channelName)
                      }
                    }}
                  >
                    <div
                      className="d-flex"
                      onClick={() => {
                        setIsShowPopup(!isShowPopup)

                        if (isMobile) {
                          BrowserHistoryHelper.moveTo(`/users/change/${id}`)
                        } else {
                          setChosedModal('chats')
                          setLastOpened('update-contact')
                        }
                      }}
                    >
                      <div>
                        <img src={editContact} alt="edit contact" />
                      </div>
                      <span className="pl-2">Изменить контакт</span>
                    </div>
                    
                    {/* fix only "change contact" on the web */}
                    {/* <div className="d-flex pt-3">
                      <div>
                        <img src={blockUserImage} alt="block user" />
                      </div>
                      <span className="pl-2">Заблокировать</span>
                    </div>
                    <div className="d-flex pt-3">
                      <div>
                        <img src={declineImage} alt="decline" />
                      </div>
                      <span className="pl-2">Удалить чат</span>
                    </div> */}
                  </div>
                </Popup>
              ) : (
                <div
                  className="pl-2 c-p"
                  onClick={() => {
                    if (isMobile) {
                      setIsShowMenuBar(!isShowMenuBar)
                    }
                  }}
                >
                  <img src={openMoreInfo} alt="open menu bar" />
                </div>
              )}

              <div
                className="pl-2 c-p"
                onClick={() => {
                  if (isMobile) {
                    BrowserHistoryHelper.moveTo(`/messages/private/${id}`)
                  } else {
                    setChosedModal('chats')
                    setLastOpened('dialogs')
                  }
                }}
              >
                <img src={openMessagesIcon} alt="open messages" />
              </div>
              <div className="pl-2 c-p">
                <img
                  onClick={() => {
                    if (isMobile) {
                      if (!isUserInContacts) {
                        BrowserHistoryHelper.moveTo(`/contacts/new_contact?email=${user?.email}&firstName=${user?.firstName}
                      &lastName=${user?.lastName}`)
                      }
                    } else {
                      setLastOpened('add-contact')
                    }
                  }}
                  src={isUserInContacts ? userInContactsIcon : addInContactIcon}
                  alt="contact status"
                />
              </div>
            </div>

            <div className="d-flex pt-3" style={{ fontSize: '15px' }}>
              {user.about}
            </div>
            <div
              className="d-flex pt-3 c-p"
              style={{ fontSize: '15px' }}
              onClick={() => {
                if (isMobile) {
                  BrowserHistoryHelper.moveTo(`/users/${user?.id}`)
                }
              }}
            >
              <div style={{ color: 'rgba(0, 0, 0, 0.9)' }}>
                <img src={usernameSymbol} alt="username symbol" />
              </div>
              <div className="link pl-2">{user.username}</div>
            </div>

            {isShowMenuBar && isMobile ? (
              <div className="row menu-bar-wrapper">
                <div>
                  <div>
                    <div
                      className="d-flex pt-3 pl-4"
                      style={{ cursor: 'pointer' }}
                    >
                      <div>
                        <img width="20" src={editUserIcon} alt="edit contact" />
                      </div>
                      <div
                        className="pl-2"
                        onClick={() => {
                          BrowserHistoryHelper.moveTo(
                            `/users/change/${BrowserHistoryHelper.getHistory().location.pathname.slice(
                              7
                            )}`
                          )
                        }}
                      >
                        Изменить контакт
                      </div>
                    </div>
                  </div>

                  {/* <div>
                    <div
                      className="d-flex pt-4 pl-4"
                      style={{ cursor: 'pointer' }}
                    >
                      <div>
                        <img src={blockUserIcon} width="20" alt="block user" />
                      </div>
                      <div className="pl-2">Заблокировать</div>
                    </div>
                  </div> */}

                  {/* <div>
                    <div
                      className="d-flex pt-4 pl-4"
                      style={{ cursor: 'pointer' }}
                    >
                      <div>
                        <img width="20" src={deleteIcon} alt="remove chat" />
                      </div>
                      <div className="pl-2">Удалить чат</div>
                    </div>
                  </div> */}
                </div>

                <div className="pt-4 d-flex justify-content-center w-100 pb-3">
                  <Button
                    onClick={() => {
                      setIsShowMenuBar(false)
                    }}
                  >
                    Отменить
                  </Button>
                </div>
              </div>
            ) : undefined}
          </div>
        )}
      </div>
    </div>
  )
}

export default Me
