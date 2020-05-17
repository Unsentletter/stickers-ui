import { IUser } from '../types/User';
import { AppActions } from '../types/actions';

export const createUser = (user: IUser): AppActions => {
  return {
    type: 'CREATE_USER',
    user,
  };
};

export const addChildToUser = (child: IUser): AppActions => {
  return {
    type: 'ADD_CHILD_TO_USER',
    child,
  };
};
