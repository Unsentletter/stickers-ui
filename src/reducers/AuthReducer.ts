import { combineReducers } from 'redux';

const INITIAL_STATE = {
  isAuthenticated: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'SIGNUP_USER':
      return { isAuthenticated: true };
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
});
