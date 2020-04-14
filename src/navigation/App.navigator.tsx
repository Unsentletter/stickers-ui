import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from './AppRoutes';

import HomeScreen from '../screens/HomeScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

export const AppNavigator = (): React.ReactElement => (
  <Stack.Navigator>
    <Stack.Screen name={AppRoute.HOME} component={SignupScreen} />
  </Stack.Navigator>
);
