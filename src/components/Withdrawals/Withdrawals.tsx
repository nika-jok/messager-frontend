import { useState, useEffect } from 'react'
import ApiHelper from '../../helpers/api/bio/me'
import ApiHelperWithdraw from '../../helpers/api/withdrawals'
import Grid from '@material-ui/core/Grid'
import BrowserHistoryHelper from '../../utils/BrowserHistoryRouter'
import WithDrawalItem from './WithdrawalItem'
import WithDrawal from '../../domain/models/withdrawals/WithDrawal'
import StringUtils from '../../utils/StringUtils'
import arrowBack from '../../assets/img/channels/arrow-back.svg'
import emptyImage from '../../assets/img/channels/upload-image.svg'
import newTransferOnCardImage from '../../assets/img/withdrawal/payment.svg'
import User from '../../domain/models/auth/User'
import { APPLICATION_SERVER } from '../../constants'
import paymentIcon from '../../assets/img/withdrawal/payment-icon.svg'
import InfiniteWaypoint from '../InfiniteWayPoint'

function WidthDrawals({ isMobile, setChosedModal }) {
  const [paymentsList, setPaymentsList] = useState<WithDrawal[] | undefined>(
    undefined
  )
  const [userData, setUserData] = useState<User | undefined>(undefined)
  const [page, setPage] = useState(2)
  const [totalPages, setTotalPages] = useState(0)
  const api = new ApiHelper()
  const apiWithdraw = new ApiHelperWithdraw()

  useEffect(() => {
    ;(async () => {
      const user = await api.getMe()
      const data = await apiWithdraw.get()
      setTotalPages(data?.total?.length / 15)
      setPaymentsList(data.data)
      setUserData(user.data.bio)
    })()
  }, [])

  const loadMore = async () => {
    if (totalPages > page) {
      const payments = await apiWithdraw.get(page, 15)
      if (payments) {
        setPage((prev) => prev + 1)
        setPaymentsList((prev) => [...prev, ...payments.data])
      }
    }
  }

  return (
    <>
      <header className="pt-2">
        <Grid container spacing={2}>
          {isMobile ? (
            <Grid xs={2} style={{ paddingLeft: '25px' }}>
              <div className="arrow-back-block" style={{ paddingTop: '9px' }}>
                <div
                  className="icon-hover"
                  onClick={() => {
                    BrowserHistoryHelper.goBack()
                  }}
                >
                  <img src={arrowBack} alt="arrow back" />
                </div>
              </div>
            </Grid>
          ) : undefined}

          {isMobile ? (
            <Grid xs={8}>
              <div className="page-title" style={{ paddingLeft: '19px' }}>
                Платежи
              </div>
            </Grid>
          ) : (
            <div
              className="d-flex justify-content-between w-100 c-p"
              style={{ paddingRight: '26px' }}
            >
              <div className="page-title">Платежи</div>
              <div
                className="desktop-menu-icon"
                onClick={() => setChosedModal('create-withdrawal')}
              >
                <img src={paymentIcon} alt="payment" />
              </div>
            </div>
          )}
        </Grid>
      </header>

      <section className="user-info pt-5 pl-4">
        <div className="d-flex">
          <div className="user-image">
            {userData && userData.avatar ? (
              <img
                src={`${APPLICATION_SERVER}/files/${userData.avatar}`}
                alt="user"
                className="user-icon"
              />
            ) : (
              <img src={emptyImage} alt="user" className="user-icon" />
            )}
          </div>
          <div className="pl-3">
            <div className="d-block username">
              {userData &&
                StringUtils.displayName(
                  userData.email,
                  userData.firstName ? userData.firstName : '',
                  userData.lastName ? userData.lastName : '',
                  userData.username ? userData.username : ''
                )}
            </div>
            <div className="d-block text-gray pt-1">
              Ваш баланс{' '}
              <b style={{ color: 'black' }}>
                ${userData && userData.balance ? userData.balance : 0}
              </b>
            </div>
          </div>
        </div>
      </section>

      <section className="history-of-payments">
        <div className="text-gray pt-3 pb-2 pl-4">История переводов</div>

        <div className="messages-scrollbar" id="channel-messages-block">
          {userData && paymentsList?.length ? (
            paymentsList.map((paymentItem: WithDrawal) => {
              return (
                <WithDrawalItem
                  paymentInfo={paymentItem}
                  statusPayment={paymentItem.status}
                  userIcon={userData.avatar}
                  isUser={true}
                  name={
                    StringUtils.displayName(
                      userData.email,
                      userData.firstName ? userData.firstName : '',
                      userData.lastName ? userData.lastName : '',
                      userData.username ? userData.username : ''
                    ) as string
                  }
                />
              )
            })
          ) : (
            <div className="d-flex justify-content-center text-gray pt-3">
              Здесь будут показаны ваши платежи
            </div>
          )}

          {paymentsList?.length && totalPages >= page ? (
            <InfiniteWaypoint
              content={paymentsList}
              totalPages={totalPages}
              currentPage={page}
              onEnter={loadMore}
              direction={'bottom'}
            />
          ) : undefined}
        </div>
      </section>

      <div
        className="centre-to-right-bottom"
        onClick={() => {
          BrowserHistoryHelper.moveTo('/account/create-withdrawals')
        }}
      >
        <div className="text-right">
          <img
            className="c-p"
            src={newTransferOnCardImage}
            alt="open window transfer to card"
          />
        </div>
      </div>
    </>
  )
}

export default WidthDrawals
