import Channel from '../../../domain/models/channel/Channel'
import ChannelInfo from '../../../domain/models/channel/ChannelInfo'
import ChannelsList from '../../../domain/models/channel/ChannelsList'
import CreateChannel from '../../../domain/models/channel/CreateChannel'
import AdminMessage from '../channel/AdminMessage'
import ChannelUsersCount from '../../models/channel/ChannelUsersCount'

export default interface ChannelApiRepository {
  createNewChannel(channelData: any): Promise<Channel>

  updateChannel(
    updateChannel: CreateChannel,
    channelId: string
  ): Promise<string>

  deleteChannel(channelId: string): Promise<string>

  getChannelInfoByChannelName(channelName: string): Promise<ChannelInfo>

  getAdminMessages(
    channelId: string,
    levelId: string,
    currentPage: number,
  ): Promise<AdminMessage[]>

  addAdminMessage(
    channelId: string,
    levelId: string,
    message: string,
    attachment?: File,
    type?: string
  ): Promise<AdminMessage[]>

  deleteAdminMessage(messageId: string): Promise<string>

  addChannelImage(
    channelId: number,
    levelId: number,
    image?: File,
    use?: string
  ): Promise<any>

  changeChannelImage(image: File, filename: string, use: string): Promise<any>

  addLevelImage(
    channelId: number,
    levelId: number,
    image: File,
    use: string
  ): Promise<any>

  getUserChannels(): Promise<ChannelsList[]>

  uploadChannelImage(image: File): Promise<any>

  getChannelsByName(channelName: string): Promise<any>

  getChannelUsersCount(channelName: string): Promise<ChannelUsersCount>
}
