import { IUser } from '../types/User';
import { UserActionTypes } from '../types/actions';

const userReducerDefaultState: IUser[] = [];

const userReducer = (
  state = userReducerDefaultState,
  action: UserActionTypes,
): IUser[] => {
  switch (action.type) {
    case 'CREATE_USER':
      const { user } = action;
      const newUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        isChild: user.ischild,
        children: user.children,
      };
      return [newUser];

    case 'ADD_CHILD_TO_USER':
      const parent = { ...state.user };
      const child = {
        id: action.id,
        name: action.name,
        isChild: action.ischild,
      };
      if (parent.children) {
        parent.child = [...parent.child, child];
      } else {
        parent.child = [child];
      }
      return [...state, parent];
    default:
      return state;
  }
};

export default userReducer;
