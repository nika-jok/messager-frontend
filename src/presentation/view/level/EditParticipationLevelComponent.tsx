import React from 'react'

import Grid from '@material-ui/core/Grid'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import BaseView from '../BaseView'

import arrowBack from '../../../assets/img/channels/arrow-back.svg'
import confirmCheck from '../../../assets/img/channels/confirm-check.svg'
import uploadImageIcon from '../../../assets/img/channels/upload-image.svg'

import EditLevelViewModel from '../../view-model/levels/edit-level/EditLevelViewModel'

import Input from '../../ui/input/Input'
import EditLevel from '../../../data/models/level/EditLevel'
import Loading from '../../../utils/LoadingComponent'
import BrowserHistoryRouter from '../../../utils/BrowserHistoryRouter'
import { APPLICATION_SERVER } from '../../../constants'
import Button from '../../ui/button'
import LevelIcons from '../../../domain/models/level/LevelIcons'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'

interface PathParamsType {
  pathParam: string
}

interface Props extends RouteComponentProps<PathParamsType> {
  editLevelViewModel: EditLevelViewModel
  path: string
  chosedEditLevelId: number
  isMobile: boolean
  setChosedModal(openedModal: string): void
}

interface State {
  levelId?: string
  levelData?: EditLevel
  name?: string
  description?: string
  price: string
  isMorePrice: boolean | null
  isShowNameError: boolean
  isShowDescriptionError: boolean
  isShowPriceError: boolean
  channelName: string
  isLoading: boolean
  levelImage?: File
  previewLevelImage?: string
  level_image_link: string
  level_image_id?: number
  isShowChooseLevel: boolean
  levelIcons?: LevelIcons[]
}

class EditParticipationLevelComponent
  extends React.Component<Props, State>
  implements BaseView
{
  private readonly editLevelViewModel: EditLevelViewModel

  constructor(props: Props) {
    super(props)

    const { editLevelViewModel } = this.props

    this.editLevelViewModel = editLevelViewModel

    this.state = {
      levelData: this.editLevelViewModel.levelData,
      levelId: this.editLevelViewModel.levelId,
      isLoading: this.editLevelViewModel.isLoading,
      levelIcons: this.editLevelViewModel.levelIcons,
      name: '',
      description: '',
      price: '$',
      isMorePrice: null,
      isShowNameError: false,
      isShowDescriptionError: false,
      level_image_link: '',
      level_image_id: undefined,
      isShowPriceError: false,
      isShowChooseLevel: false,
      //@ts-ignore
      channelName: this.props.match.params.channel,
    }
  }

  public componentDidMount = (): void => {
    this.editLevelViewModel.attachView(this)

    if (this?.props?.isMobile) {
      this.editLevelViewModel.transmitChannelName(this.state.channelName)
    } else {
      this.editLevelViewModel.updateLevelId(
        this.props?.chosedEditLevelId.toString()
      )
    }
  }

  public componentDidUpdate = (prevProps: Props, prevState: State): void => {
    if (
      prevState.levelData !== this.state.levelData ||
      prevState.levelIcons !== this.state.levelIcons
    ) {
      if (this.state.levelData) {
        this.setState({
          name: this.state.levelData.name,
          description: this.state.levelData.description,
          price: '$' + this.state.levelData.price_per_month,
          isMorePrice: this.state.levelData.price_per_month ? true : false,
          level_image_link: this.state.levelData.level_image_link,
          level_image_id: this.state.levelData.level_image_id,
          levelIcons: this.state.levelIcons,
        })
      }
    }
  }

  public componentWillUnmount = (): void => {
    this.editLevelViewModel.detachView(this)
  }

  public onViewModelChanged = (): void => {
    this.setState({
      levelData: this.editLevelViewModel.levelData,
      levelId: this.editLevelViewModel.levelId,
      isLoading: this.editLevelViewModel.isLoading,
      levelIcons: this.editLevelViewModel.levelIcons,
      channelName: this.editLevelViewModel.channelName,
    })
  }

  public render() {
    const {
      levelId,
      levelData,
      name,
      description,
      price,
      isMorePrice,
      isShowNameError,
      isShowDescriptionError,
      isShowPriceError,
      isLoading,
      level_image_link,
      level_image_id,
      isShowChooseLevel,
      levelIcons,
      channelName,
    } = this.state

    const isValidFieldsForEditLevel = () => {
      let isValid = true

      if (!name) {
        this.setState({ isShowNameError: true })
        isValid = false
      }

      if (!description) {
        this.setState({ isShowDescriptionError: true })
        isValid = false
      }

      if (!price) {
        this.setState({ isShowPriceError: true })
        isValid = false
      }

      return isValid
    }

    return (
      <div
        className="page-container pt-2"
        style={{ position: this.props?.isMobile ? 'fixed' : 'relative' }}
      >
        <div id="participation-levels-root"  style={{padding: "5px 15px"}}>
          {!!levelData ? (
            <>
              <Grid container spacing={2}>
                <Grid
                  xs={this?.props?.isMobile ? 1 : 0}
                  style={{ marginRight: '10px' }}
                >
                  <div className="arrow-back-block"  style={{paddingTop: '15px'}}>
                    <div
                      className="icon-hover"
                      onClick={(): void => {
                        if (this?.props?.isMobile) {
                          BrowserHistoryRouter.goBack()
                        } else {
                          this.props?.goBack('right')
                        }
                      }}
                    >
                      <img src={arrowBack} alt="arrow back" />
                    </div>
                  </div>
                </Grid>
                <Grid xs={9}>
                  <div className="page-title">Редактировать уровень</div>
                </Grid>
                <Grid xs={this?.props?.isMobile ? 1 : ''}>
                  <div className="next-page">
                    <button
                      className="icon-hover"
                      style={{
                        lineHeight: '36px',
                        paddingTop: 0,
                        marginTop: '7px',
                      }}
                      onClick={(): void => {
                        if (isValidFieldsForEditLevel()) {
                          this.editLevelViewModel.onUpdateLevel({
                            id: this.props.isMobile
                              ? levelId
                              : this.props.chosedEditLevelId,
                            name,
                            description,
                            price_per_month: parseInt(price.slice(1)) as number,
                            level_image_id: level_image_id
                              ? level_image_id
                              : undefined,
                            level_image_link: level_image_link
                              ? level_image_link
                              : '',
                          })

                          if (this?.props?.isMobile) {
                            BrowserHistoryHelper.moveTo(
                              `/${channelName}/participation-levels`
                            )
                          } else {
                            this.props?.goBack('right')
                          }
                        }
                      }}
                    >
                      <img src={confirmCheck} alt="confirm-checkmark" />
                    </button>
                  </div>{' '}
                </Grid>

                {isLoading ? (
                  <div className="d-flex justify-content-center w-100 pt-4 pb-4">
                    <Loading />
                  </div>
                ) : undefined}
              </Grid>
              <div style={{ margin: '0 auto', maxWidth: '600px' }}>
                <Grid xs={12}>
                  <div
                    className="d-flex justify-content-center"
                    style={{ paddingTop: '33px' }}
                  >
                    <div className="image-upload">
                      <label htmlFor="file-input">
                        <img
                          onClick={(): void => {
                            this.setState({ isShowChooseLevel: true })
                          }}
                          key={`level_icon_${level_image_id}`}
                          src={
                            level_image_link
                              ? level_image_link
                              : levelData.files && levelData.files.length >= 1
                              ? `${APPLICATION_SERVER}/files/storage/icons/${levelData.files[0]}`
                              : uploadImageIcon
                          }
                          alt="upload"
                          style={{
                            width: '80px',
                            height: '80px',
                            border: ' 1px solid rgba(0, 0, 0, 0.05)',
                            borderRadius: '50%',
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </Grid>

                <div style={{ paddingTop: '20px' }}>
                  <label className="d-block">Название</label>
                  <Input
                    className={`${isShowNameError ? 'error-border' : ''}`}
                    value={name}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      this.setState({ isShowNameError: false })
                      this.setState({ name: e.currentTarget.value })
                    }}
                    placeholder="Название уровня подписки"
                  />
                </div>

                <div style={{ paddingTop: '10px' }}>
                  <label className="d-block">Описание</label>
                  <textarea
                    className={`${
                      isShowDescriptionError ? 'error-border' : ''
                    } page-textarea`}
                    onChange={(e) => {
                      this.setState({ isShowDescriptionError: false })
                      this.setState({ description: e.currentTarget.value })
                    }}
                    value={description}
                    placeholder="Описание уровня подписки"
                  />
                </div>
                <div style={{ paddingTop: '10px' }}>
                  <label className="d-block">Цена</label>
                  <Input
                    className={`input-unchanged ${
                      isShowPriceError ? 'error-border' : ''
                    }`}
                    style={{ color: isMorePrice ? '#000' : 'rgb(84, 84, 84)' }}
                    value={price}
                    type="text"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      if (
                        e.currentTarget.value[0] === '$' &&
                        !/\D/.test(e.currentTarget.value.slice(1))
                      ) {
                        this.setState({
                          price: e.currentTarget.value.trim(),
                          isMorePrice: true,
                          isShowPriceError: false,
                        })
                      }
                      if (e.currentTarget.value === '$') {
                        this.setState({ isMorePrice: false })
                      }
                    }}
                  />
                </div>

                <div className="text-styles pt-4">
                  Укажите цену в месяц от $1 до $1000. 50%-95% от суммы платежей участников
                   будут поступать на Ваш баланс.
                </div>
              </div>
            </>
          ) : (
            <Loading />
          )}
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
    )
  }
}
//@ts-ignore
export default withRouter(EditParticipationLevelComponent)
