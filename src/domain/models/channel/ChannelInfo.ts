import User from "../auth/User";
import Channel from "../channel/Channel";

export default interface ChannelInfo {
  channel: Channel[];
  channelAdmins: User;
  users: User[];
}
