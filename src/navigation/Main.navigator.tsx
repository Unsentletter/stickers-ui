import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './Auth.navigator';
import { AppRoute } from './AppRoutes';

const Stack = createStackNavigator();

export const MainNavigator = (props): React.ReactElement => (
  <Stack.Navigator {...props}>
    <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator} />
    <Stack.Screen name={AppRoute.HOME} component={AuthNavigator} />
  </Stack.Navigator>
);
