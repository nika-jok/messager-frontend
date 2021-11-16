import DayUtils from '../../../utils/DateUtils'
import messageSentTime from '../../../helpers/time/messageSent'
import emptyImage from '../../../assets/img/channels/upload-image.svg'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'
import StringUtils from '../../../utils/StringUtils'
import { APPLICATION_SERVER } from '../../../constants'
import styled from 'styled-components'

const ChannelWrap = styled.div`
display:flex;
.channel-item{
  display:flex;
  width:100%;
  padding-top:8.5px;
  padding-bottom:8.5px;
  padding-left:17px;
  cursor:pointer;
}

  .channel-image-wrap {
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }

  .channel-message {
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

  .last-message-time{
    padding-right:22px;
  }

  .channel-name{
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    color: rgba(0, 0, 0, 0.9;
  }

  
  `

const ChannelItem = (props) => {
  // const { channel, admin_messages } = props.channel
  const { channel } = props
  const lastChannelMessage = channel?.user?.last_message

  const determineMessage = (text, attachment) => {
    if (text) {
      return StringUtils.cutBySymbolsLength(text, 20)
    }

    if (attachment) {
      const arr = attachment.split('.')
      const ext = arr[arr.length - 1]
      if (ext === 'mp4') return <label>Видео</label>
      if (ext === 'mp3') return <label>Аудио</label>
      if (['jpg', 'jpeg', 'png'].includes(ext)) return <label>Фото</label>
      return <label>Файл</label>
    }
  }

  const {
    isMobile,
    setChosedModal,
    setChosedChannelId,
    setChosedChannel,
    isChosedChannel,
  } = props
  return (
    <>
      <div
        id="message-item"
        style={{
          borderRight: isChosedChannel ? '2px solid rgb(80, 188, 255)' : '',
        }}
      >
        <ChannelWrap>
          <div
            className="channel-item"
            // onClick={() => {
            //   console.log('')
              // if (isMobile) {
              //   BrowserHistoryHelper.moveTo(`/${channel?.link}`)
              // } else {
              //   setChosedModal('channels')
              //   setChosedChannelId(channel?.id)
              //   setChosedChannel(channel?.link)
              //   BrowserHistoryHelper.moveTo(`/${channel?.link}`)
              // }
            // }}
          >
            <div className="pr-2 channel-image-wrap">
              <img
                width="48"
                height="48"
                style={{ borderRadius: '50%' }}
                src={
                  channel.channel_image_link
                    ? `${APPLICATION_SERVER}/files/storage/icons/${channel.channel_image_link}`
                    : emptyImage
                }
                alt="channel"
              />
            </div>

            <div className="channel-info-block w-100">
              <div className="d-flex justify-content-between">
                <div className="channel-name">{channel.name}</div>
                <div className="last-message-time text-gray">
                  {lastChannelMessage?.createdAt
                    ? new Date().toDateString() ===
                      new Date(lastChannelMessage?.createdAt).toDateString()
                      ? messageSentTime(lastChannelMessage?.createdAt)
                      : DayUtils.getDayAndShortMonthsFromDate(
                          new Date(lastChannelMessage?.createdAt)
                        )
                    : undefined}
                </div>
              </div>

              <div className="channel-message">
                {determineMessage(
                  lastChannelMessage?.message,
                  lastChannelMessage?.attachment
                )}
              </div>
            </div>
          </div>
        </ChannelWrap>
      </div>
    </>
  )
}

export default ChannelItem
