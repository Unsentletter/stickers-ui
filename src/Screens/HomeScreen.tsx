import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';

import { IUser } from '../types/User';
import { AppRoute } from '../navigation/AppRoutes';

const HomeScreen = ({ navigation, user }: HomeScreenProps) => {
  console.log('USER', user);
  return (
    <View>
      <Text>HOME SCREEN</Text>
      <Text>USER: {user.name}</Text>
      <Button onPress={() => navigation.navigate(AppRoute.ADD_CHILD)}>
        Add a child
      </Button>
      <Button
        mode='contained'
        onPress={() => {
          AsyncStorage.removeItem('sessionToken');
          navigation.navigate(AppRoute.AUTH_LOADING);
        }}
      >
        Log out
      </Button>
    </View>
  );
};

const mapStateToProps = (state) => {
  const user = state.user;
  return { user };
};

type HomeScreenProps = {
  user: IUser;
};

export default connect(mapStateToProps)(HomeScreen);
