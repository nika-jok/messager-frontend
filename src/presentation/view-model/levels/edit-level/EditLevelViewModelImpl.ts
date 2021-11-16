import EditLevel from '../../../../data/models/level/EditLevel'
import LevelApiRepository from '../../../../data/models/level/LevelApiRepository'
import LevelIcons from '../../../../domain/models/level/LevelIcons'
import BrowserHistoryHelper from '../../../../utils/BrowserHistoryRouter'
import BaseView from '../../../view/BaseView'
import ViewModel from '../../ViewModel'
import EditLevelViewModel from './EditLevelViewModel'

export default class EditLevelViewModelImpl
  extends ViewModel
  implements EditLevelViewModel
{
  public levelData?: EditLevel
  public levelId?: string
  public levelIcons?: LevelIcons[]
  public channelName: string
  public isLoading: boolean
  private readonly levelRepository: LevelApiRepository

  constructor(levelRepository: LevelApiRepository) {
    super()
    this.levelRepository = levelRepository

    this.levelId = ''
    this.levelData = undefined
    this.channelName = ''
    this.isLoading = false
    this.levelIcons = undefined
  }

  public attachView = async (baseView: BaseView): Promise<void> => {
    super.attachView(baseView)

    this.levelIcons = await this.levelRepository.getLevelsImages()
    super.notifyViewAboutChanges()

    this.levelId =
      new URLSearchParams(window.location.search).get('id') || undefined
    if (!this.levelId) {
      return
    }

    this.getLevelData()
  }

  public updateLevelId = (id: string): void => {
    this.levelId = id
    this.getLevelData()
    super.notifyViewAboutChanges()
  }

  public detachView = (baseView: BaseView): void => {
    super.detachView(baseView)
    this.clearData()
  }

  public transmitChannelName = (channelName: string): void => {
    this.channelName = channelName
  }

  public onUpdateLevel = async (updateData: any): Promise<void> => {
    this.setLoading(true)
    try {
      await this.levelRepository.editLevel(updateData)
     
      this.getLevelData()
    } catch (e) {
      alert(e)
    }

    this.setLoading(false)
  }

  private getLevelData = async (): Promise<void> => {
    this.setLoading(true)
    if (this.levelId) {
      try {
        //@ts-ignore
        const result: EditLevel[] = await this.levelRepository.getLevelById(
          this.levelId
        )
        console.log(result)
        this.levelData = result[0]
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
    this.levelId = ''
    this.levelData = undefined
  }
}
