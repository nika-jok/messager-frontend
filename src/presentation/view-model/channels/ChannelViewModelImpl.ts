import AdminMessage from '../../../data/models/channel/AdminMessage'
import LevelApiRepository from '../../../data/models/level/LevelApiRepository'
import ChannelApiRepository from '../../../data/models/membership/ChannelApiRepository'
import User from '../../../domain/models/auth/User'
import ChannelInfo from '../../../domain/models/channel/ChannelInfo'
import ChannelsList from '../../../domain/models/channel/ChannelsList'
import CreateChannel from '../../../domain/models/channel/CreateChannel'
import LevelsList from '../../../domain/models/channel/LevelsList'
import DateUtils from '../../../utils/DateUtils'
import StorageHelper from '../../../utils/StorageHelper'
import BaseView from '../../view/BaseView'
import ViewModel from '../ViewModel'
import ChannelViewModel from './ChannelViewModel'

class ChannelViewModelImpl extends ViewModel implements ChannelViewModel {
  public channelData?: ChannelInfo
  public channelId?: string
  public levelId?: string
  public channelName: string
  public isLoading: boolean
  public userId?: number
  public levelsList?: LevelsList[]
  public allChannelMessages: AdminMessage[]
  public chosedLevels: number[]
  public isShowChosedLevels: boolean
  public isLoadingMessages: boolean
  public differentDateIds?: number[]
  public isUserAdmin: boolean
  public firstChosedLevelIcon?: string
  public isUserInChannel: boolean
  public channelUserCount?: number
  public channelsList: Array
  private readonly channelRepository: ChannelApiRepository
  private readonly levelRepository: LevelApiRepository

  constructor(
    channelRepository: ChannelApiRepository,
    levelRepository: LevelApiRepository
  ) {
    super()

    this.channelRepository = channelRepository
    this.levelRepository = levelRepository

    this.channelData = undefined
    this.channelId = undefined
    this.levelId = undefined
    this.channelName = ''
    this.isLoading = false
    this.levelsList = undefined
    this.userId = undefined
    this.allChannelMessages = []
    this.differentDateIds = undefined
    this.chosedLevels = []
    this.isShowChosedLevels = false
    this.isLoadingMessages = false
    this.isUserAdmin = false
    this.firstChosedLevelIcon = ''
    this.isUserInChannel = false
    this.channelUserCount = undefined
    this.channelsList = []
  }

  public attachView = async (baseView: BaseView): Promise<void> => {
    super.attachView(baseView)
    const userId = StorageHelper.getUserData()?.user_id
    this.userId = userId ? userId : 0
  }

  public detachView = (baseView: BaseView): void => {
    super.notifyViewAboutChanges()
    this.clearData()
    super.detachView(baseView)
  }

  public getChannelInfo = async (channelName: string): Promise<void> => {
    this.setLoading(true)
    this.channelName = channelName
    this.allChannelMessages = []

    if (channelName) {
      try {
        this.channelData =
          await this.channelRepository.getChannelInfoByChannelName(channelName)
        //levelsList
        this.levelsList = (
          await this.levelRepository.getChannelLevelsByChannelName(channelName)
        ).data
        super.notifyViewAboutChanges()
        this.channelId = this.channelData?.channel[0].id.toString()

        this.isUserAdmin =
          this.channelData?.channelAdmins?.user_id ===
          Number(StorageHelper.getUserData()?.user_id)

        this.isUserInChannel = !!this.channelData?.users.filter(
          (user: User) =>
            user.user_id === Number(StorageHelper.getUserData()?.user_id)
        ).length

        this.onGetChannelUsersCount()
        super.notifyViewAboutChanges()
      } catch (e) {
        alert(e.message)
      }
    }

    this.setLoading(false)
  }

  public onGetChannelUsersCount = async (): Promise<void> => {
    if (this.channelName) {
      this.channelUserCount = (
        await this.channelRepository.getChannelUsersCount(this.channelName)
      ).amount
      super.notifyViewAboutChanges()
    }
  }

  public editChannelImage = async (
    image: File,
    filename: string,
    use: string
  ): Promise<void> => {
    if (image && filename && use) {
      await this.channelRepository.changeChannelImage(image, filename, use)
    }
  }

  public transmitChosedLevels = (chosedLevels: number[]): void => {
    this.isShowChosedLevels = true
    this.chosedLevels = chosedLevels
    this.firstChosedLevelIcon = this.levelsList?.filter(
      (level: LevelsList) => level.id === chosedLevels[0]
    )[0].level_image_link
  }

  public onUpdateChannel = async (
    updateChannelData: CreateChannel
  ): Promise<void> => {
    this.setLoading(true)
    if (this.channelName && updateChannelData) {
      try {
        await this.channelRepository.updateChannel(
          updateChannelData,
          this.channelName as string
        )
      } catch (e) {
        alert(e)
      }
    }

    this.setLoading(false)
  }

  public onDeleteChannel = async (): Promise<void> => {
    this.setLoading(true)
    if (this.channelName) {
      try {
        await this.channelRepository.deleteChannel(this.channelName)
      } catch (e) {
        alert(e)
      }
    }

    this.setLoading(false)
  }

  public createAdminMessage = async (
    message: string,
    attachment?: File,
    type?: string
  ): Promise<void> => {
    if (this.channelId && (message || attachment)) {
      if (this.chosedLevels && this.chosedLevels.length >= 1) {
        this.chosedLevels.forEach(async (level: number): Promise<void> => {
          try {
            this.setLoading(true)
            const result = await this.channelRepository.addAdminMessage(
              this.channelId as string,
              level.toString(),
              message ? message : '',
              attachment ? attachment : undefined,
              type ? type : undefined
            )

            if (result) this.allChannelMessages.push(result[0])

            this.differentDateIds = DateUtils.getDifferentDates(
              this.allChannelMessages
            )

            super.notifyViewAboutChanges()
            super.scrollToBottom()
          } catch (e) {
            alert(e)
          } finally {
            this.setLoading(false)
          }
        })
      }
    }

    if (this.channelId && (message || attachment) && !this.isShowChosedLevels) {
      if (this.levelsList && this.levelsList.length >= 1) {
        this.levelsList.map(async (level: LevelsList) => {
          try {
            this.setLoading(true)
            const result = await this.channelRepository.addAdminMessage(
              this.channelId as string,
              level.id.toString(),
              message ? message : '',
              attachment ? attachment : undefined,
              type ? type : undefined
            )

            if (result) this.allChannelMessages.push(result[0])

            super.notifyViewAboutChanges()
            super.scrollToBottom()
          } catch (e) {
            alert(e)
          } finally {
            this.setLoading(false)
          }
        })
      }
    }
  }

  public deleteAdminMessage = async (messageId: string): Promise<void> => {
    this.setLoading(true)
    if (messageId) {
      try {
        await this.channelRepository.deleteAdminMessage(messageId)

        this.allChannelMessages = this.allChannelMessages.filter(
          (adminMessage: AdminMessage) => adminMessage.id !== Number(messageId)
        )
        this.differentDateIds = DateUtils.getDifferentDates(
          this.allChannelMessages
        )
        super.notifyViewAboutChanges()
      } catch (e) {
        alert(e)
      }
    }

    this.setLoading(false)
  }

  private setLoading = (isLoading: boolean): void => {
    this.isLoading = isLoading
    super.notifyViewAboutChanges()
  }

  private clearData = (): void => {
    this.channelData = undefined
    this.allChannelMessages = []
    this.channelId = undefined
    this.levelId = undefined
  }
}

export default ChannelViewModelImpl
