export default interface ChannelsList {
  id: number;
  user_id: number;
  channel_id: number;
  level_id: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  attachment?: string;
  email?: string;
  subscribed_to?: string;
  card_number?: string;
  card_name?: string;
  card_validity?: string;
  isAdmin: boolean;
  uuid: string;
  name: string;
  description?: string;
  link: string;
  channel_image_link?: string;
}
