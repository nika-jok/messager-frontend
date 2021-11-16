import notFoundIcon from '../../../assets/img/not-found/not-found-icon.svg'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'

const NotFoundComponent = (): JSX.Element => {
  return (
    <div className="page-container pt-2">
      <div id="not-found-root">
        <div className="page-title">Страница не найдена</div>
        <div className="d-flex justify-content-center pt-4">
          <img src={notFoundIcon} alt="not found icon" />
        </div>
        <div className="d-flex justify-content-center pt-3">
          <div className="not-found-message">
            К сожалению, такой страницы нет. Возможно, вы воспользовались недействительной ссылкой или страница была удалена. 
          </div>
        </div>

        <div className="search-button-wrapper d-flex justify-content-center pt-4">
          <div
            onClick={(): void => {
              window.location.reload()
              BrowserHistoryHelper.moveTo('/')
            }}
          >
            <button>На главную</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundComponent
