import React, { useEffect } from 'react';
import { AsyncStorage, ActivityIndicator, StatusBar } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import { AppRoute } from '../navigation/AppRoutes';
import { createUser } from '../actions/UserActions';

const AuthLoadingScreen: React.FC<AuthLoadingScreenProps> = (props) => {
  const { navigation } = props;
  const { data } = useQuery(GET_USER);

  const bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('sessionToken');

    // Need to make use of these bad boys
    // if (loading) console.log(loading);
    // if (error) console.log('ERROR', error);
    if (!userToken) {
      return navigation.navigate(AppRoute.AUTH);
    }

    if (data) {
      createUser(data.getUser);
    } else {
      // TODO - add error message here that doesnt throw an error
      // Maybe nav to signup
      console.log('NO DATA');
    }
    return navigation.navigate(AppRoute.HOME);
  };

  useEffect(() => {
    bootstrapAsync();
  }, []);

  useEffect(() => {
    const logout = navigation.addListener('focus', () => {
      bootstrapAsync();
    });
    return logout;
  }, [navigation]);

  useEffect(() => {
    bootstrapAsync();
  }, [data]);

  return (
    <>
      <ActivityIndicator />
      <StatusBar barStyle='default' />
    </>
  );
};

const actionCreators = {
  createUser,
};

export default connect(null, actionCreators)(AuthLoadingScreen);

const GET_USER = gql`
  {
    getUser {
      id
      email
      name
      ischild
      created_at
      children
    }
  }
`;

type AuthLoadingScreenProps = {
  navigation: any;
  addUser: any;
};
