import { useState } from 'react'
import DateUtils from '../../utils/DateUtils'
import AboutChannel from '../../presentation/view/channel/AboutChannel'
import { v4 as uuidv4 } from 'uuid'
import MessageItem from '../../presentation/view/channel/MessageItem'
import Loading from '../../utils/LoadingComponent'
import { APPLICATION_SERVER } from '../../constants'
import InfiniteWaypoint from '../InfiniteWayPoint'
import PropTypes from 'prop-types'

const List = ({
  channelInfo,
  isLoadingMessages,
  messages,
  differentDateIds,
  setChannelInfoName,
  setLastOpened,
  isShowMenuBar,
  isUserAdmin,
  channelFiles,
  isLoading,
  loadMore,
  page,
  totalPages,
  setShowedImageLink,
  channelName,
  setIsShowMenuBar,
  setAdminIdMessage,
  threePointsMessageId,
  setThreePointsMessageId,
  channelRef,
}) => {
  const [isShowThreePoints, setIsShowThreePoints] = useState()

  return (
    <div className="w-100">
      <div
        ref={channelRef}
        className="messages-scrollbar"
        id="channel-messages-block"
      >
        <div className="w-100 pt-5 pb-3">
          <AboutChannel
            name={channelInfo.name}
            desc={channelInfo.description}
            isShowChannelName={true}
            link={channelInfo.link}
          />
        </div>
        {isLoadingMessages ? (
          <div className="d-flex justify-content-center pt-4 pb-4">
            <Loading />
          </div>
        ) : undefined}
        <div style={{ maxWidth: '600px', marginBottom: '50px' }}>
          {' '}
          {messages?.length
            ? messages.map((adminMessage) => {
                return (
                  <div key={`level_message_item_${uuidv4()}`}>
                    {differentDateIds?.length &&
                    differentDateIds.includes(adminMessage.id) ? (
                      <div className="text-center pt-3 pb-3 text-gray">
                        {DateUtils.getDayAndMonthsFromDate(
                          new Date(adminMessage.createdAt)
                        )}
                      </div>
                    ) : undefined}

                    <MessageItem
                      setChannelInfoName={() => {
                        setChannelInfoName(channelInfo?.link)
                      }}
                      setChosedModal={() => {
                        setLastOpened('channel-info')
                      }}
                      isShowAvatar={differentDateIds?.includes(adminMessage.id)}
                      whiteBackground={!isShowMenuBar}
                      isUserAdmin={isUserAdmin}
                      channelAvatar={
                        channelFiles[0]?.name && channelFiles[0]?.type
                          ? `${APPLICATION_SERVER}/files/storage/icons/${channelFiles[0].name}.${channelFiles[0].type}`
                          : ''
                      }
                      channelName={channelName}
                      adminMessage={adminMessage}
                      isUserMessage={false}
                      isChannelMessages={true}
                      setIsShowMenuBar={(isShowMenuBar, adminMessageId) => {
                        setIsShowMenuBar(true)
                        setAdminIdMessage(adminMessageId)
                      }}
                      setIsShowThreePoints={(isShowThreePoints, messageId) => {
                        setIsShowThreePoints(true)

                        if (isShowThreePoints) {
                          setThreePointsMessageId(messageId)
                        }
                      }}
                      isShowThreePoints={
                        adminMessage.id === threePointsMessageId &&
                        isShowThreePoints
                      }
                      setShowedImageLink={(showedImageLink) => {
                        setShowedImageLink(showedImageLink)
                      }}
                    />
                  </div>
                )
              })
            : undefined}
        </div>

        {messages?.length && totalPages >= page ? (
          <InfiniteWaypoint
            content={messages}
            totalPages={totalPages}
            currentPage={page}
            onEnter={loadMore}
          />
        ) : undefined}

        {isLoading ? (
          <div className="d-flex justify-content-center pt-4 pb-4">
            <Loading />
          </div>
        ) : undefined}
      </div>
    </div>
  )
}

List.defaultProps = {
  channelInfo: PropTypes.object,
  isLoadingMessages: PropTypes.bool,
  messages: PropTypes.array,
  differentDateIds: PropTypes.array,
  setChannelInfoName: PropTypes.func,
  setLastOpened: PropTypes.func,
  isShowMenuBar: PropTypes.bool,
  isUserAdmin: PropTypes.bool,
  channelFiles: PropTypes.array,
  isLoading: PropTypes.bool,
  loadMore: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  setShowedImageLink: PropTypes.func,
  channelName: PropTypes.string,
  setIsShowMenuBar: PropTypes.string,
  setAdminIdMessage: PropTypes.string,
  threePointsMessageId: PropTypes.number,
  setThreePointsMessageId: PropTypes.func,
}

List.propTypes = {
  channelInfo: {},
  isLoadingMessages: false,
  messages: [],
  differentDateIds: [],
  setChannelInfoName: () => {},
  setLastOpened: () => {},
  isShowMenuBar: false,
  isUserAdmin: false,
  channelFiles: [],
  isLoading: false,
  loadMore: () => {},
  page: 2,
  totalPages: 0,
  setShowedImageLink: () => {},
  channelName: '',
  setIsShowMenuBar: () => {},
  setAdminIdMessage: () => {},
  threePointsMessageId: 0,
  setThreePointsMessageId: () => {},
}

export default List
