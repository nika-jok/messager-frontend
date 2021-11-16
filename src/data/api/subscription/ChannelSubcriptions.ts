import Channel from "../../../domain/models/channel/Channel";
import LevelList from "../../../domain/models/channel/LevelsList";

export default interface ChannelSubcriptions {
  channel: Channel;
  level: LevelList;
}
