import { v4 as uuidv4 } from 'uuid'

import BaseView from '../../../view/BaseView'
import ChooseLevelViewModel from './ChooseLevelViewModel'
import ViewModel from '../../ViewModel'
import LevelApiRepository from '../../../../data/models/level/LevelApiRepository'
import BrowserHistoryHelper from '../../../../utils/BrowserHistoryRouter'
import LevelsList from '../../../../domain/models/channel/LevelsList'
import PaymentApiRepository from '../../../../data/models/payment/PaymentApiRepository'
import MerchentSignatureResponse from '../../../../data/models/payment/MerchentSignatureResponse'
import { APPLICATION_SERVER } from '../../../../constants'
import SubscriptionApiRepository from '../../../../data/models/subscription/SubscriptionApiRepository'
import DateUtils from '../../../../utils/DateUtils'
import ChannelInfo from '../../../../domain/models/channel/ChannelInfo'
import ChannelApiRepository from '../../../../data/models/membership/ChannelApiRepository'
import SubsribedTo from '../../../../domain/models/channel/SubscribedTo'
import { MERCHANT_ID } from '../../../../constants'
import StorageHelper from '../../../../utils/StorageHelper'

export default class ChooseLevelViewModelImpl
  extends ViewModel
  implements ChooseLevelViewModel
{
  public levelsList?: LevelsList[]
  public merchantSignature?: MerchentSignatureResponse
  public isLoading: boolean
  public channelData?: ChannelInfo
  public channelName: string
  public channelAdminId?: number
  public channelId?: number
  public chosedLevels: number[] | []
  public isChangedLevels: boolean
  public subcribedTo: SubsribedTo[]

  private readonly levelRepository: LevelApiRepository
  private readonly paymentRepository: PaymentApiRepository
  private readonly subscriptionRepository: SubscriptionApiRepository
  private readonly channelRepository: ChannelApiRepository

  constructor(
    levelRepository: LevelApiRepository,
    paymentRepository: PaymentApiRepository,
    subscriptionRepository: SubscriptionApiRepository,
    channelRepository: ChannelApiRepository
  ) {
    super()
    this.levelRepository = levelRepository
    this.paymentRepository = paymentRepository
    this.subscriptionRepository = subscriptionRepository
    this.channelRepository = channelRepository

    this.levelsList = []
    this.merchantSignature = undefined
    this.isLoading = false
    this.channelName = ''
    this.channelAdminId = undefined
    this.channelId = undefined
    this.chosedLevels = []
    this.subcribedTo = []
    this.isChangedLevels = false
    this.channelData = undefined
    this.subscribedLevels = []
  }

  public attachView = async (baseView: BaseView): Promise<void> => {
    super.attachView(baseView)
  }

  public detachView = (baseView: BaseView): void => {
    super.detachView(baseView)
    this.clearData()
  }

  public getFondyPaymentPage = async (
    price: string,
    name: string,
    monthsCount: string,
    admin_id: string,
    channelId: string,
    levelId: string,
    channelName: string,
    subscribeDate: string
  ): Promise<any> => {
    const unique = uuidv4()
    const subscribed_to = DateUtils.convertDate(
      DateUtils.addMonths(
        new Date(subscribeDate),
        Number(monthsCount)
      ).toString()
    )

    const result = await this.paymentRepository.getFondyPaymentPage({
      response_url: `${APPLICATION_SERVER}/${channelName}`,
      order_id: unique,
      order_desc: name,
      currency: 'USD',
      amount: price.toString(),
      merchant_id: MERCHANT_ID,
      channel_id: channelId,
      level_id: levelId,
      subscribed_to,
      admin_id,
    })

    if (result?.checkout_url) window.location.href = result?.checkout_url
  }

  public removeLevelFromChosed = async (levelId: number): Promise<void> => {
    this.isChangedLevels = true
    if (this.chosedLevels?.length > 1) {
      const removedLevel = this.chosedLevels.filter(
        (level: number) => level === levelId
      )
      await this.levelRepository.changeSelectedLevels(this.channelId, {
        level: removedLevel[0],
        selected: false,
      })
      this.chosedLevels = this.chosedLevels.filter(
        (level: number) => level !== levelId
      )
    }

    super.notifyViewAboutChanges()
  }

  public addLevelToChosed = async (levelId: never): Promise<void> => {
    if (!this.chosedLevels?.includes(levelId)) {
      const changedLevels = [...this.chosedLevels, levelId]
      this.chosedLevels = changedLevels
      await this.levelRepository.changeSelectedLevels(this.channelId, {
        level: levelId,
        selected: true,
      })
      this.chosedLevels = [...this.chosedLevels, levelId]
      super.notifyViewAboutChanges()
    }
  }

  public getChannelLevelsByChannelName = async (
    channelName: string
  ): Promise<void> => {
    this.setLoading(true)

    try {
      const result = await this.levelRepository.getChannelLevelsByChannelName(
        channelName
      )
      this.channelData =
        await this.channelRepository.getChannelInfoByChannelName(channelName)

      this.channelAdminId = this.channelData?.channelAdmins?.user_id

      this.levelsList = result?.data
      console.log(this.channelData)
      const user = this.channelData.users?.find(
        (user) => user.user_id === StorageHelper.getUserData().user_id
      )
      console.log(user)
      this.subscribedLevels = user?.user_meta
      this.channelId = result?.data[0].channel_id
      super.notifyViewAboutChanges()

      if (result) {
        const savedLevels = await this.levelRepository.getSelectedLevels(
          this.channelId
        )

        if (savedLevels?.length) {
          this.chosedLevels = savedLevels
            .filter((level) => level.selected === true)
            .map((saved) => saved.level_id) as Array
          super.notifyViewAboutChanges()
        } else {
          const levels = [...result?.data.map((level: LevelsList) => level.id)]
          levels.forEach((chosedLevel) => {
            return this.addLevelToChosed(chosedLevel)
          })
        }
      }
    } catch (e) {
      alert(e)
    }
    this.setLoading(false)
  }

  public onUpdateLevel = async (updateData: any): Promise<void> => {
    this.setLoading(true)
    try {
      const result = await this.levelRepository.editLevel(updateData)

      if (result) {
        return BrowserHistoryHelper.moveTo('/')
      }
    } catch (e) {
      alert(e)
    }
    this.setLoading(false)
  }

  private clearData = (): void => {
    this.levelsList = undefined
  }

  private setLoading = (isLoading: boolean): void => {
    this.isLoading = isLoading
    super.notifyViewAboutChanges()
  }
}
