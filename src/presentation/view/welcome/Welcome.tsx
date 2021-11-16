import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'
import InstallPWA from './InstallPwa'
import styled from 'styled-components'
import BenefitsSlider from '../../../components/BenefitsSlider'

interface Props {
  isMobile: boolean
}

const WelcomeWrap = styled.div`
  .links-wrap {
    width: 100%;
    text-align: center;
  }

  .benefits-slider-wrap {
    height: 86vh;
  }
`

const Welcome = ({ isMobile }: Props): JSX.Element => {
  return (
    <WelcomeWrap className="page-container pt-2" style={{ height: '100vh' }}>
      <InstallPWA />
      <div id="welcome-root">
        <div className="benefits-slider-wrap">
          <div style={{ position: 'relative'}}>
            <BenefitsSlider />
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div style={{ position: 'absolute', bottom: 0, color: '#50BCFF' }}>
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
    </WelcomeWrap>
  )
}

export default Welcome
