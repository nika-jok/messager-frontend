import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'
import appIcon from '../../../assets/img/menu/logo.svg'

const Terms = (): JSX.Element => {
  return (
    <div className="page-container pt-2">
      <div className="pt-2">
        <div
          onClick={(): void => {
            BrowserHistoryHelper.moveTo('/')
          }}
          className="logo-wrap"
        >
          <img src={appIcon} alt="Message Logo" />
        </div>
      </div>

      <div className="p20">
        <h4 className="page-title pl-0 pb-2">Условия использования</h4>
        <p style={{ wordBreak: 'break-word' }}>
          Регистрируясь в Message, вы принимаете нашу{' '}
          <div
            className="blue-text"
            onClick={(): void => {
              BrowserHistoryHelper.moveTo('/account/privacy')
            }}
          >
            Политику конфиденциальности
          </div>
          и соглашаетесь не: <br /> · Использовать наш сервис для рассылки спама
          или мошенничества пользователям. <br /> · Продвигать насилие или
          публиковать контент незаконного порнографического содержания в платных
          каналах. <br /> · Публиковать нелицензированные музыкальные
          произведения и видеоматериалы. <br /> · Распостранять
          нелицензированное программное обеспечение.
        </p>

        <p>
          Мы оставляем за собой право обновлять эти Условия использования позже.
        </p>

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
            onClick={(): void => BrowserHistoryHelper.moveTo('/account/terms')}
          >
            Условия
          </a>{' '}
          ·{' '}
          <a onClick={(): void => BrowserHistoryHelper.moveTo('/account/faq')}>
            {' '}
            Вопросы и ответы
          </a>{' '}
          ·{' '}
          <a
            onClick={(): void => BrowserHistoryHelper.moveTo('/account/about')}
          >
            {' '}
            О нас
          </a>{' '}
        </div>
      </div>
    </div>
  )
}

export default Terms
