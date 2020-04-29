export interface IUser {
  id: number;
  name: string;
  email?: string;
  isChild: Boolean;
  isSignIn: Boolean;
  children: IUser[];
}
