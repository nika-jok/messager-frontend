import { useState, useEffect } from 'react'
import ApiHelper from '../../helpers/api/admin'
import Grid from '@material-ui/core/Grid'
import arrowBack from '../../assets/img/channels/arrow-back.svg'
import BrowserHistoryHelper from '../../utils/BrowserHistoryRouter'
import Loading from '../../utils/LoadingComponent'

import usersIcon from '../../assets/img/admin/users.svg'
import dollarIcon from '../../assets/img/admin/dollar.svg'
import messagesIcon from '../../assets/img/admin/messages.svg'
import paymentIcon from '../../assets/img/admin/payment-card.svg'
import incomeIcon from '../../assets/img/admin/printer.svg'
import heartIcon from '../../assets/img/admin/online-users.svg'

export default function AdminAnalytics({ setChosedModal, isMobile }) {
  const [analyticData, setAnalyticData] = useState({})
  const api = new ApiHelper()

  useEffect(() => {
    ;(async () => {
      try {
        const data = await api.analytics()
        setAnalyticData(data?.data)
      } catch (e) {
        alert(e)
      }
      if (analyticData?.status !== 200) {
      }
      return
    })()
  }, [])

  return (
    <div
      className="page-container pt-2"
      style={{ position: isMobile ? 'fixed' : 'relative' }}
    >
      <header>
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
              Аналитика
            </div>
          </Grid>
        </Grid>
      </header>

      {Object.keys(analyticData) ? (
        <div className="pt-4">
          <div className="users-info d-flex pt-3">
            <div style={{ width: '30px' }}>
              <img src={usersIcon} alt="count of users" />
            </div>
            <div className="text-gray pl-2" style={{ paddingTop: '3px' }}>
              Пользователи{' '}
              <b style={{ color: 'black' }}>{analyticData?.users}</b>
            </div>
          </div>
          <div className="users-info d-flex  pt-3">
            <div style={{ width: '30px' }}>
              <img src={heartIcon} alt="users online" />
            </div>
            <div className="text-gray pl-2" style={{ paddingTop: '3px' }}>
              Онлайн <b style={{ color: 'black' }}>{analyticData?.online}</b>
            </div>
          </div>
          <div className="users-info d-flex pt-3">
            <div style={{ width: '30px' }}>
              <img src={messagesIcon} alt="count of messages" />
            </div>
            <div className="text-gray pl-2" style={{ paddingTop: '3px' }}>
              Сообщений{' '}
              <b style={{ color: 'black' }}>{analyticData?.messages}</b>
            </div>
          </div>
          <div className="users-info d-flex pt-3">
            <div style={{ width: '30px' }}>
              <img src={dollarIcon} alt="payments of users" />
            </div>
            <div className="text-gray c-p pl-2" style={{ paddingTop: '3px' }}>
              Платежи пользователей{' '}
              <b style={{ color: 'black' }}>
                ${analyticData?.subcriptionCount}/
                {analyticData?.subcriptionAmount}
              </b>
            </div>
          </div>
          <div className="users-info d-flex pt-3">
            <div style={{ width: '30px' }}>
              <img src={paymentIcon} alt="payment" />
            </div>
            <div className="text-gray pl-2" style={{ paddingTop: '3px' }}>
              Переводы{' '}
              <b style={{ color: 'black' }}>
                ${analyticData?.withdrawsCount}/{analyticData?.withdrawsAmount}{' '}
              </b>
            </div>
          </div>
          <div className="users-info d-flex pt-3">
            <div style={{ width: '30px' }}>
              <img src={incomeIcon} alt="income" />
            </div>
            <div className="text-gray pl-2" style={{ paddingTop: '3px' }}>
              Валовый доход{' '}
              <b style={{ color: 'black' }}>
                ${analyticData?.grossIncomeAmount}
              </b>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center pt-4 pb-4">
          <Loading />
        </div>
      )}
    </div>
  )
}
