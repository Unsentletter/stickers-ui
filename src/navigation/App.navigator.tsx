import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from './AppRoutes';

import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export const AppNavigator = (): React.ReactElement => (
  <Stack.Navigator>
    <Stack.Screen name={AppRoute.HOME} component={HomeScreen} />
  </Stack.Navigator>
);
