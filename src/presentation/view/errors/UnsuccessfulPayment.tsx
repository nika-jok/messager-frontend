import BrowserHistoryHelper from "../../../utils/BrowserHistoryRouter";
import notFoundIcon from "../../../assets/img/not-found/not-found-icon.svg";

const UnsuccessfulPayment = (): JSX.Element => {
  return (
    <div className="page-container pt-2">
      <div id="not-found-root">
        <div className="page-title">Неуспешная оплата</div>
        <div className="d-flex justify-content-center pt-4">
          <img src={notFoundIcon} alt="not found icon" />
        </div>
        <div className="d-flex justify-content-center pt-3">
          <div className="not-found-message">
            К сожалению, не удалось произвести оплату с вашей карты. Пожалуйста,
            убедитесь в правильности ввода реквизитов карты, проверьте интернет
            лимит и повторите попытку.
          </div>
        </div>

        <div className="search-button-wrapper d-flex justify-content-center pt-4">
          <div onClick={(): void => BrowserHistoryHelper.goBack()}>
            <button>Повторить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnsuccessfulPayment;
