import React from 'react'

import Grid from '@material-ui/core/Grid'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import BaseView from '../../BaseView'

import closeIcon from '../../../../assets/img/admin/close-modal.svg'
import ChooseLevelViewModel from '../../../view-model/levels/choose-level/ChooseLevelViewModel'
import LevelsList from '../../../../domain/models/channel/LevelsList'
import BrowserHistoryRouter from '../../../../utils/BrowserHistoryRouter'
import AdminChooseItem from './AdminChooseItem'
import ChannelViewModel from '../../../view-model/channels/ChannelViewModel'
import arrowBack from '../../../../assets/img/channels/arrow-back.svg'
import confirmCheck from '../../../../assets/img/channels/confirm-check.svg'

interface PathParamsType {
  pathParam: string
}

interface Props extends RouteComponentProps<PathParamsType> {
  chooseLevelViewModel: ChooseLevelViewModel
  channelViewModel: ChannelViewModel
  path: string
  isMobile: boolean
  setChosedModal(): void
  setChosedLevels?(chosedLevels: number[]): void
  chosedLevels: number[]
  channelName: string
}

interface State {
  levelsList?: LevelsList[]
  channelName: string
  choosedLevelId?: number
  chosedLevels: []
}

class AdminChooseLevelComponent
  extends React.Component<Props, State>
  implements BaseView
{
  private readonly chooseLevelViewModel: ChooseLevelViewModel
  private readonly channelViewModel: ChannelViewModel

  constructor(props: Props) {
    super(props)

    const { chooseLevelViewModel, channelViewModel } = this.props

    this.chooseLevelViewModel = chooseLevelViewModel
    this.channelViewModel = channelViewModel

    this.state = {
      levelsList: this.chooseLevelViewModel.levelsList,
      choosedLevelId: undefined,
      chosedLevels: [],

      //@ts-ignore
      channelName: this.props.match.params.channel,
    }
  }

  public componentDidMount = (): void => {
    this.chooseLevelViewModel.attachView(this)

    this.chooseLevelViewModel.getChannelLevelsByChannelName(
      this.state.channelName
    )
  }

  public componentWillUnmount = (): void => {
    this.chooseLevelViewModel.detachView(this)
  }

  public scrollToBottom() {}

  public onViewModelChanged = (): void => {
    this.setState({
      levelsList: this.chooseLevelViewModel.levelsList,
      chosedLevels: this.chooseLevelViewModel.chosedLevels,
    })
  }

  public render(): JSX.Element {
    const { levelsList, chosedLevels } = this.state
    console.log('chosedLevels AdminChooseLevelComponent')
    console.log(chosedLevels)
    console.log('chosedLevels AdminChooseLevelComponent')
    return (
      <div
        className="page-container pt-2"
        style={{
          position: this.props?.isMobile ? 'fixed' : 'relative',
        }}
      >
        <div id="participation-levels-root" style={{padding: "5px 15px"}}>
          <Grid container spacing={2}>
            {this?.props?.isMobile ? (
              <Grid xs={1}>
                <div className="arrow-back-block">
                  <div
                    onClick={(): void => {
                      BrowserHistoryRouter.goBack()
                    }}
                  >
                    <img src={closeIcon} alt="arrow back" />
                  </div>
                </div>
              </Grid>
            ) : (
              <Grid>
                <div className="arrow-back-block" style={{paddingTop: '10px'}}>
                  <div
                    className="icon-hover"
                    onClick={(): void => this?.props?.goBack('right')}
                  >
                    <img src={arrowBack} alt="arrow back" />
                  </div>
                </div>
              </Grid>
            )}

            <Grid xs={9}>
              <div className="page-title">Выбрать уровни</div>
            </Grid>

            <Grid xs={2}>
              <div className="next-page">
                <div
                  onClick={(): void => {
                    this.channelViewModel.transmitChosedLevels(chosedLevels)

                    if (this?.props?.isMobile) {
                      BrowserHistoryRouter.goBack()
                    } else {
                      this?.props?.goBack('right')
                    }

                    // BrowserHistoryRouter.moveTo(`/${this.state.channelName}`)
                  }}
                >
                  <div className="next-page">
                    <button
                      className="icon-hover"
                      style={{
                        lineHeight: '36px',
                        paddingTop: 0,
                        marginTop: '16px',
                      }}
                    >
                      <img src={confirmCheck} alt="confirm-checkmark" />
                    </button>
                  </div>
                </div>
              </div>{' '}
            </Grid>
          </Grid>
          <div
            style={
              this?.props?.isMobile ? {} : { maxWidth: '600px', margin: 'auto' }
            }
          >
            <div className="text-styles pt-4">
              Выберите уровни участия, для которых вы хотите отправить
              сообщение:
            </div>

            <div id="user-messages-block" className="messages-scrollbar">
              {levelsList && levelsList.length >= 1
                ? levelsList.map((level: LevelsList) => {
                    return (
                      <AdminChooseItem
                        key={`choose_admin_level_item_${level.id}`}
                        level={level}
                        сhoosedLevelsId={chosedLevels}
                        //@ts-ignore
                        isChosedLevel={!!chosedLevels?.includes(level?.id)}
                        setChoosedLevel={(chosedLevelId: number) => {
                          if (chosedLevels?.includes(chosedLevelId)) {
                            this.chooseLevelViewModel.removeLevelFromChosed(
                              chosedLevelId
                            )
                          } else {
                            this.chooseLevelViewModel.addLevelToChosed(
                              chosedLevelId
                            )
                          }
                        }}
                      />
                    )
                  })
                : undefined}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
//@ts-ignore
export default withRouter(AdminChooseLevelComponent)
