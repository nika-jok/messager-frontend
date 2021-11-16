import PropTypes from 'prop-types'
import Popup from 'reactjs-popup'

const InfoModal = ({ title, desc, isOpen, onClose }) => {
  return (
    <Popup
      open={isOpen}
      onClose={onClose}
      position="right center"
      closeOnDocumentClick
    >
      {(close) => {
        return (
          <div className="info-modal-wrap">
            <div className="info-modal-title">{title}</div>
            <div className="info-modal-desc">{desc}</div>
            <div className="info-modal-button-wrap">
              <button type="text" onClick={close}>
                Хорошо
              </button>
            </div>
          </div>
        )
      }}
    </Popup>
  )
}

InfoModal.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
}

InfoModal.defaultProps = {
  title: '',
  desc: '',
}

export default InfoModal
