import Button from '../../presentation/ui/button'
import PropTypes from 'prop-types'

const ChannelMenu = ({
  handleRemoveMessage,
  removeImageIcon,
  setIsShowMenuBar,
}) => {
  return (
    <div className="row menu-bar-wrapper ml-0">
      <div>
        <div onClick={handleRemoveMessage}>
          <div className="d-flex pt-3 pl-4" style={{ cursor: 'pointer' }}>
            <div>
              <img className="pl-1" src={removeImageIcon} alt="remove icon" />
            </div>
            <div
              className="pl-3"
              style={{
                cursor: 'pointer',
                paddingTop: '2px',
              }}
            >
              Удалить
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
  )
}

ChannelMenu.propTypes = {
  handleRemoveMessage: PropTypes.func,
  removeImageIcon: PropTypes.func,
  setIsShowMenuBar: PropTypes.func,
}

ChannelMenu.defaultProps = {
  handleRemoveMessage: () => {},
  removeImageIcon: () => {},
  setIsShowMenuBar: () => {},
}

export default ChannelMenu
