import { IUser } from '../types/User';

export const addUser = (user: IUser) => ({
  type: 'ADD_USER',
  payload: user,
});

export const addChildToUser = (child) => ({
  type: 'ADD_CHILD_TO_USER',
  payload: child,
});
