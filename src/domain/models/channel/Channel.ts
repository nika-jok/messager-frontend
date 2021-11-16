export default interface Channel {
  id: number;
  uuid: string;
  name: string;
  description: string;
  link: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}
