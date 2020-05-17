import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './Auth.navigator';
import { AppNavigator } from './App.navigator';
import { AppRoute } from './AppRoutes';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const Stack = createStackNavigator();

export const MainNavigator = (props: string): React.ReactElement => {
  return (
    <Stack.Navigator {...props} headerMode='none'>
      <Stack.Screen name={AppRoute.AUTH_LOADING} component={AuthLoadingScreen} />
      <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator} />
      <Stack.Screen name={AppRoute.HOME} component={AppNavigator} />
    </Stack.Navigator>
  );
};
