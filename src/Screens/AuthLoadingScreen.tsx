import React, { useEffect } from 'react';
import { AsyncStorage, View, ActivityIndicator, StatusBar } from 'react-native';
import { AppRoute } from '../navigation/AppRoutes';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser } from '../actions/UserActions';

const AuthLoadingScreen = ({ navigation, addUser }) => {
  const { data, loading, error } = useQuery(GET_USER);

  useEffect(() => {
    bootstrapAsync;
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
  const bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('sessionToken');
    if (!userToken) {
      return navigation.navigate(AppRoute.AUTH);
    }
    if (data) {
      addUser(data.getUser);
    } else {
      // TODO - add error message here that doesnt throw an error
      console.log('NO DATA');
    }
    return navigation.navigate(AppRoute.HOME);
  };
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle='default' />
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addUser }, dispatch);
};
export default connect(null, mapDispatchToProps)(AuthLoadingScreen);

const GET_USER = gql`
  {
    getUser {
      id
      email
      name
      ischild
      created_at
    }
  }
`;
