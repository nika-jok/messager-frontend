import { useState, useEffect } from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import storage from '../../helpers/storage'
import goBackImage from '../../assets/img/channels/arrow-back.svg'
import notificationImage from '../../assets/img/menu/notification-icon.svg'
import BrowserHistoryRouter from '../../utils/BrowserHistoryRouter'
import soundIcon from '../../assets/img/channels/sound-icon.svg'
import chosedIcon from '../../assets/img/settings/chosed.svg'
import unChosedIcon from '../../assets/img/settings/unchosed.svg'
import Loading from '../../utils/LoadingComponent'

function Me({ setChosedModal, isMobile, goBack }) {
  const [isLoading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState(null)
  const [sound, setSound] = useState(null)

  useEffect(() => {
    setLoading(true)
    setNotifications(storage.get('notifications'))
    setSound(JSON.parse(storage.get('sound')))
    setLoading(false)

    return
  }, [])

  const changeNotifications = (e) => {
    storage.set('notifications', e.target.checked)
    setNotifications(e.target.checked.toString())
  }

  const changeAudio = () => {
    storage.set('sound', !sound)
    setSound(!sound)
  }

  return (
    <div
      className="page-container pt-2"
      style={{ position: isMobile ? 'fixed' : 'relative' }}
    >
      <div className="d-flex pt-3 align-items-center">
        <div
          className="icon-hover"
          onClick={() => {
            if (isMobile) {
              BrowserHistoryRouter.goBack()
            } else {
              goBack('left')
            }
          }}
          style={{ cursor: 'pointer', marginTop: '7px' }}
        >
          <img src={goBackImage} alt="back" />
        </div>
        <div className="page-title" style={{ paddingTop: '1px' }}>
          Уведомления
        </div>
      </div>
      {isLoading ? (
        <div className="row justify-content-center pt-3 pb-2">
          <Loading />
        </div>
      ) : (
        <div>
          <br />
          <div>
            <div className="d-flex justify-content-between pr-3 pt-4">
              <div className="d-flex" style={{ paddingTop: '6px' }}>
                <img
                  style={{ marginTop: '3px' }}
                  src={notificationImage}
                  alt="notifications"
                  width="18"
                  height="20"
                />
                <div className="pl-3">Уведомления из чатов</div>
              </div>

              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications === 'true'}
                      onChange={changeNotifications}
                      name="notifications"
                      style={{ color: '#50BCFF' }}
                      color="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  }
                  labelPlacement="start"
                />
              </div>
            </div>
            <div className="text-gray">
              Подпишитесь на push-уведомления, чтобы узнавать о новых
              сообщениях, когда вы не в Message. Уведомления можно отключить в
              любое время.
            </div>
            <div className="d-flex justify-content-between pr-3 pt-4">
              <div className="d-flex">
                <img
                  style={{ marginTop: '3px' }}
                  width="18"
                  height="20"
                  src={soundIcon}
                  alt="notifications"
                />
                <div className="pl-3">Звук</div>
              </div>

              <div onClick={changeAudio} name="sound">
                <img
                  src={sound ? chosedIcon : unChosedIcon}
                  alt="switch of sound"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Me
