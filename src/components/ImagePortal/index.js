import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import downloadImage from '../../assets/img/image/download-icon.svg'
import closeIcon from '../../assets/img/image/cross24.svg'
import mobCloseIcon from '../../assets/img/image/cross12.svg'
import mobDownloadImage from '../../assets/img/image/download24.svg'

const ImagePortal = ({ image, onClose, isMobile }) =>
  ReactDOM.createPortal(
    <div className="image-portal-wrap">
      <div className="image-portal-pos">
        <div className="p-4 d-flex justify-content-between image-portal-header">
          <div onClick={onClose} className="close-button">
            <img src={isMobile ? mobCloseIcon : closeIcon} alt="close" />
          </div>
          <div>
            <a href={image} download={true}>
              <img
                src={isMobile ? mobDownloadImage : downloadImage}
                alt="download"
              />
            </a>
          </div>
        </div>
        <div
          style={{ alignItems: isMobile ? 'center' : '' }}
          className="image-portal-block"
        >
          <div>
            <img
              src={image}
              className={isMobile ? 'w-100' : 'h-100 w-100'}
              alt="opened message"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  )

ImagePortal.propTypes = {
  image: PropTypes.string,
  isMobile: PropTypes.bool,
}

ImagePortal.defaultProps = {
  image: '',
  isMobile: false,
}

export default ImagePortal
