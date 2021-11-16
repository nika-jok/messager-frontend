import SubscribeOnLevel from "../../../domain/models/subscription/SubscribeOnLevel";
import ChannelSubcriptions from "../../api/subscription/ChannelSubcriptions";

export default interface SubscriptionApiRepository {
  subscribeOnLevel(
    subscriptionData: SubscribeOnLevel
  ): Promise<ChannelSubcriptions>;
}
