import emptyImage from '../../assets/img/channels/upload-image.svg'
import threeDotsImage from '../../assets/img/channels/three-dots.svg'
import successPayment from '../../assets/img/withdrawal/success.svg'
import failedPayment from '../../assets/img/withdrawal/fail.svg'
import pendingPayment from '../../assets/img/withdrawal/pending.svg'
import WithDrawal from '../../domain/models/withdrawals/WithDrawal'
import { APPLICATION_SERVER } from '../../constants'
import DateUtils from '../../utils/DateUtils'
import StringUtils from '../../utils/StringUtils'

interface Props {
  paymentInfo: WithDrawal
  name: string
  userIcon: string | null
  statusPayment: string
  isUser?: boolean
  setIsShowMenuBar?(isShowMenuBar: boolean, id: number): void
}

const WithDrawalItem = (props: Props): JSX.Element => {
  const {
    paymentInfo,
    name,
    userIcon,
    statusPayment,
    isUser,
    setIsShowMenuBar,
  } = props
  return (
    <div
      className="d-flex justify-content-around pt-3"
      style={{ padding: '0 20px' }}
    >
      <div className="d-flex">
        <div className="user-image">
          {userIcon ? (
            <img
              src={`${APPLICATION_SERVER}/files/${userIcon}`}
              className="user-icon"
              alt="user"
            />
          ) : (
            <img src={emptyImage} className="user-icon" alt="user" />
          )}
        </div>
        <div className="pl-3">
          <div className="d-block">
            <div className="d-flex">
              <div className="username" style={{ fontSize: '15px' }}>
                {name && name.length >= 15
                  ? StringUtils.cutBySymbolsLength(name, 15)
                  : name}
              </div>
              <div className="text-gray pl-1" style={{ width: '60px' }}>
                {DateUtils.getDayAndShortMonthsFromDate(
                  new Date(paymentInfo.createdAt)
                )}
              </div>
            </div>
          </div>

          <div className="d-block text-gray pt-1">
            Перевод на банковскую карту {paymentInfo.cardNumber} · $
            {paymentInfo.amount ? paymentInfo.amount : 0}
          </div>
          <div className="d-block pt-1 status-of-payment">
            <img
              src={
                statusPayment === 'approve'
                  ? successPayment
                  : statusPayment === 'requested'
                  ? pendingPayment
                  : statusPayment === 'decline'
                  ? failedPayment
                  : undefined
              }
              alt="status of payment"
            />
          </div>
        </div>
      </div>

      {!isUser ? (
        <div>
          <div className="text-gray pl-5 pt-2">
            <div
              className="d-flex justify-content-end"
              onClick={(): void => {
                setIsShowMenuBar && setIsShowMenuBar(true, paymentInfo.id)
              }}
            >
              <img src={threeDotsImage} className="c-p" alt="more info" />
            </div>
          </div>
        </div>
      ) : undefined}
    </div>
  )
}

export default WithDrawalItem
