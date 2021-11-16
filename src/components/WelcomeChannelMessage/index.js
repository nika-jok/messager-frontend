import styled from 'styled-components'
import appLogo from '../../assets/img/welcome-page/logo-dove.svg'

const WelcomeChannelMessageWrap = styled.div`
  padding-top: 12px;
  .title {
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;

    color: rgba(0, 0, 0, 0.9);
  }

  .header-block {
    padding-left: 50px;
  }

  .app-logo-wrap {
    padding-left: 21px;
  }

  .header {
    display: flex;
  }

  .desc {
    font-size: 15px;
    line-height: 19px;
    color: rgba(0, 0, 0, 0.5);
    padding-top: 58px;
    text-align: center;
    padding-left: 30px;
    padding-right: 20px;
  }
`

const WelcomeChannelMessage = () => {
  return (
    <WelcomeChannelMessageWrap>
      <div className="header">
        <div className="app-logo-wrap">
          <img src={appLogo} alt="message" />
        </div>
        <div className="header-block">
          <div className="title">Впервые в Message?</div>
        </div>
      </div>

      <div className="desc">
        Для того чтобы авторизоваться и подписаться на канал, нажмите на кнопку
        “Присоединиться”
      </div>
    </WelcomeChannelMessageWrap>
  )
}

export default WelcomeChannelMessage
