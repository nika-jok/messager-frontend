import ChannelsList from '../../../domain/models/channel/ChannelsList'
import Level from '../../../domain/models/channel/Level'
import BaseViewModel from '../BaseViewModel'

export default interface ChannelsViewModel extends BaseViewModel {
  uploadedChannelImage?: string

  createNewChannel(uploadedChannelImage?: string, level?: Level): Promise<void>

  transmitChannelData(channelData: any): void

  onGetUserChannels(): Promise<ChannelsList[] | undefined>

  getChannelsByName(channelName: string): Promise<any>

  uploadChannelImage(image: File): void
}
