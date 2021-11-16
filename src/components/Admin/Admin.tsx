import { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import ApiHelper from '../../helpers/api/auth/auth'
import StorageHelper from '../../utils/StorageHelper'
import BrowserHistoryHelper from '../../utils/BrowserHistoryRouter'

import arrowBack from '../../assets/img/channels/arrow-back.svg'
import paymentImage from '../../assets/img/admin/payment.svg'
import analyticImage from '../../assets/img/admin/analytic.svg'
import storage from '../../helpers/storage'

export default function Admin({ isMobile, setChosedModal }) {
  const api = new ApiHelper()
  const [redirect, setRedirect] = useState('')
  if (!storage.get('adminToken')) {
    console.log('gdfhfgh545')
    if (isMobile) {
      console.log('gdfhfgh')
      BrowserHistoryHelper.moveTo('/admin/login')
    } else {
      console.log('gdfhfgh22222')
      setChosedModal('admin-login')
    }
  }

  useEffect(async () => {
    const data = await api.verifyAdmin(StorageHelper.getUserData()?.token)
    if (data.status !== 200) {
      return setRedirect('/admin/login')
    }
  }, [])

  const redirectTo = (name: 'payments' | 'analytics') => {
    if (name === 'payments') {
      console.log('isMobile')
      console.log(isMobile)
      console.log('isMobile')
      if (!isMobile) {
        if (storage.get('adminToken')) {
          setChosedModal('admin-payments')
        } else {
          setChosedModal('admin-login')
        }
      } else {
        if (storage.get('adminToken')) {
          BrowserHistoryHelper.moveTo('/admin/payments')
        } else {
          BrowserHistoryHelper.moveTo('/admin/login')
        }
      }
    } else {
      if (name === 'analytics') {
        if (!isMobile) {
          if (storage.get('adminToken')) {
            setChosedModal('admin-analytics')
          } else {
            setChosedModal('admin-login')
          }
        } else {
          if (storage.get('adminToken')) {
            BrowserHistoryHelper.moveTo('/admin/analytics')
          } else {
            BrowserHistoryHelper.moveTo('/admin/login')
          }
        }
      }
    }
  }

  return (
    <div
      className="page-container"
      style={{ position: isMobile ? 'fixed' : 'relative' }}
    >
      <div style={{ padding: isMobile ? '3px 15px' : '' }}>
        <header className="pt-2">
          <Grid container spacing={2}>
            <Grid xs={1} style={{ marginRight: '10px' }}>
              <div
                className="arrow-back-block"
                onClick={() => {
                  if (isMobile) {
                    BrowserHistoryHelper.goBack()
                  } else {
                    setChosedModal('chats')
                  }
                }}
              >
                <div className="icon-hover">
                  <img src={arrowBack} alt="arrow back" />
                </div>
              </div>
            </Grid>
            <Grid xs={9}>
              <div className="page-title c-p">Администрирование</div>
            </Grid>
          </Grid>
        </header>

        <div className="pt-5">
          <div className="d-flex" onClick={(): void => redirectTo('payments')}>
            <div style={{ width: '25px' }}>
              <img src={paymentImage} alt="payment" />
            </div>
            <div className="pl-3 c-p" style={{ paddingTop: '2px' }}>
              Платежи
            </div>
          </div>
          <div
            className="d-flex pt-3"
            onClick={(): void => redirectTo('analytics')}
          >
            <div style={{ width: '25px' }}>
              <img src={analyticImage} alt="payment" />
            </div>
            <div className="pl-3 c-p" style={{ paddingTop: '2px' }}>
              Аналитика
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
