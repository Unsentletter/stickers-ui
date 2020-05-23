import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './src/store/configureStore';
import MainNavigator from './src/navigation/MainNavigator';
import AppRoute from './src/navigation/AppRoutes';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  request: async (operation) => {
    const token = await AsyncStorage.getItem('sessionToken');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <NavigationContainer>
              <MainNavigator initialRouteName={AppRoute.AUTH_LOADING} />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}
