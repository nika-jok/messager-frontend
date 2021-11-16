import Level from "../../../domain/models/channel/Level";
import LevelsList from "../../../domain/models/channel/LevelsList";
import CreateLevel from "../../../domain/models/level/CreateLevel";
import ChannelListLevels from "./ChannelListLevels";
import CreatedLevel from "./CreatedLevel";
import LevelIcons from "../../../domain/models/level/LevelIcons";

export default interface LevelApiRepository {
  createLevel(levelData: CreateLevel): Promise<CreatedLevel>;

  deleteLevel(levelId: string): Promise<string>;

  getChannelLevels(channelId: string): Promise<ChannelListLevels[]>;

  getLevelById(levelId: string): Promise<Level>;

  editLevel(editData: any): Promise<string>;

  getChannelLevelsByChannelName(channelName: string): Promise<LevelsList[]>;

  getLevelsImages(): Promise<LevelIcons[]>;
}
