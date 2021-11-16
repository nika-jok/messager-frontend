/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback'
import ApiHelper from '../../helpers/api/contacts'
import UserItem from '../../presentation/view/invite-users/UserItem'
import Menu from '../Menu/Menu'

import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import BrowserHistoryHelper from '../../utils/BrowserHistoryRouter'
import DateUtils from '../../utils/DateUtils'
import addContactIcon from '../../assets/img/menu/add-contact-user.svg'
import Loading from '../../utils/LoadingComponent'
import InfiniteWaypoint from '../InfiniteWayPoint'
import { CONTACTS_COUNT_OF_UPLOADING } from '../../constants'
import SearchInput from '../SearchInput'

function Me(props) {
  const { isMobile, chosedModal, setChosedId, setLastOpened, setChosedModal } =
    props

  const [isLoading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isAlreadyHas, setAlreadyHas] = useState(false)
  const [isUsername, setIsUsername] = useState(false)
  const [contacts, setContacts] = useState([])
  const [searchedList, setSearchedContactsList] = useState([])
  const [totalPages, setTotalPages] = useState()
  const [page, setPage] = useState(2)

  const api = new ApiHelper()

  useEffect(async () => {
    setLoading(true)
    const data = await api.getContacts(1, CONTACTS_COUNT_OF_UPLOADING)
    setTotalPages(Math.round(data?.total / CONTACTS_COUNT_OF_UPLOADING))
    setContacts(data.data)
    setLoading(false)
    return () => {
      setContacts([])
    }
  }, [])

  const loadMore = async () => {
    setLoading(true)
    if (totalPages >= page) {
      const contacts = await api.getContacts(page, CONTACTS_COUNT_OF_UPLOADING)
      setContacts((prev) => [...prev, ...contacts.data])
      setPage((prev) => prev + 1)
    }
    setLoading(false)
  }

  const [debouncedCallback] = useDebouncedCallback(async (value) => {
    if (value[0] === '@') {
      setIsUsername(true)
      const slicedUsername = value.slice(1)

      if (!slicedUsername) return setSearchedContactsList(contacts)

      const data = await api.getContactsByUsername(slicedUsername.trim())
      setAlreadyHas(true)
      setSearchedContactsList(data.data)
    } else {
      if (!value) return setSearchedContactsList(contacts)
      console.log(value)
      const data = await api.getContactsByDisplayedName(value.trim())
      setAlreadyHas(true)
      setSearchedContactsList(data.data)
    }
  }, 500)

  const changeInput = async (e) => {
    setSearch(e.target.value)
    debouncedCallback(e.target.value)
  }

  const generateContact = (contact, i) => {
    const { avatar, isOnline, lastOnline, displayedName, id } = contact
    const lastSeen = DateUtils.lastSeenAt(new Date(lastOnline))
    return (
      <UserItem
        isFirstItem={i === 0}
        key={`user_item-${i}`}
        id={id}
        setChosedId={setChosedId}
        setLastOpened={setLastOpened}
        userName={displayedName}
        userImage={avatar}
        isMobile={isMobile}
        lastVisitTime={
          isOnline
            ? 'Онлайн'
            : lastSeen
            ? `был(а) ${lastSeen} назад`
            : 'был(а) недавно'
        }
      />
    )
  }

  return (
    <>
      <Menu
        isMobile={isMobile}
        setChosedModal={setChosedModal}
        chosedModal={chosedModal}
      />
      <div className="search-input-wrap">
        <SearchInput placeholder="Поиск людей" onChange={changeInput} />
      </div>

      {false ? (
        <div className="row justify-content-center pt-3 pb-2">
          <Loading />
        </div>
      ) : (
        <>
          <div
            id="user-messages-block"
            className="messages-scrollbar"
            style={{ padding: isMobile ? '15px' : '', position: 'relative' }}
          >
            {search && isAlreadyHas ? (
              searchedList?.length ? (
                searchedList?.map((contact) => generateContact(contact))
              ) : (
                <div className="d-flex justify-content-center text-gray">
                  Ничего не найдено
                </div>
              )
            ) : (
              <>
                {contacts?.length ? (
                  contacts?.map((contact, i) => generateContact(contact, i))
                ) : (
                  <div className="text-gray text-center pt-4">
                    Здесь будут показаны Ваши контакты
                  </div>
                )}
              </>
            )}

            {contacts?.length && totalPages > page ? (
              <InfiniteWaypoint
                content={contacts}
                totalPages={totalPages}
                currentPage={page}
                onEnter={loadMore}
                direction={'bottom'}
              />
            ) : undefined}
          </div>

          <div
            className="centre-to-right-bottom"
            onClick={() => {
              BrowserHistoryHelper.moveTo('/contacts/new_contact')
            }}
          >
            <div className="text-right">
              <img className="c-p" src={addContactIcon} alt="add contact" />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Me
