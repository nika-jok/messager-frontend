import ChannelInfo from '../../../../domain/models/channel/ChannelInfo'
import LevelsList from '../../../../domain/models/channel/LevelsList'
import SubsribedTo from '../../../../domain/models/channel/SubscribedTo'
import BaseViewModel from '../../BaseViewModel'

export default interface ChooseLevelViewModel extends BaseViewModel {
  levelsList?: LevelsList[]
  isLoading: boolean
  channelId?: number
  chosedLevels: number[] | []
  channelData?: ChannelInfo
  subcribedTo: SubsribedTo[]

  getChannelLevelsByChannelName(channelName: string): Promise<void>

  removeLevelFromChosed(levelId: number): void

  addLevelToChosed(levelId: number): void

  getFondyPaymentPage(
    price: string,
    name: string,
    monthsCount: string,
    admin_id: string,
    channelId: string,
    levelId: string,
    channelName: string,
    subscribeDate?: string
  ): Promise<any>
}
