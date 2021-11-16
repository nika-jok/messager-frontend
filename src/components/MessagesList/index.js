import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '../../presentation/ui/button'
import MessageItem from '../../presentation/view/channel/MessageItem'
import InfiniteWaypoint from '../InfiniteWayPoint'
import AboutUser from '../AboutUser'
import removeImageIcon from '../../assets/img/channels/remove-photo.svg'
import DayUtils from '../../utils/DateUtils'
import ImagePortal from '../ImagePortal'
import LoadingComponent from '../../utils/LoadingComponent'
import Popup from 'reactjs-popup'

const MessagesListWrap = styled.div`
display: flex;
justify-content: center;
`

const MessagesList = ({
  totalPages,
  page,
  setIsShowMenuBar,
  name,
  isShowMenuBar,
  deleteMessage,
  username,
  about,
  messages,
  loadMore,
  differentDateIds,
  setChosedModal,
  setUserIdModal,
  isMobile,
  avatar,
  userId,
  divRef,
  isLoadingMessages,
}) => {
  const [isShowThreePoints, setIsShowThreePoints] = React.useState(false)
  const [threePointsMessageId, setThreePointsMessageId] = React.useState(false)
  const [messageId, setMessageId] = React.useState(false)
  const [showedImageLink, setShowedImageLink] = React.useState('')
  const popupRef = React.useRef()
  return (
    <MessagesListWrap>
      <div
        // onMouseUp={stopRecord}
        style={{ position: 'relative', flex: 'auto', maxWidth: '600px' }}
      >
        <div
          id="user-messages-block"
          className="messages-scrollbar"
          ref={divRef}
        >
          {totalPages <= page ? (
            <AboutUser fullname={name} username={username} desc={about} />
          ) : undefined}

          {isLoadingMessages ? (
            <div className="d-flex justify-content-center pt-3 pb-3">
              <LoadingComponent />
            </div>
          ) : undefined}
          <div
            style={{
              maxWidth: '600px',
              marginBottom: "60px",
              overflowY: 'scroll'
            }}
          >
            {messages?.length ? (
              messages?.map((message) => {
                return (
                  <div key={`private_message_block_${message.id}`}>
                    {differentDateIds?.includes(message.id) ? (
                      <div className="text-center pt-3 pb-3 text-gray">
                        {DayUtils.getDayAndMonthsFromDate(
                          new Date(message.createdAt)
                        )}
                      </div>
                    ) : undefined}
                    <MessageItem
                      setChosedModal={setChosedModal}
                      setUserIdModal={setUserIdModal}
                      isMobile={isMobile}
                      isShowAvatar={true}
                      whiteBackground={!isShowMenuBar}
                      setIsShowThreePoints={(isShowThreePoints, messageId) => {
                        setIsShowThreePoints(isShowThreePoints)
                        if (isShowThreePoints) {
                          setThreePointsMessageId(messageId)
                        }
                      }}
                      isShowThreePoints={
                        message.id === threePointsMessageId && isShowThreePoints
                      }
                      userAvatar={avatar}
                      userId={message.senderId}
                      isUserMessage={message.senderId === userId}
                      isChannelMessages={false}
                      key={`private_message_${message.id}`}
                      adminMessage={message}
                      setIsShowMenuBar={(isShowMenuBar, adminMessageId) => {
                        setIsShowMenuBar(isShowMenuBar)
                        setMessageId(adminMessageId)
                      }}
                      setShowedImageLink={(showedImageLink) => {
                        setShowedImageLink(showedImageLink)
                      }}
                    />
                  </div>
                )
              })
            ) : (
              <div className="text-center text-gray">Нет сообщений</div>
            )}

            {messages?.length && totalPages >= page ? (
              <InfiniteWaypoint
                content={messages}
                totalPages={totalPages}
                currentPage={page}
                onEnter={loadMore}
              />
            ) : undefined}
          </div>
        </div>
        {isShowMenuBar ? (
          <>
            {isMobile ? (
              <div className="row menu-bar-wrapper ml-0">
                <div>
                  <div
                    onClick={() => {
                      deleteMessage(messageId)
                      setIsShowMenuBar(false)
                    }}
                  >
                    <div
                      className="d-flex pt-3 pl-4"
                      style={{ cursor: 'pointer' }}
                    >
                      <div>
                        <img
                          className="pl-1"
                          src={removeImageIcon}
                          alt="remove icon"
                        />
                      </div>
                      <div
                        className="pl-3"
                        style={{
                          cursor: 'pointer',
                          paddingTop: '2px',
                        }}
                      >
                        Удалить
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 d-flex justify-content-center w-100 pb-3">
                  <Button
                    onClick={() => {
                      setIsShowMenuBar(false)
                      setIsShowThreePoints(false)
                    }}
                  >
                    Отменить
                  </Button>
                </div>
              </div>
            ) : (
              <Popup ref={popupRef} trigger={<button>Test</button>}>
                <div
                  className="popup-wrap"
                  onClick={() => {
                    this.props.setLastOpened('edit-channel')
                    this.props.setChosedChannelForEdit(this.state.channelName)
                  }}
                >
                  <div className="d-flex">
                    <div
                      onClick={() => {
                        deleteMessage(messageId)
                        setIsShowMenuBar(false)
                      }}
                    >
                      <div
                        className="d-flex pt-3 pl-4"
                        style={{ cursor: 'pointer' }}
                      >
                        <div>
                          <img
                            className="pl-1"
                            src={removeImageIcon}
                            alt="remove icon"
                          />
                        </div>
                        <div
                          className="pl-3"
                          style={{
                            cursor: 'pointer',
                            paddingTop: '2px',
                          }}
                        >
                          Удалить
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <span className="pl-2">
                      <Button
                        onClick={() => {
                          setIsShowMenuBar(false)
                          setIsShowThreePoints(false)
                        }}
                      >
                        Отменить
                      </Button>
                    </span>
                  </div>
                </div>
              </Popup>
            )}
          </>
        ) : undefined}
      </div>

      {showedImageLink ? (
        <ImagePortal
          isMobile={isMobile}
          image={showedImageLink}
          onClose={() => setShowedImageLink('')}
        />
      ) : undefined}
    </MessagesListWrap>
  )
}

MessagesList.propTypes = {
  totalPages: PropTypes.number,
  page: PropTypes.number,
  name: PropTypes.string,
  isShowMenuBar: PropTypes.bool,
  deleteMessage: PropTypes.func,
  username: PropTypes.string,
  about: PropTypes.string,
  messages: PropTypes.array,
  loadMore: PropTypes.func,
  differentDateIds: PropTypes.array,
  setChosedModal: PropTypes.func,
  setUserIdModal: PropTypes.func,
  isMobile: PropTypes.bool,
  avatar: PropTypes.string,
  userId: PropTypes.number,
  divRef: PropTypes.any,
  isLoadingMessages: PropTypes.bool,
}

MessagesList.defaultProps = {
  setIsShowMenuBar: () => {},
  deleteMessage: () => {},
  loadMore: () => {},
  setChosedModal: () => {},
  setUserIdModal: () => {},
  name: '',
  username: '',
  about: '',
  avatar: '',
  messages: [],
  differentDateIds: [],
  isMobile: false,
  isShowMenuBar: false,
  threePointsMessageId: 0,
  userId: 0,
  totalPages: 0,
  page: 0,
  divRef: null,
  isLoadingMessages: false,
}

export default MessagesList
