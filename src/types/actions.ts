import { IUser } from './User';

export const CREATE_USER = 'CREATE_USER';

export const ADD_CHILD_TO_USER = 'ADD_CHILD_TO_USER';

export interface ICreateUserAction {
  type: typeof CREATE_USER;
  user: IUser;
}

// TODO - the child might actually need to be user
export interface IAddChildToUser {
  type: typeof ADD_CHILD_TO_USER;
  child: IUser;
}

export type UserActionTypes = ICreateUserAction | IAddChildToUser;

// TODO - Need to add all the actions to this. Probs create another file for it
export type AppActions = UserActionTypes;
