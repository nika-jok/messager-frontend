import BrowserHistoryRouter from '../../../utils/BrowserHistoryRouter'
import Storage from '../../../helpers/storage'
import imageNotFinded from '../../../assets/img/channels/upload-image.svg'
import './channel.css';

interface Props {
  channelImage: string
  channelName: string
  userId?: number
  levelIcon?: string
}

const ConnectToChannel = (props: Props): JSX.Element => {
  return (
    <div
      className="connectToChannelContainer"
      onClick={(): void => {
        if (!props.userId) {
          if (props.isMobile) {
            console.log(1)
            BrowserHistoryRouter.moveTo('/auth/sign-in')
          } else {
            console.log(2)
            props.setChosedModal('enter-email')
          }

          console.log(3)
          Storage.set('channel_name', props.channelName)
        } else {
          if (props.isMobile) {
            BrowserHistoryRouter.moveTo(`/${props.channelName}/choose-level`)
          } else {
            props.setLastOpened('choose-level-subscribe')
          }
        }
      }}
    >
      <div className="button-choose-level-wrapper">
        <button>
          <div className="d-flex">
            <div className="button-choose-image">
              <img
                width="24"
                height="24"
                style={{ borderRadius: '50%' }}
                src={props.channelImage ? props.channelImage : imageNotFinded}
                alt="apple"
              />
            </div>
            <div className="button-choose-level-text">Присоединиться</div>
            {props.levelIcon ? (
              <div className="pl-1 pt-1">
                <img
                  width="24"
                  height="24"
                  src={props.levelIcon ? props.levelIcon : imageNotFinded}
                  alt="level"
                />
              </div>
            ) : undefined}
          </div>
        </button>
      </div>
    </div>
  )
}

export default ConnectToChannel
