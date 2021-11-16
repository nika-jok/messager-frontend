import React from 'react'

import Grid from '@material-ui/core/Grid'

import arrowBack from '../../../assets/img/channels/arrow-back.svg'
import confirmCheck from '../../../assets/img/channels/confirm-check.svg'
import uploadImageIcon from '../../../assets/img/channels/upload-image.svg'
import Input from '../../ui/input/Input'
import LevelsViewModel from '../../view-model/levels/LevelsViewModel'
import ChannelsViewModel from '../../view-model/channels/ChannelsViewModel'
import BrowserHistoryRouter from '../../../utils/BrowserHistoryRouter'
import Loading from '../../../utils/LoadingComponent'
import Button from '../../ui/button'
import LevelIcons from '../../../domain/models/level/LevelIcons'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'

interface Props {
  levelViewModel: LevelsViewModel
  channelsViewModel: ChannelsViewModel
}

interface State {
  name: string
  description: string
  price: string
  isMorePrice: boolean
  isShowNameError: boolean
  isShowDescriptionError: boolean
  isShowPriceError: boolean
  isCreateLevelWithChannel: boolean
  isLoading: boolean
  isShowChooseLevel: boolean
  levelIcons?: LevelIcons[]
  level_image_id?: number
  level_image_link: string
  uploadedChannelImage?: string
}

export default class CreateeNewLevelComponent extends React.Component<
  Props,
  State
> {
  public channelId: string
  private levelViewModel: LevelsViewModel
  private channelsViewModel: ChannelsViewModel
  constructor(props: Props) {
    super(props)

    const { levelViewModel, channelsViewModel } = this.props

    this.levelViewModel = levelViewModel
    this.channelsViewModel = channelsViewModel
    this.channelId = ''

    this.state = {
      name: '',
      description: '',
      price: '$',
      isMorePrice: false,
      isShowNameError: false,
      isShowDescriptionError: false,
      isShowPriceError: false,
      isCreateLevelWithChannel: false,
      isLoading: this.levelViewModel.isLoading,
      uploadedChannelImage: this.channelsViewModel.uploadedChannelImage,
      isShowChooseLevel: false,
      levelIcons: undefined,
      level_image_id: undefined,
      level_image_link: '',
    }
  }

  public componentDidMount = (): void => {
    this.levelViewModel.attachView(this)

    this.channelId = new URLSearchParams(window.location.search).get('id') || ''
    if (!this.channelId) {
      this.setState({ isCreateLevelWithChannel: true })
    }
  }

  public componentWillUnmount = (): void => {
    this.levelViewModel.detachView(this)
  }

  public onViewModelChanged = (): void => {
    this.setState({
      isLoading: this.levelViewModel.isLoading,
      levelIcons: this.levelViewModel.levelIcons,
      uploadedChannelImage: this.channelsViewModel.uploadedChannelImage,
    })
  }

  public render() {
    const {
      name,
      description,
      price,
      isMorePrice,
      isShowNameError,
      isShowDescriptionError,
      isShowPriceError,
      isLoading,
      uploadedChannelImage,
      isShowChooseLevel,
      levelIcons,
      level_image_id,
      level_image_link,
    } = this.state

    const {
      isMobile,
      channelIdForCreatingLevel,
      setLastOpened,
      isNewChannel,
      setChosedModal,
      setChosedChannel,
      setChosedId,
    } = this.props

    console.log(channelIdForCreatingLevel)

    const isValidFieldsForCreateLevel = () => {
      let isValid = true

      if (!name) {
        this.setState({ isShowNameError: true })
        isValid = false
      }

      if (!description) {
        this.setState({ isShowDescriptionError: true })
        isValid = false
      }

      if (!price.slice(1)) {
        this.setState({ isShowPriceError: true })
        isValid = false
      }

      return isValid
    }
    const { isCreateLevelWithChannel } = this.state

    return (
      <div
        className="page-container pt-2"
        style={{
          background: isShowChooseLevel ? 'rgba(0, 0, 0, 0.05)' : '',
          position: isMobile ? 'fixed' : 'relative',
        }}
      >
        <div id="new-level-root" style={{padding: '0 15px'}}>
          <Grid container spacing={2}>
            <Grid xs={1} style={{ marginRight: '10px' }}>
              <div className="arrow-back-block">
                <div
                  className="icon-hover"
                  onClick={(): void => BrowserHistoryRouter.goBack()}
                >
                  <img src={arrowBack} alt="arrow back" />
                </div>
              </div>
            </Grid>
            <Grid xs={9}>
              <div className="page-title">Новый уровень</div>
            </Grid>
            <div>
              <div
                onClick={(): void => {
                  if (isValidFieldsForCreateLevel()) {
                    console.log(isCreateLevelWithChannel)
                    if (
                      isCreateLevelWithChannel &&
                      !channelIdForCreatingLevel
                    ) {
                      ;(async () => {
                        const channel =
                          await this.channelsViewModel.createNewChannel(
                            //@ts-ignore
                            uploadedChannelImage?.file,
                            {
                              level_name: name,
                              level_description: description,
                              level_price: Number(price.slice(1)),
                              level_image_id: level_image_id as number,
                              level_image_link: level_image_link
                                ? level_image_link
                                : ((levelIcons &&
                                    levelIcons[0]?.image) as string),
                            }
                          )

                        if (isNewChannel) {
                          setChosedModal('channels')
                          setChosedChannel(channel)
                          setLastOpened('channel')
                          BrowserHistoryHelper.replaceCurrectUrlInHistory(
                            channel
                          )
                        } else {
                          BrowserHistoryHelper.moveTo(channel)
                        }
                      })()
                    } else {
                      console.log(channelIdForCreatingLevel)
                      this.levelViewModel.onCreateLevel({
                        name,
                        description,
                        price_per_month: Number(price.slice(1)),
                        channel_id:
                          Number(this.channelId) || channelIdForCreatingLevel,
                        level_image_id: level_image_id as number,
                        level_image_link: level_image_link
                          ? level_image_link
                          : ((levelIcons && levelIcons[0]?.image) as string),
                      })
                      if (isMobile) {
                        BrowserHistoryHelper.goBack()
                      } else {
                        setLastOpened('channel-levels')
                      }
                    }
                  }
                }}
                className="next-page"
              >
                <button
                  className="icon-hover"
                  style={{
                    lineHeight: '36px',
                    paddingTop: 0,
                    marginTop: '7px',
                  }}
                >
                  <img src={confirmCheck} alt="confirm-checkmark" />
                </button>
              </div>
            </div>
          </Grid>
          {isLoading ? (
            <div className="d-flex justify-content-center pt-4 pb-4">
              <Loading />
            </div>
          ) : undefined}
          <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <div
              className="d-flex justify-content-center"
              style={{ paddingTop: '33px' }}
            >
              <div className="image-upload">
                <label htmlFor="file-input">
                  <img
                    src={
                      level_image_link
                        ? level_image_link
                        : levelIcons && levelIcons.length >= 1
                        ? levelIcons[0].image
                        : uploadImageIcon
                    }
                    onClick={(): void => {
                      this.setState({ isShowChooseLevel: true })
                    }}
                    alt="uploadImageIcon"
                    style={{
                      width: '80px',
                      height: '80px',
                      cursor: 'pointer',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      borderRadius: '50%',
                    }}
                  />
                </label>
              </div>
            </div>

            <div style={{ paddingTop: '20px' }}>
              <label className="d-block">Название</label>
              <Input
                className={`${isShowNameError ? 'error-border' : ''}`}
                value={name}
                style={{
                  background: isShowChooseLevel ? '#F2F2F2' : 'white',
                }}
                placeholder="Название уровня подписки"
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  this.setState({
                    isShowNameError: false,
                    name: e.currentTarget.value,
                  })
                }}
              />
            </div>

            <div style={{ paddingTop: '22px' }}>
              <label className="d-block">Описание</label>
              <textarea
                style={{
                  background: isShowChooseLevel ? '#F2F2F2' : 'white',
                }}
                className={`${
                  isShowDescriptionError ? 'error-border' : ''
                } page-textarea`}
                placeholder="Описание уровня подписки"
                onChange={(e) => {
                  this.setState({
                    isShowDescriptionError: false,
                    description: e.currentTarget.value,
                  })
                }}
                value={description}
              />
            </div>
            <div style={{ paddingTop: '16px' }}>
              <label className="d-block">Цена в месяц</label>
              <Input
                className={`input-unchanged ${
                  isShowPriceError ? 'error-border' : ''
                }`}
                value={price}
                style={{ color: isMorePrice ? '#000' : 'rgb(84, 84, 84)' }}
                type="text"
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  if (
                    e.currentTarget.value[0] === '$' &&
                    !/\D/.test(e.currentTarget.value.slice(1))
                  ) {
                    this.setState({
                      isShowPriceError: false,
                      price: e.currentTarget.value.trim(),
                      isMorePrice: true,
                    })
                  }
                  if (e.currentTarget.value === '$') {
                    this.setState({ isMorePrice: false })
                  }
                }}
              />
            </div>

            <div className="text-styles">
              Укажите цену в месяц от $1 до $1000. 50%-95% от суммы платежей участников
               будут поступать на Ваш баланс.
            </div>

            {isShowChooseLevel ? (
              <div className="row menu-bar-wrapper">
                <div className="ml-3 pt-2">Выберите изображение</div>
                <div className="d-flex justify-content-around w-100 pt-2">
                  {levelIcons && levelIcons.length >= 1
                    ? levelIcons.slice(0, 3).map((levelIcon: LevelIcons) => {
                        return (
                          <div
                            key={`level_icon_${levelIcon.id}`}
                            onClick={(): void => {
                              this.setState({
                                level_image_id: levelIcon.id,
                                level_image_link: levelIcon.image,
                                isShowChooseLevel: false,
                              })
                            }}
                          >
                            <img src={levelIcon.image} alt="level" />
                          </div>
                        )
                      })
                    : undefined}
                </div>
                <div className="d-flex justify-content-around w-100 pt-2">
                  {levelIcons && levelIcons.length >= 1
                    ? levelIcons.slice(3, 6).map((levelIcon: LevelIcons) => {
                        return (
                          <div
                            key={`level_icon_${levelIcon.id}`}
                            onClick={(): void => {
                              this.setState({
                                level_image_id: levelIcon.id,
                                level_image_link: levelIcon.image,
                                isShowChooseLevel: false,
                              })
                            }}
                          >
                            <img src={levelIcon.image} alt="level" />
                          </div>
                        )
                      })
                    : undefined}
                </div>
                <div className="pt-3 d-flex justify-content-center w-100 pb-3">
                  <Button
                    onClick={() => {
                      this.setState({ isShowChooseLevel: false })
                    }}
                  >
                    Отменить
                  </Button>
                </div>
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
    )
  }
}
