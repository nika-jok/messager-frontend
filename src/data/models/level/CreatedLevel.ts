
export default interface CreatedLevel {
  id: number;
  channel_id: number;
  name: string;
  description: string;
  price_per_month: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  user_id: string | number | null;
}
