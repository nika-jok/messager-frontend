export default interface CreateLevel {
  name: string;
  description: string;
  price_per_month: number;
  level_image_id: number;
  channel_id?: number;
  level_image_link: string;
}
