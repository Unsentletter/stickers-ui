import { combineReducers } from 'redux';

const INITIAL_STATE = {
  user: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'ADD_USER':
      const user = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        isChild: payload.ischild,
        children: payload.children,
      };
      return user;
    case 'ADD_CHILD_TO_USER':
      const parent = { ...state.user };
      const child = {
        id: payload.id,
        name: payload.name,
        isChild: payload.ischild,
      };
      if (parent.children) {
        parent.child = [...parent.child, child];
      } else {
        parent.child = [child];
      }
      console.log('state', state);
      return parent;
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
});
