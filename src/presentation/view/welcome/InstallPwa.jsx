import { useEffect, useState } from 'react'
import logoIcon from '../../../assets/img/welcome-page/logo-dove.svg'
import styled from 'styled-components'

const InstallPwaWrap = styled.div`
  .install-pwa-header {
    padding: 18px;
  }

  .install-pwa-info {
    padding-left: 17px;
  }

  .pwa-message {
    font-size: 18px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.9);
    font-style: normal;
    font-weight: normal;
  }
`

const InstallPWA = () => {
  const [promptInstall, setPromptInstall] = useState(null)
  const [isShowInstallPwa, setIsShowInstallPwa] = useState(true)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      console.log('we are being triggered :D')
      setPromptInstall(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsShowInstallPwa(false)
    }

    return () => window.removeEventListener('transitionend', handler)
  }, [])

  const onClick = (evt) => {
    evt.preventDefault()
    if (!promptInstall) {
      return
    }
    promptInstall.prompt()
  }

  return (
    <InstallPwaWrap>
      {isShowInstallPwa && (
        <div className="d-flex justify-content-between install-pwa-header">
          <div className="d-flex ">
            <div>
              <img src={logoIcon} alt="messager" />
            </div>
            <div className="install-pwa-info">
              <div>
                <span className="pwa-message pl-2">Message</span>
              </div>
              <div>
                <p className="text-gray pl-2">Бесплатное веб-приложение</p>
              </div>
            </div>
          </div>{' '}
          <div className="pt-2">
            <button
              className="link-button blue-text"
              id="setup_button"
              aria-label="Install app"
              title="Install app"
              onClick={onClick}
            >
              Установить
            </button>
          </div>
        </div>
      )}
    </InstallPwaWrap>
  )
}

export default InstallPWA
