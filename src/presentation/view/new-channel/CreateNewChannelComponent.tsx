import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'
import Input from '../../ui/input/Input'
import arrowBack from '../../../assets/img/channels/arrow-back.svg'
import confirmCheck from '../../../assets/img/channels/confirm-check.svg'
import uploadImageIcon from '../../../assets/img/channels/upload-image.svg'
import ChannelViewModel from '../../view-model/channels/ChannelsViewModel'
import BrowserHistoryRouter from '../../../utils/BrowserHistoryRouter'

interface Props {
  channelViewModel: ChannelViewModel
}

const CreateNewChannelComponent = (props: Props): JSX.Element => {
  const { channelViewModel, isMobile, setChosedModal, goBack } = props

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [channelLink, setChannelLink] = useState('messages.gg/')
  const [isMoreChannelLink, setIsMoreChannelLink] = useState(false)
  const [isShowNameError, setIsShowNameError] = useState(false)
  const [isShowDescriptionError, setIsShowDescriptionError] = useState(false)
  const [isShowChannelLinkError, setIsShowChannelLink] = useState(false)
  const [channelImage, setChannelImage] = useState()
  const [previewChannelImage, setPreviewChannelImage] = useState()

  const isValidFieldsForCreateChat = () => {
    let isValid = true

    if (!name) {
      setIsShowNameError(true)
      isValid = false
    }

    if (!description) {
      setIsShowDescriptionError(true)
      isValid = false
    }

    if (!channelLink) {
      setIsShowChannelLink(true)
      isValid = false
    }

    return isValid
  }

  const reader = new FileReader()

  reader.onloadend = () => {
    //@ts-ignore
    setPreviewChannelImage(reader.result)
  }

  return (
    <>
      <div
        className="page-container pt-2"
        style={{ position: isMobile ? 'fixed' : 'relative' }}
      >
        <div style={{ padding: isMobile ? '3px 15px' : '' }}>
          <Grid container spacing={2}>
            <Grid xs={1} style={{ marginRight: '10px' }}>
              <div className="arrow-back-block">
                <div
                  className="icon-hover"
                  onClick={(): void => {
                    if (isMobile) {
                      if (BrowserHistoryHelper.getHistory()) {
                        BrowserHistoryRouter.goBack()
                      } else {
                        BrowserHistoryRouter.moveTo('/')
                      }
                    } else {
                      goBack('left')
                    }
                  }}
                >
                  <img src={arrowBack} alt="arrow back" />
                </div>
              </div>
            </Grid>
            <Grid xs={9}>
              <div className="page-title">Новый канал</div>
            </Grid>
            <Grid xs={1}>
              <div className="next-page">
                <button
                  className="icon-hover"
                  style={{
                    lineHeight: '36px',
                    paddingTop: 0,
                    marginTop: '7px',
                  }}
                  onClick={() => {
                    if (isValidFieldsForCreateChat()) {
                      channelViewModel.transmitChannelData({
                        name,
                        description,
                        link: channelLink.slice(12),
                        channelImage,
                      })
                      if (isMobile) {
                        BrowserHistoryHelper.moveTo('/channel/create-level')
                      } else {
                        setChosedModal('create-level')
                      }
                    }
                  }}
                >
                  <img src={confirmCheck} alt="confirm-checkmark" />
                </button>
              </div>
            </Grid>
            <Grid xs={12}>
              <div
                className="d-flex justify-content-center"
                style={{ paddingTop: '56px' }}
              >
                <div className="image-upload">
                  <label htmlFor="file-input">
                    <img
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                      }}
                      src={
                        previewChannelImage
                          ? previewChannelImage
                          : uploadImageIcon
                      }
                      alt="upload"
                    />
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    onChange={(e: any): void => {
                      if (
                        e.target &&
                        e.target.files &&
                        e.target.files.length >= 1
                      ) {
                        channelViewModel.uploadChannelImage(e.target.files[0])
                        setChannelImage(e.target.files[0])
                        reader.readAsDataURL(e.target.files[0])
                      }
                    }}
                  />
                </div>
              </div>
            </Grid>
          </Grid>

          <div style={{ paddingTop: '20px' }}>
            <label className="d-block">Название</label>
            <Input
              className={`${isShowNameError ? 'error-border' : ''}`}
              value={name}
              placeholder="Название вашего канала"
              onChange={(e: any) => {
                setIsShowNameError(false)
                setName(e.currentTarget.value)
              }}
            />
          </div>

          <div style={{ paddingTop: '22px' }}>
            <label className="d-block">Описание</label>
            <textarea
              className={`${
                isShowDescriptionError ? 'error-border' : ''
              } page-textarea`}
              placeholder="Описание вашего канала"
              onChange={(e) => {
                setIsShowDescriptionError(false)
                setDescription(e.currentTarget.value)
              }}
              value={description}
            />
          </div>
          <div style={{ paddingTop: '16px' }}>
            <label className="d-block">Ссылка</label>
            <Input
              className={`input-unchanged ${
                isShowChannelLinkError ? 'error-border' : ''
              }`}
              value={channelLink}
              style={{ color: isMoreChannelLink ? '#000' : 'rgb(84, 84, 84)' }}
              type="text"
              onChange={(e: any) => {
                setIsShowChannelLink(false)
                if (e.target.value.slice(0, 12) === 'messages.gg/') {
                  setIsMoreChannelLink(true)
                  setChannelLink(e.target.value.trim())
                }
                if (e.target.value.trim() === 'messages.gg/') {
                  setIsMoreChannelLink(false)
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateNewChannelComponent
