import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import userReducer from './src/reducers/UserReducer';
import { MainNavigator } from './src/navigation/Main.navigator';
import { AppRoute } from './src/navigation/AppRoutes';
import { AsyncStorage } from 'react-native';

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

const store = createStore(userReducer);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <NavigationContainer>
            <MainNavigator initialRouteName={AppRoute.AUTH_LOADING} />
          </NavigationContainer>
        </Provider>
      </ApplicationProvider>
    </ApolloProvider>
  );
}
