import AdminMessage from '../../../data/models/channel/AdminMessage'
import User from '../../../domain/models/auth/User'
import ChannelInfo from '../../../domain/models/channel/ChannelInfo'
import CreateChannel from '../../../domain/models/channel/CreateChannel'
import LevelsList from '../../../domain/models/channel/LevelsList'
import BaseViewModel from '../BaseViewModel'

export default interface ChannelViewModel extends BaseViewModel {
  channelData?: ChannelInfo
  channelId?: string
  channelName?: string
  isLoading: boolean
  levelsList?: LevelsList[]
  userId?: number
  allChannelMessages: AdminMessage[]
  chosedLevels: number[]
  isShowChosedLevels: boolean
  isLoadingMessages: boolean
  differentDateIds?: number[]
  isUserAdmin: boolean
  firstChosedLevelIcon?: string
  isUserInChannel: boolean
  channelUserCount?: number

  onUpdateChannel(updateChannelData: CreateChannel): Promise<void>

  getChannelLevelsByChannelName(page?: number): Promise<void>

  onDeleteChannel(): Promise<void>

  getChannelInfo(channelName: string): Promise<void>

  createAdminMessage(message?: string, attachment?: File, type?: string): void

  deleteAdminMessage(messageId: string): Promise<void>

  transmitChosedLevels(chosedLevels: number[]): void

  editChannelImage(image: File, filename: string, use: string): Promise<void>

  loadMoreMessages(page?: number): Promise<void>
}
