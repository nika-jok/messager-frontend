import { APPLICATION_SERVER } from '../../../constants'
import Level from '../../../domain/models/channel/Level'
import LevelsList from '../../../domain/models/channel/LevelsList'
import CreateLevel from '../../../domain/models/level/CreateLevel'
import LevelIcons from '../../../domain/models/level/LevelIcons'
import ApiHelper from '../../../utils/api/ApiHelper'
import RequestOptions from '../../../utils/api/RequestOptions'
import ChannelListLevels from '../../models/level/ChannelListLevels'
import CreatedLevel from '../../models/level/CreatedLevel'
import LevelApiRepository from '../../models/level/LevelApiRepository'

export default class LevelApiRepositoryImpl implements LevelApiRepository {
  public createLevel = (levelData: CreateLevel): Promise<CreatedLevel> => {
    const requestOptions: RequestOptions = new RequestOptions()

    requestOptions.setBody(
      JSON.stringify({
        ...levelData,
      })
    )

    return ApiHelper.fetchPostJson(
      `${APPLICATION_SERVER}/api/v1/levels`,
      requestOptions
    )
  }

  public deleteLevel = (levelId: string): Promise<string> => {
    return ApiHelper.fetchDeleteRaw(
      `${APPLICATION_SERVER}/api/v1/levels/${levelId}`
    )
  }

  public getChannelLevels = (
    channelId: string
  ): Promise<ChannelListLevels[]> => {
    return ApiHelper.fetchGetJson(
      `${APPLICATION_SERVER}/api/v1/levels/channel/${channelId}`
    )
  }

  public changeSelectedLevels = (channel_id: string, levels: string[]) => {
    const requestOptions: RequestOptions = new RequestOptions()

    requestOptions.setBody(
      JSON.stringify({
        ...levels,
      })
    )

    return ApiHelper.fetchPutJson(
      `${APPLICATION_SERVER}/api/v1/levels/selected/${channel_id}`,
      requestOptions
    )
  }

  public getSelectedLevels = (channel_id: string) => {
    return ApiHelper.fetchGetJson(
      `${APPLICATION_SERVER}/api/v1/levels/selected/${channel_id}`
    )
  }

  public editLevel = (editData: any): Promise<string> => {
    const requestOptions: RequestOptions = new RequestOptions()

    requestOptions.setBody(
      JSON.stringify({
        ...editData,
      })
    )

    return ApiHelper.fetchPatchRaw(
      `${APPLICATION_SERVER}/api/v1/levels`,
      requestOptions
    )
  }

  public getChannelLevelsByChannelName = (
    channelName: string
  ): Promise<LevelsList[]> => {
    return ApiHelper.fetchGetJson(
      `${APPLICATION_SERVER}/api/v1/levels/channel/link/${channelName}?perPage=10&currentPage=1`
    )
  }

  public getLevelById = (levelId: string): Promise<Level> => {
    console.log(levelId)
    return ApiHelper.fetchGetJson(
      `${APPLICATION_SERVER}/api/v1/levels/${levelId}`
    )
  }

  public getLevelsImages = (): Promise<LevelIcons[]> => {
    return ApiHelper.fetchGetJson(`${APPLICATION_SERVER}/files/icons`)
  }
}
