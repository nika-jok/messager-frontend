import { Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import closeWindowIcon from '../../../assets/img/menu/close-window-icon.svg'
import ApiHelperMe from '../../../helpers/api/bio/me'
import ApiHelperMessages from '../../../helpers/api/private_messages'
import ApiHelper from '../../../helpers/api/contacts'
import BrowserHistoryRouter from '../../../utils/BrowserHistoryRouter'
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback'
import Loading from '../../../utils/LoadingComponent'
import DisplaySearch from '../../../components/Chats/DisplaySearch'
import channelIcon from '../../../assets/img/menu/create-channel.svg'
import userIcon from '../../../assets/img/channels/user-icons.svg'
import UserItem from '../invite-users/UserItem'
import DateUtils from '../../../utils/DateUtils'
import { DIALOGS_COUNT_OF_UPLOADING_CHATS } from '../../../constants'
import StorageHelper from '../../../utils/StorageHelper'
import SearchInput from '../../../components/SearchInput'
import styled from 'styled-components'

const NewMessageWrap = styled.div`
  .new-message-title {
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.9);
    padding-top: 20px;
    padding-left: 24px;
  }

  .close-arrow {
    padding-top: 12px;
  }

  .new-message-items {
    padding-left: 23px;
  }

  .image-block {
    width: 25px;
  }

  .contacts-text {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 14px;
    color: rgba(0, 0, 0, 0.5);
    padding-top: 6px;
  }

  .contacts-list {
    padding-left: 18px;
  }
`

const NewMessage = ({
  setChosedModal,
  isMobile,
  setChosedId,
  setLastOpened,
  goBack,
}): JSX.Element => {
  const [userId, setId] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [search, setSearch] = useState('')
  const [searchedContactList, setSearchedContactList] = useState([])
  const [searchedGlobalList, setSearchedGlobalList] = useState([])
  const [chatList, setChatsList] = useState([])

  const [isAlreadyHas, setAlreadyHas] = useState(false)
  const apiContacts = new ApiHelper()
  const apiMessages = new ApiHelperMessages()
  const apiMe = new ApiHelperMe()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const data = await apiMessages.getChats(
        1,
        DIALOGS_COUNT_OF_UPLOADING_CHATS
      )

      const { id } = (await apiMe.getMe()).data.bio
      setId(id)
      setChatsList(data.data.list.rows)
      setLoading(false)
    })()
  }, [])

  const [debouncedCallback] = useDebouncedCallback(async (value) => {
    //@ts-ignore
    if (value[0] === '@') {
      const slicedUsername = value.slice(1)
      if (!slicedUsername) return
      const data = await apiContacts.getGlobalUsersUsername(slicedUsername)
      setSearchedContactList(data?.data?.bio?.contacts)
      setSearchedGlobalList(data?.data?.bio?.global)
      setAlreadyHas(true)
    } else {
      if (!value) return
      const data = await apiContacts.getGlobalUsersName(value)
      setSearchedContactList(data?.data?.bio?.contacts)
      setSearchedGlobalList(data?.data?.bio?.global)
      setAlreadyHas(true)
    }
  }, 500)

  const changeInput = async (e: any) => {
    setAlreadyHas(false)
    setSearch(e.target.value)
    debouncedCallback(e.target.value)
  }

  return (
    <NewMessageWrap>
      <div className="page-container pt-2" style={{ position: 'initial' }}>
        <Grid container spacing={2}>
          <Grid xs={1} style={{ marginRight: '5px' }}>
            <div className="arrow-back-block close-arrow">
              <div
                className="icon-hover"
                onClick={() => {
                  if (isMobile) {
                    if (BrowserHistoryRouter.getHistory()) {
                      BrowserHistoryRouter.goBack()
                    } else {
                      BrowserHistoryRouter.moveTo('/')
                    }
                  } else {
                    goBack('left')
                  }
                }}
              >
                <img src={closeWindowIcon} alt="arrow back" />
              </div>
            </div>
          </Grid>
          <Grid xs={8}>
            <div className={`new-message-title ${isMobile ? '' : 'pl-4'}`}>
              Новое сообщение
            </div>
          </Grid>

          <Grid xs={12}>
            <>
              <div className="search-input-wrap">
                <SearchInput placeholder="Поиск людей" onChange={changeInput} />
              </div>
              <div className="new-message-items">
                <div
                  className="d-flex pl-3"
                  onClick={() => {
                    if (isMobile) {
                      BrowserHistoryRouter.moveTo('/channel/create-channel')
                    } else {
                      setChosedModal('create-channel')
                    }
                  }}
                >
                  <div className="image-block">
                    <img width="16" height="16" src={channelIcon} alt="user" />
                  </div>
                  <div className="pl-3 pt-1 text-gray text-dark">
                    Новый канал
                  </div>
                </div>

                <div
                  className="d-flex pl-3 pt-4 pb-4"
                  onClick={() => {
                    if (isMobile) {
                      BrowserHistoryRouter.moveTo('/contacts/new_contact')
                    } else {
                      setChosedModal('new-contact')
                    }
                  }}
                >
                  <div className="image-block">
                    <img width="22" height="18" src={userIcon} alt="user" />
                  </div>
                  <div className="pl-3 c-p contacts-text">Контакты</div>
                </div>
              </div>

              {isLoading ? (
                <div className="d-flex justify-content-center pt-4 pb-4">
                  <Loading />
                </div>
              ) : (
                <div
                  id={isMobile ? 'user-messages-block' : ''}
                  className={isMobile ? 'messages-scrollbar contacts-list' : ''}
                >
                  {search && isAlreadyHas ? (
                    (searchedContactList && searchedContactList.length) ||
                    (searchedGlobalList && searchedGlobalList.length) ? (
                      <DisplaySearch
                        style={{ color: 'red' }}
                        global={searchedGlobalList}
                        contacts={searchedContactList}
                        history={BrowserHistoryRouter.getHistory()}
                      />
                    ) : (
                      <div className="text-center text-gray pt-3">
                        Ничего не найдено
                      </div>
                    )
                  ) : chatList && chatList.length >= 1 ? (
                    chatList.map((contact: any) => {
                      const { user1, user2 } = contact
                      const opponent =
                        StorageHelper.getUserData().user_id === user1.id
                          ? user2
                          : user1

                      const name = () => {
                        if (opponent) {
                          if (opponent.displayedName) {
                            return opponent.displayedName
                          }
                          if (opponent.firstName && opponent.lastName) {
                            return `${opponent.firstName} ${opponent.lastName}`
                          } else if (opponent.firstName) {
                            return `${opponent.firstName}`
                          }

                          if (
                            opponent.firstName !== null &&
                            opponent.lastName !== null
                          ) {
                            return `${
                              opponent.firstName && opponent.firstName
                            }${opponent.firstName && opponent.lastName && ' '}${
                              opponent.lastName && opponent.lastName
                            }`
                          }
                          return opponent.email
                        }
                      }

                      return (
                        <div
                          className="pl-2"
                          onClick={(): void => {
                            if (isMobile) {
                              BrowserHistoryRouter.moveTo(
                                `/messages/private/${opponent.id}`
                              )
                            } else {
                              BrowserHistoryRouter.moveTo(
                                `/messages/private/${opponent.id}`
                              )
                              setLastOpened('dialogs')
                              setChosedId(opponent.id)
                            }
                          }}
                        >
                          <UserItem
                            isMobile={isMobile}
                            setChosedId={setChosedId}
                            setLastOpened={setLastOpened}
                            key={`user_item-${contact?.senderId}`}
                            userName={name()}
                            lastVisitTime={
                              opponent?.isOnline
                                ? 'Онлайн'
                                : `был(а) ${DateUtils.lastSeenAt(
                                    new Date(opponent?.lastOnline)
                                  )} назад`
                            }
                            userImage={opponent?.avatar}
                          />
                        </div>
                      )
                    })
                  ) : undefined}
                </div>
              )}
            </>
          </Grid>
        </Grid>
      </div>
    </NewMessageWrap>
  )
}

export default NewMessage
