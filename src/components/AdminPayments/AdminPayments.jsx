import { useState, useEffect } from 'react'
import ApiHelper from '../../helpers/api/admin'
import Grid from '@material-ui/core/Grid'
import BrowserHistoryHelper from '../../utils/BrowserHistoryRouter'
import arrowBack from '../../assets/img/channels/arrow-back.svg'
import WithDrawalItem from '../../components/Withdrawals/WithdrawalItem'
import Button from '../../presentation/ui/button'
import approvePayment from '../../assets/img/admin/approve-payment.svg'
import declinePayment from '../../assets/img/admin/decline-payment.svg'
import InfiniteWaypoint from '../InfiniteWayPoint'
import { DIALOGS_COUNT_OF_UPLOADING_CHATS } from '../../constants'

export default function AdminPayments({ setChosedModal, isMobile }) {
  const [isLoading, setLoading] = useState(null)
  const [isShowMenuBar, setIsShowMenuBar] = useState(false)
  const [openedId, setOpenedId] = useState()
  const [data, setData] = useState()
  const api = new ApiHelper()
  const [totalPages, setTotalPages] = useState()
  const [page, setPage] = useState(2)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const list = await api.withdrawList(1, DIALOGS_COUNT_OF_UPLOADING_CHATS)
      setTotalPages(list.total / DIALOGS_COUNT_OF_UPLOADING_CHATS)
      setData(list.data)
      if (!list.data) {
        if (isMobile) {
          BrowserHistoryHelper.moveTo('/admin/login')
        } else {
          setChosedModal('admin-login')
        }
      }
      setLoading(false)
      return
    })()
  }, [])

  const changeStatus = async (status) => {
    const response = await api.withdrawStatusChange(openedId, status)
    if (response.status === 200) {
      setData([
        ...data.map((el) => {
          if (el.id === openedId) {
            el.status = status
          }
          return el
        }),
      ])
    }
  }

  const loadMore = async () => {
    if (totalPages > page) {
      const payments = await api.withdrawList(
        page,
        DIALOGS_COUNT_OF_UPLOADING_CHATS
      )
      if (payments) {
        setPage((prev) => prev + 1)
        setData((prev) => [...prev, ...payments.data])
      }
    }
  }

  return (
    <>
      <div
        className="page-container pt-2"
        style={{
          position: isMobile ? 'fixed' : 'relative',
          background: isShowMenuBar ? 'rgba(0, 0, 0, 0.05)' : '',
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={1}>
            <div className="arrow-back-block">
              <div
                onClick={() => {
                  if (isMobile) {
                    BrowserHistoryHelper.goBack()
                  } else {
                    setChosedModal('admin')
                  }
                }}
              >
                <img src={arrowBack} alt="arrow back" />
              </div>
            </div>
          </Grid>
          <Grid xs={9}>
            <div className="page-title" style={{ paddingTop: '15px' }}>
              Платежи
            </div>
          </Grid>
        </Grid>

        <div className="pt-4">
          <div id="user-messages-block" className="messages-scrollbar">
            {data?.length
              ? data?.map((paymentItem) => {
                  return (
                    <div
                      key={`withdrawal_item_${paymentItem.id}`}
                      style={{ width: '94%' }}
                    >
                      <WithDrawalItem
                        paymentInfo={paymentItem}
                        statusPayment={paymentItem.status}
                        userIcon={paymentItem.avatar}
                        isUser={false}
                        name={`${paymentItem.firstName} ${paymentItem.lastName}`}
                        setIsShowMenuBar={(isShowMenuBar, id) => {
                          setIsShowMenuBar(isShowMenuBar)
                          setOpenedId(id)
                        }}
                      />
                    </div>
                  )
                })
              : undefined}

            {data?.length ? (
              <InfiniteWaypoint
                content={data}
                totalPages={totalPages}
                currentPage={page}
                onEnter={loadMore}
                direction={'bottom'}
              />
            ) : undefined}
          </div>
        </div>

        {isShowMenuBar ? (
          <div className="row menu-bar-wrapper">
            <div>
              <div
                onClick={() => {
                  changeStatus('approve')
                  setIsShowMenuBar(false)
                }}
                className="d-flex pt-3 pl-4"
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <img src={approvePayment} alt="approve" />
                </div>
                <div className="pl-3" style={{ paddingTop: '2px' }}>
                  <label>Завершить</label>
                </div>
              </div>

              <div
                onClick={() => {
                  changeStatus('decline')
                  setIsShowMenuBar(false)
                }}
              >
                <div className="d-flex pt-3 pl-4" style={{ cursor: 'pointer' }}>
                  <div>
                    <img
                      className="pl-1"
                      src={declinePayment}
                      alt="remove icon"
                    />
                  </div>
                  <div className="pl-3" style={{ paddingTop: '2px' }}>
                    Отклонить
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 d-flex justify-content-center w-100 pb-3">
              <Button
                onClick={() => {
                  setIsShowMenuBar(false)
                }}
              >
                Отменить
              </Button>
            </div>
          </div>
        ) : undefined}
      </div>
    </>
  )
}
