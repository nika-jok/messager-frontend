import React from 'react'

import Grid from '@material-ui/core/Grid'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import BaseView from '../BaseView'

import arrowBack from '../../../assets/img/channels/arrow-back.svg'
import appleIcon from '../../../assets/img/channels/appleIcon.svg'

import ChooseLevelItem from './ChooseLevelItem'
import Button from '../../ui/button/index'
import ChooseLevelViewModel from '../../view-model/levels/choose-level/ChooseLevelViewModel'
import LevelsList from '../../../domain/models/channel/LevelsList'
import BrowserHistoryRouter from '../../../utils/BrowserHistoryRouter'
import Loading from '../../../utils/LoadingComponent'
import SubsribedTo from '../../../domain/models/channel/SubscribedTo'

interface PathParamsType {
  pathParam: string
}

interface Props extends RouteComponentProps<PathParamsType> {
  chooseLevelViewModel: ChooseLevelViewModel
  path: string
}

interface State {
  levelsList?: LevelsList[]
  subcribedTo?: SubsribedTo[]
  isShowMenuBar: boolean
  isChosedOneMonth: boolean
  isChosedSixMonth: boolean
  isChosedTwelveMonth: boolean
  price?: number
  channelName: string
  levelId?: number
  monthsCount: number
  isLoading: boolean
  channelAdminId: string
  subscribedLevels: []
}

class ChooseLevelComponent
  extends React.Component<Props, State>
  implements BaseView
{
  private readonly chooseLevelViewModel: ChooseLevelViewModel

  constructor(props: Props) {
    super(props)

    const { chooseLevelViewModel } = this.props

    this.chooseLevelViewModel = chooseLevelViewModel

    this.state = {
      levelsList: this.chooseLevelViewModel.levelsList,
      subcribedTo: this.chooseLevelViewModel.subcribedTo,
      isShowMenuBar: false,
      isChosedOneMonth: true,
      isChosedSixMonth: false,
      isChosedTwelveMonth: false,
      price: undefined,
      //@ts-ignore
      channelAdminId: this.chooseLevelViewModel.channelAdminId,
      //@ts-ignore
      channelName: this.props.match.params.channel,
      levelId: undefined,
      monthsCount: 1,
      isLoading: this.chooseLevelViewModel.isLoading,
      subscribedLevels: this.chooseLevelViewModel.subscribedLevels,
    }
  }

  public componentDidMount = (): void => {
    this.chooseLevelViewModel.attachView(this)
    console.log(this.state.channelName)
    this.chooseLevelViewModel.getChannelLevelsByChannelName(
      this.props?.chosedChannel
        ? this.props?.chosedChannel
        : this.state.channelName
    )
  }

  public componentWillUnmount = (): void => {
    this.chooseLevelViewModel.detachView(this)
  }

  public onViewModelChanged = (): void => {
    this.setState({
      levelsList: this.chooseLevelViewModel.levelsList,
      subcribedTo: this.chooseLevelViewModel.subcribedTo,
      isLoading: this.chooseLevelViewModel.isLoading,
      //@ts-ignore
      channelAdminId: this.chooseLevelViewModel.channelAdminId,
      subscribedLevels: this.chooseLevelViewModel.subscribedLevels,
    })
  }

  public render() {
    const {
      levelsList,
      isShowMenuBar,
      isChosedOneMonth,
      isChosedSixMonth,
      isChosedTwelveMonth,
      levelId,
      price,
      monthsCount,
      isLoading,
      subcribedTo,
      channelAdminId,
      subscribedLevels,
    } = this.state

    const { isMobile } = this.props

    const nullifyAllButtons = (): void => {
      this.setState({ isChosedOneMonth: false })
      this.setState({ isChosedSixMonth: false })
      this.setState({ isChosedTwelveMonth: false })
    }

    const chosedLevel = levelsList?.filter(
      (level: LevelsList) => level.id === levelId
    )

    const chosedLevelPrice = chosedLevel && chosedLevel[0]?.price_per_month
    return (
      <div
        className="page-container pt-2"
        style={{
          background: `${isShowMenuBar ? 'rgba(0, 0, 0, 0.05)' : 'white'}`,
          position: isMobile ? 'fixed' : 'relative',
        }}
      >
        <div id="participation-levels-root"  style={{padding: "5px 15px"}}>
          <Grid container spacing={2}>
            <Grid xs={1} style={{ marginRight: '10px' }}>
              <div className="arrow-back-block">
                <div
                 style={{paddingTop: '15px'}}
                  className="icon-hover"
                  onClick={(): void => BrowserHistoryRouter.goBack()}
                >
                  <img src={arrowBack} alt="arrow back" />
                </div>
              </div>
            </Grid>
            <Grid xs={9}>
              <div className="page-title">Выберите уровень участия</div>{' '}
            </Grid>
          </Grid>

          {isLoading ? (
            <div className="d-flex justify-content-center pt-4 pb-4">
              <Loading />
            </div>
          ) : undefined}
          {levelsList && levelsList.length >= 1
            ? levelsList.map((level: LevelsList) => {
                const subcribeItem = subscribedLevels?.filter(
                  (subscribedTo: SubsribedTo) =>
                    subscribedTo.level_id === level.id
                )[0]
                return (
                  <ChooseLevelItem
                    key={`choose_level_item_${level.id}`}
                    setIsShowMenuBar={(
                      isShowMenuBar: boolean,
                      levelId: number
                    ): void => {
                      this.setState({ isShowMenuBar, levelId })
                    }}
                    level={level}
                    expires={
                      subcribeItem ? (subcribeItem.subscribed_to as string) : ''
                    }
                  />
                )
              })
            : undefined}

          {isShowMenuBar ? (
            <div className="row menu-bar-wrapper">
              <div>
                <div className="d-flex pt-3 pl-4" style={{ cursor: 'pointer' }}>
                  <div className="pl-2 d-flex">
                    <label>Укажите период участия</label>
                    <div className="pl-2">
                      <img src={appleIcon} alt="level-icon" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center w-100">
                <div className="row">
                  <div
                    className={`${
                      isChosedOneMonth
                        ? 'month-count-button-wrapper-chosed'
                        : 'month-count-button-wrapper'
                    } ml-2`}
                  >
                    <button
                      onClick={(): void => {
                        nullifyAllButtons()
                        this.setState({
                          isChosedOneMonth: true,
                          monthsCount: 1,
                          price: chosedLevelPrice,
                        })
                      }}
                    >
                      1 месяц
                    </button>
                  </div>
                  <div
                    className={`${
                      isChosedSixMonth
                        ? 'month-count-button-wrapper-chosed'
                        : 'month-count-button-wrapper '
                    } ml-2`}
                  >
                    <button
                      onClick={(): void => {
                        nullifyAllButtons()
                        this.setState({
                          isChosedSixMonth: true,
                          monthsCount: 6,
                          price: Number(chosedLevelPrice * 6),
                        })
                      }}
                    >
                      6 месяцев
                    </button>
                  </div>
                  <div
                    className={`${
                      isChosedTwelveMonth
                        ? 'month-count-button-wrapper-chosed'
                        : 'month-count-button-wrapper'
                    } ml-2`}
                  >
                    <button
                      onClick={(): void => {
                        nullifyAllButtons()
                        this.setState({
                          isChosedTwelveMonth: true,
                          monthsCount: 12,
                          price: Number(chosedLevelPrice * 12),
                        })
                      }}
                    >
                      12 месяцев
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-3 d-flex justify-content-center w-100 pb-3">
                <Button
                  onClick={(): void => {
                    const subscribeDate =
                      subcribedTo &&
                      chosedLevel &&
                      subcribedTo?.filter(
                        (subscribedTo: SubsribedTo) =>
                          subscribedTo.id === chosedLevel[0]?.id
                      )[0]?.subscribed_to

                    this.chooseLevelViewModel.getFondyPaymentPage(
                      //@ts-ignore
                      price ? price.toString() : chosedLevelPrice?.toString(),
                      chosedLevel && chosedLevel[0]?.name,
                      monthsCount,
                      channelAdminId,
                      chosedLevel && chosedLevel[0].channel_id,
                      chosedLevel && chosedLevel[0].id,
                      this.state.channelName,
                      subscribeDate ? subscribeDate : new Date()
                    )
                  }}
                >
                  Оплатить ${price ? price : chosedLevelPrice}
                </Button>
              </div>

              <div className="pt-1 d-flex justify-content-center w-100 pb-3">
                <Button
                  onClick={(): void => {
                    nullifyAllButtons()
                    this.setState({
                      isChosedOneMonth: true,
                      isShowMenuBar: false,
                      price: undefined,
                    })
                  }}
                >
                  Отменить
                </Button>
              </div>
            </div>
          ) : undefined}
        </div>
      </div>
    )
  }
}

export default withRouter(ChooseLevelComponent)
