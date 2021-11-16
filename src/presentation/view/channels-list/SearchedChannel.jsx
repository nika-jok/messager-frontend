import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'
import styled from 'styled-components'
import uploadIcon from '../../../assets/img/channels/upload-image.svg'

const SearchedChannelWrap = styled.div`
.searched-channel{
  display:flex;
  padding-top:17px;
  padding-left:17px;
}

  .channel-image-wrap {
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }

  .channel-link {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: rgba(0, 0, 0, 0.5);
    padding-top:6px;
  }
  
  .channel-info-block {
    padding-left: 14px;
    padding-top: 4px;
  }

  .channel-name{
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    color: rgba(0, 0, 0, 0.9;
  }
  
  
  `

const SearchedChannel = (props) => {
  const { channel, setChosedChannel, setLastOpened, isMobile, link } = props
  return (
    <div id="message-item" style={{ zIndex: 3, position: 'relative' }}>
      <SearchedChannelWrap>
        <div
          className="searched-channel"
          onClick={() => {
            if (isMobile) {
              BrowserHistoryHelper.moveTo(`/${channel.link}`)
            } else {
              setLastOpened('channel')
              setChosedChannel(channel.link)
              BrowserHistoryHelper.moveTo(`/${channel.link}`)
            }
          }}
        >
          <div className="pr-2 channel-image-wrap">
            <img
              src={
                channel?.channel_image_link
                  ? channel?.channel_image_link
                  : uploadIcon
              }
              alt="channel"
            />
          </div>

          <div className="channel-info-block">
            <div className="channel-name">{channel.name}</div>
            <div className="channel-link">@{channel.link}</div>
          </div>
        </div>
      </SearchedChannelWrap>
    </div>
  )
}

export default SearchedChannel
