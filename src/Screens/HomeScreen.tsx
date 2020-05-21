import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';

import { IUser } from '../types/User';
import AppRoute from '../navigation/AppRoutes';
import { AppState } from '../store/configureStore';

const HomeScreen = ({ navigation, user }: HomeScreenProps) => {
  return (
    <View>
      <Text>HOME SCREEN</Text>
      <Text>
        USER:
        {user.name}
      </Text>
      <Button
        onPress={() => {
          return navigation.navigate(AppRoute.ADD_CHILD);
        }}
      >
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

const mapStateToProps = (state: AppState) => {
  const { userReducer } = state;
  return { user: userReducer[0] };
};

type HomeScreenProps = {
  user: IUser;
  navigation: any;
};

export default connect(mapStateToProps)(HomeScreen);
