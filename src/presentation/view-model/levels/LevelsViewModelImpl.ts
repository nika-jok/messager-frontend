import {
  APPLICATION_SERVER,
  LEVELS_COUNT_OF_UPLOADING,
} from '../../../constants'
import ChannelListLevels from '../../../data/models/level/ChannelListLevels'
import LevelApiRepository from '../../../data/models/level/LevelApiRepository'
import ChannelApiRepository from '../../../data/models/membership/ChannelApiRepository'
import ChannelInfo from '../../../domain/models/channel/ChannelInfo'
import CreateLevel from '../../../domain/models/level/CreateLevel'
import LevelIcons from '../../../domain/models/level/LevelIcons'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'
import BaseView from '../../view/BaseView'
import ViewModel from '../ViewModel'
import LevelsViewModel from './LevelsViewModel'

export default class LevelsViewModelImpl
  extends ViewModel
  implements LevelsViewModel
{
  public channelData?: ChannelInfo
  public channelLevels: ChannelListLevels[]
  public channelId?: string
  public channelName?: string
  public isLoading: boolean
  public levelIcons?: LevelIcons[]
  private readonly channelRepository: ChannelApiRepository
  private readonly levelRepository: LevelApiRepository

  constructor(
    channelRepository: ChannelApiRepository,
    levelRepository: LevelApiRepository
  ) {
    super()
    this.channelRepository = channelRepository
    this.levelRepository = levelRepository

    this.channelLevels = []
    this.levelIcons = undefined
    this.channelData = undefined
    this.channelName = ''
    this.channelId = ''
    this.isLoading = false
  }

  public attachView = async (baseView: BaseView): Promise<void> => {
    super.attachView(baseView)

    this.levelIcons = await this.levelRepository.getLevelsImages()
    super.notifyViewAboutChanges()

    this.channelId =
      new URLSearchParams(window.location.search).get('id') || undefined
    if (!this.channelId) {
      return
    }
  }

  public detachView = (baseView: BaseView): void => {
    super.detachView(baseView)
    this.clearData()
  }

  public getChannelInfo = async (channelName?: string): Promise<void> => {
    this.setLoading(true)
    this.channelName = channelName
    if (this.channelName) {
      try {
        this.channelData =
          await this.channelRepository.getChannelInfoByChannelName(
            this.channelName
          )
        super.notifyViewAboutChanges()
      } catch (e) {
        alert(e)
      }
    }
    try {
      this.channelLevels = await fetch(
        `${APPLICATION_SERVER}/api/v1/levels/channel/link/${channelName}?currentPage=${1}&perPage=${LEVELS_COUNT_OF_UPLOADING}`
      ).then((res) => res.json())
      super.notifyViewAboutChanges()
    } catch (e) {
      console.log(e.message)
    }

    this.setLoading(false)
  }

  public onCreateLevel = async (
    createLevelData: CreateLevel
  ): Promise<void> => {
    this.setLoading(true)
    if (createLevelData && createLevelData.channel_id) {
      try {
        await this.levelRepository.createLevel({
          ...createLevelData,
        })
      } catch (e) {
        alert(e.message)
      }
    }
    this.setLoading(false)
  }

  public onDeleteLevel = async (channelId: string): Promise<void> => {
    this.setLoading(true)
    try {
      await this.levelRepository.deleteLevel(channelId)
    } catch (e) {
      alert(e)
    }
    this.setLoading(false)
  }

  private clearData = (): void => {
    this.channelLevels = []
    this.channelId = ''
    this.channelData = undefined
  }

  private setLoading = (isLoading: boolean): void => {
    this.isLoading = isLoading
    super.notifyViewAboutChanges()
  }
}
