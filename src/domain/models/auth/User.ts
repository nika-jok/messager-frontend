export default interface User {
  about: string | null;
  avatar: string;
  createdAt: string | null;
  email: string;
  firstName: string | null;
  hash: string | null;
  id: number;
  isOnline: boolean;
  lastName: string | null | undefined;
  lastOnline: string | null;
  phone: string | null;
  updatedAt: string | null;
  username: string | null;
  balance: number | null;
  contact: null | string;
  inBan: boolean;
  isAdmin: boolean | null;
  isBanned: boolean | null;
  subscribedLevels: number[] | null;
  user_id: number;
  level_id?: number;
  subscribed_to?: string;
}
