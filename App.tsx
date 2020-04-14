import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import userReducer from './src/reducers/UserReducer';
import { MainNavigator } from './src/navigation/Main.navigator';
import { AppRoute } from './src/navigation/AppRoutes';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

const store = createStore(userReducer);

export default function App() {
  // const [isSignedIn, setIsSignedIn] = useState(false);
  // useEffect(() => {
  //   checkSignedIn();
  // });

  // const checkSignedIn = async () => {
  //   const token = await AsyncStorage.getItem('sessionToken');
  //   console.log('token', token);
  //   if (!token) {
  //     return setIsSignedIn(false);
  //   }
  //   return setIsSignedIn(true);
  // };

  // console.log(isSignedIn);

  const isAuthorised = false;

  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <NavigationContainer>
            <MainNavigator
              initialRouteName={isAuthorised ? AppRoute.HOME : AppRoute.AUTH}
            />
          </NavigationContainer>
        </Provider>
      </ApplicationProvider>
    </ApolloProvider>
  );
}

// client
//   .query({
//     query: gql`
//       {
//         findAllUsers {
//           email
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));
