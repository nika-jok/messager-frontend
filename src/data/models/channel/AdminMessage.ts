export default interface AdminMessage {
  id: number;
  channel_id: string;
  name: string;
  level_id: string;
  message: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  attachment: string | null;
  isRead: boolean;
  senderId: number;
  text?: string;
  type?: string;
}
