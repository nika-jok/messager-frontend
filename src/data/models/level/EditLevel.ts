export default interface EditLevel {
  channel_id: number;
  createdAt: string;
  deletedAt: string | null;
  description: string;
  id: number | null;
  name: string;
  price_per_month: number | null;
  updatedAt: string | null;
  user_id: number | null;
  files?: string[];
  level_image_link: string;
  level_image_id: number;
}
