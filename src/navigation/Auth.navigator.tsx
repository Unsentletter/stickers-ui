import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from './AppRoutes';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AppRoute.SIGN_UP} component={SignupScreen} />
      <Stack.Screen name={AppRoute.SIGN_IN} component={LoginScreen} />
    </Stack.Navigator>
  );
};
