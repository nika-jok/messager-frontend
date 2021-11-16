import { useState, useEffect } from 'react'
import ApiHelper from '../../helpers/api/auth/auth'
import Storage from '../../helpers/storage/index'
import BrowserHistoryHelper from '../../utils/BrowserHistoryRouter'
import StorageHelper from '../../utils/StorageHelper'
import Grid from '@material-ui/core/Grid'
import { Redirect } from 'react-router-dom'
import Input from '../../presentation/ui/input/Input'
import arrowBack from '../../assets/img/channels/arrow-back.svg'
import LoadingComponent from '../../utils/LoadingComponent'

const AdminPassword = ({ isMobile, setChosedModal }) => {
  const [adminPassword, setAdminPassword] = useState('')
  const [message, setMessage] = useState('')
  const [redirect, setRedirect] = useState(null)
  const [isLoading, setLoading] = useState(null)
  const [isValidPassword, setIsValidPassword] = useState(true)
  const api = new ApiHelper()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const data = await api.verifyAdmin(StorageHelper.getUserData()?.token)
      if (data.status === 200) {
        setRedirect('/admin')
      }
      setLoading(false)
      return
    })()
  }, [])

  const adminLogin = async () => {
    const { status, data } = await api.loginAdmin(
      adminPassword,
      StorageHelper.getUserData()?.token
    )
    if (status !== 201) {
      if (isMobile) {
        BrowserHistoryHelper.moveTo('/admin/login')
      } else {
        setChosedModal('admin-login')
      }
    } else {
      Storage.set('adminToken', data.token)
      if (isMobile) {
        BrowserHistoryHelper.moveTo('/admin/administrating')
      } else {
        setChosedModal('admin')
      }
    }
  }

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: redirect,
        }}
      />
    )
  }
  return (
    <div
      className="page-container pt-2"
      style={{ position: isMobile ? 'fixed' : 'relative' }}
    >
      <div style={{ padding: isMobile ? '3px 15px' : '' }}>
        <header>
          <Grid container spacing={2}>
            <Grid xs={1}>
              <div className="arrow-back-block" style={{ paddingTop: '17px' }}>
                <div
                  onClick={() => {
                    if (isMobile) {
                      BrowserHistoryHelper.goBack()
                    } else {
                      setChosedModal('chats')
                    }
                  }}
                >
                  <img src={arrowBack} alt="arrow back" />
                </div>
              </div>
            </Grid>
            <Grid xs={9}>
              <div className="page-title c-p">Администрирование</div>
            </Grid>
            <Grid xs={2}>
              <div className="next-page" style={{ paddingTop: '17px' }}>
                <button
                  onClick={() => {
                    if (adminPassword) {
                      adminLogin()
                    } else {
                      setIsValidPassword(false)
                    }
                  }}
                >
                  Далее
                </button>
              </div>
            </Grid>
          </Grid>
        </header>

        {isLoading ? (
          <div className="d-flex justify-content-center pt-3 pb-3">
            <LoadingComponent />
          </div>
        ) : (
          <div>
            <div className="pt-5">
              <label className="d-block pb-2">Укажите Ваш пароль</label>
              <Input
                autoFocus
                className={`${!isValidPassword ? 'error-border' : ''}`}
                value={adminPassword}
                onChange={(e) => {
                  setMessage('')
                  setIsValidPassword(true)
                  setAdminPassword(e.target.value)
                }}
                type="password"
              />
            </div>

            {message && <div className="text-danger pt-3">{message}</div>}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPassword
