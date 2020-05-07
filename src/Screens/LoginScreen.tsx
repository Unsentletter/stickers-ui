import React, { useState } from 'react';
import { View, AsyncStorage } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addUser } from '../actions/UserActions';
import { AppRoute } from '../navigation/AppRoutes';

export const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      saveUserDataLocally(data);
    },
  });

  const showButton = () => {
    if (email && password.length > 5) {
      return false;
    }
    return true;
  };

  const signinUser = async () => {
    await loginUser({ variables: { name, email, password } });
  };

  const saveUserDataLocally = async ({ signin }) => {
    signin.user.isSignedIn = true;
    props.addUser(signin.user);
    await AsyncStorage.setItem('sessionToken', signin.token);
    props.navigation.navigate(AppRoute.HOME);
  };

  return (
    <View>
      <TextInput
        label='email'
        onChangeText={(nextValue) => setEmail(nextValue)}
        value={email}
        testID='emailInput'
      />
      <TextInput
        label='Password'
        secureTextEntry={secureTextEntry}
        onChangeText={(nextValue) => setPassword(nextValue)}
        value={password}
        testID='passwordInput'
      />
      <Button
        mode='contained'
        onPress={signinUser}
        disabled={showButton()}
        testID='submitButton'
      >
        Submit
      </Button>
    </View>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addUser,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(LoginScreen);

export const LOGIN_USER = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        id
        name
        email
        ischild
      }
      token
    }
  }
`;
