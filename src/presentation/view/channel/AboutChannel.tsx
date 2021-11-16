import BrowserHistoryRouter from '../../../utils/BrowserHistoryRouter'
import { linkify } from '../../../utils/LinkifyUtils'

interface Props {
  isShowChannelName: boolean
  name?: string
  desc?: string
  link?: string
  isNotCenteredText?: boolean
}

const AboutChannel = (props: Props) => {
  const { desc, name, isShowChannelName, link, isNotCenteredText } = props

  return (
    <div id="about-channel-root">
      <div
        className={` ${
          !isShowChannelName ? 'd-none' : 'row justify-content-center pt-2'
        } `}
      >
        <div className="channel-name">{name}</div>
        <div className="channel-link pl-2">
          <div
            onClick={(): void => {
              BrowserHistoryRouter.moveTo(`/${link}`)
            }}
          >
            @{link}
          </div>
        </div>
      </div>
      <div className={`pt-2 ${isNotCenteredText ? '' : 'text-center'}`}>
        {desc ? (
          <div
            dangerouslySetInnerHTML={{
              __html: linkify(desc as string),
            }}
          />
        ) : undefined}
      </div>
    </div>
  )
}

export default AboutChannel
