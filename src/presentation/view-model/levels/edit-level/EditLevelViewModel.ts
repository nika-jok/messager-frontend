import EditLevel from '../../../../data/models/level/EditLevel'
import LevelIcons from '../../../../domain/models/level/LevelIcons'
import BaseViewModel from '../../BaseViewModel'

export default interface EditLevelViewModel extends BaseViewModel {
  levelData?: EditLevel
  levelId?: string
  isLoading: boolean
  levelIcons?: LevelIcons[]

  onUpdateLevel(updateData: any): Promise<void>

  transmitChannelName(channelName: string): void

  updateLevelId(id: string): void
}
