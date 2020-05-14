import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/UserReducer';

export const rootReducer = combineReducers({ userReducer });

const store = createStore(rootReducer);

export default store;
