import ChannelListLevels from "../../../data/models/level/ChannelListLevels";

import ChannelInfo from "../../../domain/models/channel/ChannelInfo";
import CreateLevel from "../../../domain/models/level/CreateLevel";
import LevelIcons from "../../../domain/models/level/LevelIcons";
import BaseViewModel from "../BaseViewModel";

export default interface LevelsViewModel extends BaseViewModel {
  channelData?: ChannelInfo;
  channelId?: string;
  channelLevels: ChannelListLevels[];
  isLoading: boolean;
  levelIcons?: LevelIcons[];

  onCreateLevel(createLevelData: CreateLevel): Promise<void>;

  onDeleteLevel(channelId: string): Promise<void>;

  getChannelInfo(channelName: string): Promise<void>;
}
