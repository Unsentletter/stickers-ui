import React, { useState } from 'react';
import { View, AsyncStorage } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';

import { createUser } from '../actions/UserActions';
import AppRoute from '../navigation/AppRoutes';
import { IUser } from '../types/User';

export const LoginScreen = ({ navigation }: ILoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [loginUser] = useMutation(LOGIN_USER, {
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

  const saveUserDataLocally = async ({ signin }: ILoginReturnObjectType) => {
    const { user } = signin;
    user.isSignedIn = true;
    createUser(signin.user);
    await AsyncStorage.setItem('sessionToken', signin.token);
    navigation.navigate(AppRoute.HOME);
  };

  return (
    <View>
      <TextInput
        label='email'
        onChangeText={(value: string) => {
          return setEmail(value);
        }}
        value={email}
        testID='emailInput'
      />
      <TextInput
        label='Password'
        secureTextEntry={secureTextEntry}
        onChangeText={(value: string) => {
          return setPassword(value);
        }}
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

const actionCreators = {
  createUser,
};

export default connect(null, actionCreators)(LoginScreen);

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

interface ILoginScreenProps {
  navigation: any;
}

interface ILoginReturnObjectType {
  signin: {
    user: IUser;
    token: string;
  };
}
