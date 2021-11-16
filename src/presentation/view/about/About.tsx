import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'
import appIcon from '../../../assets/img/welcome-page/welcome-icon.svg'
import logo from '../../../assets/img/welcome-page/logo-dove.svg'
import styled from 'styled-components'
import AboutItem from './AboutItem'
import StorageHelper from '../../../utils/StorageHelper'
import goodMonningIcon from '../../../assets/img/welcome-page/good-morning.png'

const AboutWrap = styled.div``

const items = [
  {
    id: 1,
    title: 'Общайтесь',
    desc: 'Оставайтесь на связи с родными, друзьями или коллегами',
    image: goodMonningIcon,
  },
  {
    id: 2,
    title: 'Монетизируйте',
    desc: 'Используйте каналы для монентизации контента',
    image: goodMonningIcon,
  },
  {
    id: 3,
    title: 'Обменивайтесь',
    desc: 'Обменивайтесь с друзьями фото, видео и файлами в любых количествах',
    image: goodMonningIcon,
  },
]

const About = (): JSX.Element => {
  const isAUthorized = StorageHelper.getUserData()?.user_id
  return (
    <div className="page-container pt-2" id="about-root">
      <AboutWrap>
        <div className="pt-2 pb-2">
          <div
            onClick={(): void => {
              BrowserHistoryHelper.moveTo('/')
            }}
            className="logo-wrap"
          >
            <img src={logo} alt="Message Logo" />
          </div>
        </div>
        <div id="user-messages-block" className="messages-scrollbar">
          <div className="content-container">
            <div className="d-flex justify-content-center pt-5">
              <img src={appIcon} alt="applicationLogo" />
            </div>
            <div className="d-flex justify-content-center pt-4 app-title">
              Message
            </div>

            <div className="app-desc pt-2">
              Бесплатный мессенджер с диалогами и каналами с монетизацией
            </div>

            <div className="app-button-wrapper d-flex justify-content-center pt-4">
              <div
                onClick={(): void => {
                  if (isAUthorized) {
                    BrowserHistoryHelper.moveTo('/')
                  } else {
                    BrowserHistoryHelper.moveTo('/auth/sign-in')
                  }
                }}
              >
                <button>Начать общение</button>
              </div>
            </div>
            <div className="pt-3">
              <h4 className="about_title pl-0 pb-2 text-center">
                3 причины пользоваться Message
              </h4>
              <div>
                {items.map((item) => (
                  <AboutItem
                    key={`about_item_${item.id}`}
                    image={item.image}
                    title={item.title}
                    desc={item.desc}
                  />
                ))}
              </div>

              <div className="blue-text pt-4 pb-4 about_footer">
                <a
                  onClick={(): void =>
                    BrowserHistoryHelper.moveTo('/account/privacy')
                  }
                >
                  Конфиденциальность
                </a>{' '}
                ·{' '}
                <a
                  onClick={(): void =>
                    BrowserHistoryHelper.moveTo('/account/terms')
                  }
                >
                  Условия
                </a>{' '}
                ·{' '}
                <a
                  onClick={(): void =>
                    BrowserHistoryHelper.moveTo('/account/faq')
                  }
                >
                  {' '}
                  Вопросы и ответы
                </a>{' '}
                ·{' '}
                <a
                  onClick={(): void =>
                    BrowserHistoryHelper.moveTo('/account/about')
                  }
                >
                  {' '}
                  О нас
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </AboutWrap>
    </div>
  )
}

export default About
