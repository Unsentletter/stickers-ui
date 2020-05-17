export interface IUser {
  id: number;
  name: string;
  email?: string;
  isChild: Boolean;
  isSignedIn?: Boolean;
  children: IUser[];
}
