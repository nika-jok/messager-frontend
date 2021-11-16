export default interface ChannelListLevels {
  channel_id: number;
  createdAt: string;
  deletedAt: string | null;
  description: string;
  id: number;
  name: string;
  price_per_month: number;
  updatedAt: string | null;
  user_id: string | null;
  files?: string[];
  level_image_id: number;
  level_image_link: string;
}
