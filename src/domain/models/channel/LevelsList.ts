export default interface LevelList {
  id: number;
  channel_id: number;
  name: string;
  description: string;
  price_per_month: number;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  user_id: string | null;
  files?: string[];
  level_image_link: string;
}
