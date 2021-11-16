import ConnectToChannel from '../../presentation/view/channel/ConnectToChannel'
import AboutChannel from '../../presentation/view/channel/AboutChannel'
import { APPLICATION_SERVER } from '../../constants'
import PropTypes from 'prop-types'

const ChannelBottomItems = ({
  channelInfo,
  isMobile,
  userId,
  setChosedModal,
  setLastOpened,
  channelName,
  channelFiles,
}) => {
  return (
    <>
      <div className="w-100 pt-5 pb-3">
        <AboutChannel
          name={channelInfo.name}
          desc={channelInfo.description}
          isShowChannelName={true}
          link={channelInfo.link}
        />
      </div>
        <ConnectToChannel
          userId={userId}
          setChosedModal={setChosedModal}
          isMobile={isMobile}
          setLastOpened={setLastOpened}
          channelName={channelName}
          channelImage={
            channelFiles && channelFiles.length >= 1
              ? `${APPLICATION_SERVER}/files/storage/icons/${channelFiles[0].name}.${channelFiles[0].type}`
              : undefined
          }
        />
    </>
  )
}

ChannelBottomItems.defaultProps = {
  channelInfo: {},
  isMobile: false,
  userId: 0,
  setChosedModal: () => {},
  setLastOpened: () => {},
  channelName: '',
  channelFiles: [],
}

ChannelBottomItems.propTypes = {
  channelInfo: PropTypes.object,
  isMobile: PropTypes.bool,
  userId: PropTypes.string,
  setChosedModal: PropTypes.func,
  setLastOpened: PropTypes.func,
  channelName: PropTypes.string,
  channelFiles: PropTypes.array,
}

export default ChannelBottomItems
