import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import userReducer from '../reducers/UserReducer';

export const rootReducer = combineReducers({ userReducer });

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
