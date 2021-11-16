import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'
import appIcon from '../../../assets/img/menu/logo.svg'

const Faq = ({ isMobile, setChosedModal }): JSX.Element => {
  return (
    <div
      className="page-container pt-2"
      style={{
        position: isMobile ? '' : 'relative',
        maxWidth: isMobile ? '100%' : '488px',
      }}
    >
      <div style={{ padding: isMobile ? '15px' : '' }}>
        <div className="pt-2 pb-2">
          <div
            onClick={(): void => {
              if (isMobile) {
                BrowserHistoryHelper.moveTo('/')
              } else {
                setChosedModal('chats')
              }
            }}
            className="blue-text"
          >
            <img src={appIcon} alt="Message Logo" />
          </div>
        </div>

        <div id="user-messages-block" className="messages-scrollbar">
          <div className="pt-3">
            <h4 className="page-title pl-0 pb-2">Вопросы и ответы</h4>
            <p>Этот раздел дает ответы на основные вопросы о Message.</p>

            <div>
              <div>
                <b>Общие</b>
                <div
                  className="blue-text"
                  onClick={(): void => {
                    const element = document.getElementById('what-is-message')
                    //@ts-ignore
                    element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Что такое Message?
                </div>
                <div
                  className="blue-text"
                  onClick={(): void => {
                    const element = document.getElementById('for-who-message')
                    //@ts-ignore
                    element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Для кого предназначен Message?
                </div>
                <div
                  className="blue-text"
                  onClick={(): void => {
                    const element = document.getElementById('what-devices')
                    //@ts-ignore
                    element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Какие устройства я могу использовать?
                </div>
                <div
                  className="blue-text"
                  onClick={(): void => {
                    const element = document.getElementById('we-have-privace')
                    //@ts-ignore
                    element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  У вас есть политика конфиденциальности?
                </div>
              </div>
              <div className="pt-2">
                <b>Основы</b>
                <div
                  className="blue-text"
                  onClick={(): void => {
                    const element = document.getElementById('who-i-can-write')
                    //@ts-ignore
                    element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Кому я могу написать?
                </div>
                <div
                  className="blue-text"
                  onClick={(): void => {
                    const element = document.getElementById(
                      'can-i-delete-messages'
                    )
                    //@ts-ignore
                    element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Могу ли я удалить свои сообщения?
                </div>
              </div>
              <div className="pt-2">
                <b>Каналы</b>
                <div
                  className="blue-text"
                  onClick={(): void => {
                    const element = document.getElementById('what-is-channels')
                    //@ts-ignore
                    element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Что такое каналы в Message?
                </div>
                <div
                  className="blue-text"
                  onClick={(): void => {
                    const element = document.getElementById(
                      'how-to-create-channel'
                    )
                    //@ts-ignore
                    element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Как создать канал?
                </div>
                <div
                  className="blue-text"
                  onClick={(): void => {
                    const element = document.getElementById('what-is-level')
                    //@ts-ignore
                    element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Что такое уровни?
                </div>
                <div
                  className="blue-text"
                  onClick={(): void => {
                    const element = document.getElementById('commission')
                    //@ts-ignore
                    element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Какую комиссию берет Message?
                </div>
              </div>
              <div className="pt-2">
                <b>Ваш аккаунт</b>
                <div
                  className="blue-text"
                  onClick={(): void => {
                    const element = document.getElementById('how-to-get-money')
                    //@ts-ignore
                    element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Как вывести деньги с моего баланса?
                </div>
              </div>
              <div className="pt-2">
                <b>Исправление проблем</b>
                <div
                  className="blue-text"
                  onClick={(): void => {
                    const element = document.getElementById(
                      'email-autorization-signup'
                    )
                    //@ts-ignore
                    element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Электронная почта, авторизация и регистрация
                </div>
              </div>
              <div className="pt-2">
                <b>Поддержка Message</b>
              </div>

              <div className="pt-2" style={{ fontSize: '20px' }}>
                <b>Общие</b>
              </div>

              <div className="pt-2" id="what-is-message">
                <b>Что такое Message?</b>
                <p>
                  Message - это бесплатное приложение для обмена сообщениями и
                  монетизации контента. С помощью Message вы можете отправлять
                  сообщения, фотографии, видео и файлы. А также создавать каналы
                  по платной подписке.
                </p>
              </div>

              <div className="pt-2" id="for-who-message">
                <b>Для кого предназначен Message?</b>
                <p>
                  Message предназначен для всех, кто хочет быстро обмениваться
                  сообщениями, создателям контента понравятся каналы с
                  монетизацией, сегментацией, выводом заработанных средств и
                  возможности обмена файлами.
                </p>
              </div>

              <div className="pt-2" id="what-devices">
                <b>Какие устройства я могу использовать?</b>
                <p>
                  Вы можете использовать Message в браузере на смартфонах,
                  планшетах и ​​даже компьютерах.
                </p>
              </div>

              <div className="pt-1">
                <p>
                  <br />
                  Вы можете добавить Message на главный экран вашего устройства
                  и открывать как прогрессивное веб приложение(PWA). Для этого
                  в: <br /> · Android: Откройте сайт{' '}
                  <a
                    className="c-p"
                    onClick={(): void => {
                      BrowserHistoryHelper.moveTo('/')
                    }}
                    style={{ color: '#50bcff' }}
                  >
                    https://messages.gg
                  </a>{' '}
                  , нажмите кнопку "Опции"{'>'} "Добавить на главный экран"{'>'}{' '}
                  "Добавить". <br /> · iPhone: Откройте сайт{' '}
                  <a
                    className="c-p"
                    onClick={(): void => {
                      BrowserHistoryHelper.moveTo('/')
                    }}
                    style={{ color: '#50bcff' }}
                  >
                    https://messages.gg
                  </a>
                  , нажмите кнопку "Поделиться"{'>'} "Добавить на главный экран"
                  {'>'} "Добавить".
                  <br /> · PC(Google Chrome): Откройте сайт{' '}
                  <a
                    className="c-p"
                    onClick={(): void => {
                      BrowserHistoryHelper.moveTo('/')
                    }}
                    style={{ color: '#50bcff' }}
                  >
                    https://messages.gg
                  </a>{' '}
                  нажмите кнопку "Опции"{'>'} "Установка приложения "Message"
                  {'>'} "Установить".
                </p>
              </div>

              <div className="pt-2" id="we-have-privace">
                <b>У вас есть политика конфиденциальности?</b>
                <p>
                  Конечно, ознакомьтесь по этой ссылке{' '}
                  <a
                    onClick={(): void => {
                      BrowserHistoryHelper.moveTo('/account/privacy')
                    }}
                    style={{ color: '#50bcff' }}
                  >
                    https://messages.gg/account/privacy
                  </a>{' '}
                </p>
              </div>

              <div style={{ fontSize: '20px' }}>
                <b>Основы</b>
              </div>

              <div className="pt-2" id="who-i-can-write">
                <b>Кому я могу написать?</b>
                <p>
                  Вы можете писать людям, которые зарегистрированные в Message.
                  Другой способ связаться с людьми - ввести их имя пользователя
                  начиная с “@” в поле поиска.
                </p>
              </div>

              <div className="pt-2" id="can-i-delete-messages">
                <b>Могу ли я удалить свои сообщения</b>
                <p>
                  Да. Вы всегда можете удалить любые сообщения, которые вы
                  отправили для обеих сторон в любой беседе один на один (в
                  каналах это все еще только ваши собственные сообщения).
                </p>
              </div>

              <div style={{ fontSize: '20px' }}>
                <b>Каналы</b>
              </div>

              <div className="pt-2" id="what-is-channels">
                <b>Что такое каналы в Message?</b>
                <p>
                  Каналы в Message - это каналы с платным участием. Создать
                  канал может любой желающий. Просматривать записи могут только
                  те пользователи, которые оплатили участие. Платный канал
                  доступен в поиске и имеет собственный короткий адрес(ссылку).
                </p>

                <p className="pt-1">
                  Для поиска канала введите ссылку начиная с “@” или название
                  канала.
                </p>
              </div>

              <div className="pt-2" id="how-to-create-channel">
                <b>Как создать канал?</b>
                <p>
                  Откройте "Меню" &#62; "Новый канал"(Или нажмите на "Перо"
                  &#62; "Новый канал").
                </p>
              </div>

              <div className="pt-2" id="what-is-level">
                <b>Что такое уровни?</b>
                <p>
                  Автор канала может добавить несколько уровней участия. Кто-то
                  ограничивается вариантами за три и пять долларов, а кто-то
                  ставит верхний предел пожертвования в несколько сотен. В
                  зависимости от выбранного уровня участникам обещают разные
                  бонусы - эксклюзивный контент, доступ к раннему контенту,
                  прямые трансляции, а иногда и подарки, например картины или
                  бумажные книги.
                </p>
              </div>

              <div className="pt-2" id="commission">
                <b>Какую комиссию берет Message?</b>
                <p>
                  Message взимает комиссию с каждой подписки на канал в
                  зависимости от участников в канале: <br />
                  1-99 участников, Комиссия 50%
                  <br />
                  100-999 участников, Комиссия 10%
                  <br />
                  1000+ участников, Комиссия 5%
                  <br />
                  <p className="pt-1">
                    Отдельно комиссия за транзакции от платежной системы
                    составляет 2,5%.
                  </p>
                </p>
              </div>

              <div style={{ fontSize: '20px' }}>
                <b>Ваш аккаунт</b>
              </div>

              <div className="pt-2" id="how-to-get-money">
                <b>Как вывести деньги с моего баланса?</b>
                <p>
                  Вы можете вывести средства полученные с подписок на ваши
                  каналы. Нажмите “Меню” &#62; “Платежи” &#62; “Перевод на
                  карту”.
                </p>
                <p className="pt-1">
                  Вы можете вывести за один раз от $10 до $1000. Обработка
                  платежа может занимать 1-2 дня.
                </p>
              </div>

              <div style={{ fontSize: '20px' }}>
                <b>Исправление проблем</b>
              </div>

              <div className="pt-2" id="email-autorization-signup">
                <b>Электронная почта, авторизация и регистрация?</b>
                <p>
                  Если у вас возникли проблемы с регистрацией или входом в
                  систему, свяжитесь с нами по почте{' '}
                  <a href="mailto:info@messages.gg" className="blue-text">
                    info@messages.gg.
                  </a>
                </p>
              </div>

              <div style={{ fontSize: '20px' }}>
                <b>Поддержка Message</b>
              </div>

              <div className="pt-2" id="support">
                <p>
                  Если у вас есть другие вопросы, обращайтесь в службу поддержки
                  Message, для этого напишите на почту{' '}
                  <a href="mailto:info@messages.gg" className="blue-text">
                    info@messages.gg.
                  </a>
                </p>
              </div>
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
    </div>
  )
}

export default Faq
