import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppRoute from './AppRoutes';

import HomeScreen from '../screens/HomeScreen';
import AddChildScreen from '../screens/AddChildScreen';

const Stack = createStackNavigator();

const AppNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AppRoute.HOME} component={HomeScreen} />
      <Stack.Screen name={AppRoute.ADD_CHILD} component={AddChildScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
