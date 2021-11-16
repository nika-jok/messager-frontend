import { APPLICATION_SERVER } from "../../../constants";
import Channel from "../../../domain/models/channel/Channel";
import CreateChannel from "../../../domain/models/channel/CreateChannel";
import UpdateChannel from "../../../domain/models/channel/CreateChannel";
import ApiHelper from "../../../utils/api/ApiHelper";
import RequestOptions from "../../../utils/api/RequestOptions";
import ChannelApiRepository from "../../models/membership/ChannelApiRepository";
import AdminMessage from "../../models/channel/AdminMessage";
import ChannelInfo from "../../../domain/models/channel/ChannelInfo";
import StorageHelper from "../../../utils/StorageHelper";
import ChannelsList from "../../../domain/models/channel/ChannelsList";
import ChannelUsersCount from "../../models/channel/ChannelUsersCount";

export default class ChannelApiRepositoryImpl implements ChannelApiRepository {
  public createNewChannel = (channelData: CreateChannel): Promise<Channel> => {
    const requestOptions: RequestOptions = new RequestOptions();

    if (StorageHelper.getUserData()?.token) {
      requestOptions.addHeader(
        "Authorization",
        `Token ${StorageHelper.getUserData()?.token}`
      );
    }

    requestOptions.setBody(
      JSON.stringify({
        ...channelData,
      })
    );

    return ApiHelper.fetchPostJson(
      `${APPLICATION_SERVER}/api/v1/channel`,
      requestOptions
    );
  };

  public getChannelInfoByChannelName = (
    channelName: string
  ): Promise<ChannelInfo> => {
    return ApiHelper.fetchGetJson(
      `${APPLICATION_SERVER}/api/v1/channel/link/${channelName}`
    );
  };

  public getChannelMessages = (
    channelId: string,
    levels: string,
    page: string,
    perPage: string
  ) => {
    const requestOptions: RequestOptions = new RequestOptions();

    if (StorageHelper.getUserData()?.token) {
      requestOptions.addHeader(
        "Authorization",
        `Token ${StorageHelper.getUserData()?.token}`
      );
    }

    return ApiHelper.fetchGetJson(
      `${APPLICATION_SERVER}/api/v1/messages/admin/${channelId}?levels=${levels}&perPage=${perPage}&currentPage=${page}`,
      requestOptions
    );
  };

  public getChannelUsersCount = (
    channelName: string
  ): Promise<ChannelUsersCount> => {
    return ApiHelper.fetchGetJson(
      `${APPLICATION_SERVER}/api/v1/channel/link/subscribed/amount/${channelName}`
    );
  };

  public getUserChannels = (): Promise<ChannelsList[]> => {
    return ApiHelper.fetchGetJson(
      `${APPLICATION_SERVER}/api/v1/subscription/${
        StorageHelper.getUserData()?.user_id
      }`
    );
  };

  public updateChannel = (
    updateChannel: UpdateChannel,
    channelName: string
  ): Promise<string> => {
    const requestOptions: RequestOptions = new RequestOptions();

    requestOptions.setBody(
      JSON.stringify({
        name: updateChannel.name,
        description: updateChannel.description,
        link: updateChannel.channelLink,
      })
    );

    return ApiHelper.fetchPatchRaw(
      `${APPLICATION_SERVER}/api/v1/channel/${channelName}`,
      requestOptions
    );
  };

  public deleteChannel = (channelName: string): Promise<string> => {
    return ApiHelper.fetchDeleteRaw(
      `${APPLICATION_SERVER}/api/v1/channel/${channelName}`
    );
  };

  public getAdminMessages = (
    channelId: string,
    levelId: string,
    currentPage: number
  ): Promise<AdminMessage[]> => {
    return ApiHelper.fetchGetJson(
      `${APPLICATION_SERVER}/api/v1/messages/admin/${channelId}/${levelId}?currentPage=${currentPage}&perPage=10`
    );
  };

  public addAdminMessage = (
    channelId: string,
    levelId: string,
    message: string,
    attachment?: File,
    type?: string
  ): Promise<AdminMessage[]> => {
    const formData = new FormData();
    formData.append("channel_id", channelId);
    formData.append("level_id", levelId);
    formData.append("message", message);
    formData.append("type", type ? "audio" : "text");
    console.log('attachment', attachment);
    console.log('type', type);
    if (attachment) formData.append("file", attachment);
    return fetch(`${APPLICATION_SERVER}/api/v1/messages/admin`, {
      method: "POST",
      body: formData,
    }).then((response: Response): Promise<any> => response.json());
  };

  public uploadChannelImage = (image: File): Promise<any> => {
    const formData = new FormData();
    if (image) formData.append("image", image);

    return fetch(`${APPLICATION_SERVER}/files/upload`, {
      method: "POST",
      body: formData,
    }).then((response: Response): Promise<any> => response.json());
  };

  public addChannelImage = (
    channelId: number,
    levelId: number,
    image: File,
    use: string
  ): Promise<any> => {
    const formData = new FormData();
    formData.append("channel_id", channelId.toString());
    formData.append("level_id", levelId.toString());
    formData.append("use", use);
    if (image) formData.append("image", image);

    return fetch(`${APPLICATION_SERVER}/files/upload`, {
      method: "POST",
      body: formData,
    }).then((response: Response): Promise<any> => response.json());
  };

  public addLevelImage = (
    channelId: number,
    levelId: number,
    image: File,
    use: string
  ): Promise<any> => {
    const formData = new FormData();
    formData.append("channel_id", channelId.toString());
    formData.append("level_id", levelId.toString());
    formData.append("use", use);
    if (image) formData.append("image", image);

    return fetch(`${APPLICATION_SERVER}/files/upload`, {
      method: "POST",
      body: formData,
    }).then((response: Response): Promise<any> => response.json());
  };

  public changeChannelImage = (
    image: File,
    filename: string,
    use: string
  ): Promise<any> => {
    const formData = new FormData();
    formData.append("filename", filename);
    formData.append("use", use);
    if (image) formData.append("image", image);

    return fetch(`${APPLICATION_SERVER}/files/upload`, {
      method: "PATCH",
      body: formData,
    }).then((response: Response): Promise<any> => response.json());
  };

  public deleteAdminMessage = (messageId: string): Promise<string> => {
    return ApiHelper.fetchDeleteRaw(
      `${APPLICATION_SERVER}/api/v1/messages/admin/${messageId}`
    );
  };

  public getChannelsByName = (channelName: string) => {
    return ApiHelper.fetchGetJson(
      `${APPLICATION_SERVER}/api/v1/channel/find/${channelName}`
    );
  };
}
