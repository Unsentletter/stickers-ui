import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { AsyncStorage } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

const Stack = createStackNavigator();

export default function App() {
  const isSignedIn = () => {
    return AsyncStorage.getItem('sessionToken').then((token) => {
      if (!token) {
        return false;
      }
      return true;
    });
  };

  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            {!isSignedIn() ? (
              <>
                <Stack.Screen name='Signup' component={SignupScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name='Home' component={HomeScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </ApolloProvider>
  );
}

client
  .query({
    query: gql`
      {
        findAllUsers {
          email
        }
      }
    `,
  })
  .then((result) => console.log(result));
