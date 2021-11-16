export default interface SubscribeOnLevel {
  channel_id: number;
  user_id: number;
  level_id: number;
  subscribed_to: string;
  admin_id: number;
  status: string;
  orderReference: string;
  signature: string;
}
