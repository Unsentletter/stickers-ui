import React, { useEffect } from 'react';
import { AsyncStorage, View, ActivityIndicator, StatusBar } from 'react-native';
import { AppRoute } from '../navigation/AppRoutes';

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    bootstrapAsync;
  }, []);
  useEffect(() => {
    const logout = navigation.addListener('focus', () => {
      bootstrapAsync();
    });
    return logout;
  }, [navigation]);
  const bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('sessionToken');
    navigation.navigate(userToken ? AppRoute.HOME : AppRoute.AUTH);
  };
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle='default' />
    </View>
  );
};

export default AuthLoadingScreen;
