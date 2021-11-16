import User from "./User";

export default interface UserData {
  message: string;
  data: { bio: User };
}
