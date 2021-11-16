import React from 'react'

import Grid from '@material-ui/core/Grid'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import BaseView from '../BaseView'

import arrowBack from '../../../assets/img/channels/arrow-back.svg'
import addLevel from '../../../assets/img/channels/add-level-icon.svg'
import removeImageIcon from '../../../assets/img/channels/remove-photo.svg'
import editIcon from '../../../assets/img/channels/edit-icon.svg'
import LevelsViewModel from '../../view-model/levels/LevelsViewModel'
import Channel from '../../../domain/models/channel/Channel'
import ChannelListLevels from '../../../data/models/level/ChannelListLevels'
import ParticipationLevelItem from './ParticipationLevelItem'
import Button from '../../ui/button'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'
import Loading from '../../../utils/LoadingComponent'
import ChannelInfo from '../../../domain/models/channel/ChannelInfo'
import {
  APPLICATION_SERVER,
  LEVELS_COUNT_OF_UPLOADING,
} from '../../../constants'
import InfiniteWaypoint from '../../../components/InfiniteWayPoint'
import addNewLevelIcon from '../../../assets/img/channels/add-level-icon-admin.svg'

interface PathParamsType {
  pathParam: string
}

interface Props extends RouteComponentProps<PathParamsType> {
  levelsViewModel: LevelsViewModel
  path: string
  isMobile: boolean
  setChosedModal(openedModal: string): void
  setChosedEditLevelId(levelId: number): void
  setChosedChannel(openedChannel: string): void
  chosedChannelName: string
}

interface State {
  channelLevels: ChannelListLevels[]
  isShowMenuBar: boolean
  levelEditChanneLId: string
  channelName?: string
  channelData?: ChannelInfo
  channelInfo?: Channel
  isLoading: boolean
}

class ParticipationLevelsComponent
  extends React.Component<Props, State>
  implements BaseView
{
  private readonly levelsViewModel: LevelsViewModel

  constructor(props: Props) {
    super(props)

    const { levelsViewModel } = this.props

    this.levelsViewModel = levelsViewModel

    this.state = {
      channelLevels: this.levelsViewModel.channelLevels,
      isShowMenuBar: false,
      levelEditChanneLId: '',
      channelData: this.levelsViewModel.channelData,
      page: 2,
      //@ts-ignore
      channelName: this.props.match.params.channel || '',
      isLoading: this.levelsViewModel.isLoading,
      channelInfo: this.levelsViewModel.channelData?.channel[0],
    }
  }

  public componentDidMount = (): void => {
    this.levelsViewModel.attachView(this)
    this.levelsViewModel.getChannelInfo(
      this.state.channelName
        ? this.state.channelName
        : this.props.chosedChannelName
    )
  }

  public componentWillUnmount = (): void => {
    this.levelsViewModel.detachView(this)
  }

  public onViewModelChanged = (): void => {
    this.setState({
      channelData: this.levelsViewModel.channelData,
      channelLevels: this.levelsViewModel.channelLevels,
      isLoading: this.levelsViewModel.isLoading,
      channelInfo: this.levelsViewModel.channelData?.channel[0],
    })
  }

  public render() {
    const {
      isShowMenuBar,
      channelLevels,
      levelEditChanneLId,
      isLoading,
      channelInfo,
      page,
    } = this.state

    const { setChannelIdForCreatingLevel } = this.props

    const totalPages = Math.round(
      channelLevels?.total / LEVELS_COUNT_OF_UPLOADING
    )

    const loadMore = async () => {
      const channelName = this.state.channelName
        ? this.state.channelName
        : this.props.chosedChannelName
      if (totalPages >= page) {
        const levels = await fetch(
          `${APPLICATION_SERVER}/api/v1/levels/channel/link/${channelName}?currentPage=${page}&perPage=${LEVELS_COUNT_OF_UPLOADING}`
        ).then((res) => res.json())
        if (levels?.data?.length) {
          this.setState((prevState) => {
            return {
              channelLevels: {
                ...prevState.channelLevels,
                data: [...prevState.channelLevels.data, ...levels?.data],
              },
              page: prevState.page + 1,
            }
          })
        }
      }
    }

    const removeLevel = (channelId) => {
      this.setState((prevState) => {
        const filteredLevels = prevState.channelLevels.data.filter(
          (level) => Number(level.id) !== Number(channelId)
        )
        return {
          channelLevels: {
            data: filteredLevels,
            ...prevState.channelLevels,
          },
        }
      })
    }

    return (
      <div
        className="page-container pt-2"
        style={{
          background: isShowMenuBar ? 'rgba(0, 0, 0, 0.05)' : 'white',
          position: this?.props.isMobile ? 'fixed' : 'relative',
        }}
      >
        <div id="participation-levels-root"  style={{padding: "5px 15px"}}>
          <Grid container spacing={2}>
            {this?.props.isMobile ? (
              <Grid xs={1}>
                <div className="arrow-back-block" style={{paddingTop: '15px'}}>
                  <div onClick={(): void => BrowserHistoryHelper.goBack()}>
                    <img src={arrowBack} alt="arrow back" />
                  </div>
                </div>
              </Grid>
            ) : (
              <Grid>
                <div className="arrow-back-block pt-3 pl-2">
                  <div
                    onClick={(): void => {
                      this.props?.goBack('right')
                    }}
                  >
                    <img src={arrowBack} alt="arrow back" />
                  </div>
                </div>
              </Grid>
            )}

            <Grid xs={9}>
              <div className="page-title">Уровни участия</div>
            </Grid>
            {this.props?.isMobile ? undefined : (
              <Grid xs={1}>
                <div
                  style={{ paddingTop: '21px' }}
                  className="c-p"
                  onClick={() => {
                    this.props?.setChosedModal('create-level')
                    setChannelIdForCreatingLevel(channelInfo?.id)
                  }}
                >
                  <img src={addNewLevelIcon} alt="add new level" />
                </div>
              </Grid>
            )}
          </Grid>
          <div style={{ maxWidth: '600px', margin: ' 0 auto' }}>
            <div className="text-styles pt-4">
              Добавьте уровни участия, описав выгоды и преимущества каждого из
              них. Мы рекомендуем использовать 1-5 уровней.
            </div>

            {isLoading ? (
              <div className="d-flex justify-content-center pt-4 pb-4">
                <Loading />
              </div>
            ) : undefined}

            <div
              className="messages-scrollbar pb-3"
              id="channel-messages-block"
            >
              {channelLevels && channelLevels?.data?.length >= 1
                ? channelLevels?.data?.map((level: ChannelListLevels) => {
                    return (
                      <div
                        key={`level_item_${level.id}`}
                        className="c-p"
                        onClick={(): void => {
                          this.setState({ isShowMenuBar: true })
                          this.setState({
                            levelEditChanneLId: level.id.toString(),
                          })
                        }}
                      >
                        <ParticipationLevelItem level={level} />
                      </div>
                    )
                  })
                : undefined}

              {channelLevels?.data?.length && totalPages >= page ? (
                <InfiniteWaypoint
                  content={channelLevels?.data}
                  totalPages={totalPages}
                  currentPage={page}
                  onEnter={loadMore}
                  direction={'bottom'}
                />
              ) : undefined}
            </div>

            {isShowMenuBar ? (
              <div className="row menu-bar-wrapper">
                <div>
                  <div
                    className="d-flex pt-3 pl-4"
                    style={{ cursor: 'pointer' }}
                    onClick={(): void => {
                      if (this.props?.isMobile) {
                        BrowserHistoryHelper.moveTo(
                          `/${this.state.channelName}/edit-level?id=${levelEditChanneLId}`
                        )
                      } else {
                        this.props?.setChosedEditLevelId(levelEditChanneLId)
                        this.props?.setChosedModal('edit-level')
                      }
                    }}
                  >
                    <div>
                      <img src={editIcon} alt="edit" />
                    </div>
                    <div className="pl-2">
                      <div>Редактировать</div>
                    </div>
                  </div>

                  {/* <div
                    onClick={() => {
                      const isDeleteLevel = window.confirm('Delete this level?')
                      if (levelEditChanneLId && isDeleteLevel) {
                        this.levelsViewModel.onDeleteLevel(levelEditChanneLId)
                        removeLevel(levelEditChanneLId)
                        this.setState({ isShowMenuBar: false })
                      }
                    }}
                  >
                    <div
                      className="d-flex pt-3 pl-4"
                      style={{ cursor: 'pointer' }}
                    >
                      <div>
                        <img
                          className="pl-1"
                          src={removeImageIcon}
                          alt="remove icon"
                          onClick={(): void => {}}
                        />
                      </div>
                      <div className="pl-3" style={{ cursor: 'pointer' }}>
                        Удалить
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="pt-3 d-flex justify-content-center w-100 pb-3">
                  <Button
                    onClick={(): void => {
                      this.setState({ isShowMenuBar: false })
                      this.setState({ levelEditChanneLId: '' })
                    }}
                  >
                    Отменить
                  </Button>
                </div>
              </div>
            ) : undefined}
          </div>
        </div>
        {!isShowMenuBar ? (
          <div
            className="centre-to-right-bottom"
            onClick={() => {
              BrowserHistoryHelper.moveTo(
                `/channel/create-level?id=${channelInfo && channelInfo.id}`
              )
            }}
          >
            <div className="text-right">
              <img className="c-p" src={addLevel} alt="add message" />
            </div>
          </div>
        ) : undefined}
      </div>
    )
  }
}

export default withRouter(ParticipationLevelsComponent)
