import ChannelApiRepository from '../../../data/models/membership/ChannelApiRepository'
import Level from '../../../domain/models/channel/Level'
import ViewModel from '../ViewModel'
import ChannelViewModel from './ChannelsViewModel'
import BrowserHistoryHelper from '../../../utils/BrowserHistoryRouter'
import CreateChannel from '../../../domain/models/channel/CreateChannel'
import ChannelsList from '../../../domain/models/channel/ChannelsList'
import AuthRepository from '../../../data/models/auth/AuthApiRepository'
import StorageHelper from '../../../utils/StorageHelper'

export default class ChannelsViewModelImpl
  extends ViewModel
  implements ChannelViewModel
{
  public channelData?: CreateChannel
  public isLoading: boolean
  public uploadedChannelImage?: string
  private readonly channelRepository: ChannelApiRepository
  private readonly authRepository: AuthRepository

  constructor(
    channelRepository: ChannelApiRepository,
    authRepository: AuthRepository
  ) {
    super()
    this.channelRepository = channelRepository
    this.authRepository = authRepository

    this.channelData = undefined
    this.isLoading = false
    this.uploadedChannelImage = ''
  }

  public transmitChannelData = (channelData: any): void => {
    this.setLoading(true)
    this.channelData = channelData
    this.setLoading(false)
  }

  public onGetUserChannels = async (): Promise<ChannelsList[] | undefined> => {
    await this.channelRepository.getUserChannels()
  }

  public createNewChannel = async (
    uploadedChannelImage?: string,
    level?: Level
  ): Promise<void> => {
    this.setLoading(true)
    if (level && this.channelData) {
      try {
        const result = await this.channelRepository.createNewChannel({
          ...this.channelData,
          admin: {
            admin_id: StorageHelper.getUserData()?.user_id,
          },
          level,
          channel_image_link: uploadedChannelImage,
        })

        if (result && result.link) {
          //@ts-ignore
          if (this.channelData.channelImage) {
            await this.channelRepository.addChannelImage(
              result.id,
              1,
              //@ts-ignore
              this.channelData.channelImage,
              'channel'
            )
          }

          //@ts-ignore
          if (level.level_image && result) {
            await this.channelRepository.addLevelImage(
              //@ts-ignore
              result.id,
              //@ts-ignore
              result.level_id,
              //@ts-ignore
              level.level_image,
              'level'
            )
          }

          BrowserHistoryHelper.moveTo(`/${result.link}`)
        }

        return result?.link
      } catch (e) {
        alert(e.message)
      }
    }
    this.setLoading(false)
  }

  public getChannelsByName = (channelName: string): Promise<any> => {
    return this.channelRepository.getChannelsByName(channelName)
  }

  public uploadChannelImage = async (image: File): Promise<void> => {
    this.uploadedChannelImage = await this.channelRepository.uploadChannelImage(
      image
    )
    super.notifyViewAboutChanges()
  }

  private setLoading = (isLoading: boolean): void => {
    this.isLoading = isLoading
    super.notifyViewAboutChanges()
  }
}
