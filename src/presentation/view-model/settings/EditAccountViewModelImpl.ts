import AuthRepository from "../../../data/models/auth/AuthApiRepository";
import BaseView from "../../view/BaseView";
import ViewModel from "../ViewModel";
import EditAccountViewModel from "./EditAccountViewModel";
import User from "../../../domain/models/auth/User";
import BrowserHistoryHelper from "../../../utils/BrowserHistoryRouter";
import UpdateUser from "../../../domain/models/user/UpdateUser";

export default class EditAccountViewModelImpl
  extends ViewModel
  implements EditAccountViewModel {
  public isLoading: boolean;
  public userData?: User;
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    super();
    this.authRepository = authRepository;

    this.isLoading = false;
    this.userData = undefined;
  }

  public attachView = async (baseView: BaseView): Promise<void> => {
    super.attachView(baseView);
    this.getUserData()
  };

  public getUserData =async():Promise<void> => {
    this.userData = (await this.authRepository.getUserInfo()).data.bio;
    super.notifyViewAboutChanges()
  } 

  public detachView = (baseView: BaseView): void => {
    super.detachView(baseView);
    this.clearData();
  };

  public onUpdateUser = async (changedUserData: UpdateUser): Promise<void> => {
    try {
      this.setLoading(true);
      await this.authRepository.updateUser({
        ...changedUserData,
      });
      this.setLoading(false);
    } catch (e) {
      alert(e);
    }
  };

  public onUpdateUserAvatar = async (avatar: File): Promise<void> => {
    try {
      this.setLoading(true);
      await this.authRepository.updateUserAvatar(avatar);
      this.setLoading(false);
    } catch (e) {
      alert(e);
    }
  };

  private clearData = (): void => {
    this.isLoading = false;
    this.userData = undefined;
  };

  private setLoading = (isLoading: boolean): void => {
    this.isLoading = isLoading;
    super.notifyViewAboutChanges();
  };
}
