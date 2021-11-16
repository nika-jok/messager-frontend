import User from "../../../domain/models/auth/User";
import UpdateUser from "../../../domain/models/user/UpdateUser";
import BaseViewModel from "../BaseViewModel";

export default interface EdiAccountViewModel extends BaseViewModel {
  userData?: User;

  onUpdateUser(changedUserData: UpdateUser): Promise<void>;

  onUpdateUserAvatar(avatar: File): Promise<void>;
}
