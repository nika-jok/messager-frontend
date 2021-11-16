import SubscriptionApiRepository from "../../models/subscription/SubscriptionApiRepository";
import RequestOptions from "../../../utils/api/RequestOptions";
import ApiHelper from "../../../utils/api/ApiHelper";
import { APPLICATION_SERVER } from "../../../constants";
import SubscribeOnLevel from "../../../domain/models/subscription/SubscribeOnLevel";
import ChannelSubcriptions from "./ChannelSubcriptions";

export default class SubscriptionApiRepositoryImpl
  implements SubscriptionApiRepository {
  public subscribeOnLevel = (
    subscriptionData: SubscribeOnLevel
  ): Promise<ChannelSubcriptions> => {
    const requestOptions: RequestOptions = new RequestOptions();

    requestOptions.setBody(
      JSON.stringify({
        ...subscriptionData,
      })
    );

    return ApiHelper.fetchPostJson(
      `${APPLICATION_SERVER}/api/v1/subscription`,
      requestOptions
    );
  };
}
