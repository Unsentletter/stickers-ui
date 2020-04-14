import { IUser } from '../types/User';

export const addUser = (user: IUser) => ({
  type: 'ADD_USER',
  payload: user,
});
