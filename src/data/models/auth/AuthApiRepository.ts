import AccountData from "../../../domain/models/auth/AccountData";
import UserData from "../../../domain/models/auth/UserData";
import UpdateUser from "../../../domain/models/user/UpdateUser";
import AuthListener from "../AuthListener";
import AuthorizedUserData from "./AuthorizedUserData";
import SendAuthCodeResponse from "./SendAuthCodeResponse";
import SignUpData from "../../../domain/models/auth/SignUpData";

export default interface AuthRepository {
  signIn(email: string): Promise<SendAuthCodeResponse>;

  confirmCode(code: number, email: string): Promise<AuthorizedUserData>;

  isAuthorized(): boolean;

  signOut(): void;

  addAuthListener(authListener: AuthListener): void;

  removeAuthListener(authListener: any): void;

  createAccount(accountData: AccountData): Promise<string>;

  getUserInfo(): Promise<UserData>;

  updateUser(userData: UpdateUser): Promise<string>;

  updateUserAvatar(avatar: File): Promise<string>;

  signUp(signUpData: SignUpData): Promise<SendAuthCodeResponse>;
}
