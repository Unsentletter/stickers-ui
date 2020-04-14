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
      };
      return user;
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
});
