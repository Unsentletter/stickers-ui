import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/UserReducer';

export const rootReducer = combineReducers({ userReducer });

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
