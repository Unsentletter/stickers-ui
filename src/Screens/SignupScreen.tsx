import React, { useState } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  AsyncStorage,
  Text,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';

import { addUser } from '../actions/UserActions';
import { AppRoute } from '../navigation/AppRoutes';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const SignupScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [addUser, { data, loading, error }] = useMutation(ADD_USER, {
    onCompleted(data) {
      saveUserDataLocally(data);
    },
  });

  // const renderIcon = (props) => (
  //   <TouchableWithoutFeedback
  //     onPress={() => setSecureTextEntry(!secureTextEntry)}
  //   >
  //     <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
  //   </TouchableWithoutFeedback>
  // );

  const showButton = () => {
    if (name && email && password.length > 5) {
      return false;
    }
    return true;
  };

  const signupUser = async () => {
    await addUser({ variables: { name, email, password } });
  };

  const saveUserDataLocally = async ({ signup }) => {
    signup.user.isSignedIn = true;
    props.addUser(signup.user);
    await AsyncStorage.setItem('sessionToken', signup.token);
    props.navigation.navigate(AppRoute.HOME);
  };

  return (
    <View>
      <TextInput
        label='Name'
        onChangeText={(nextValue) => setName(nextValue)}
        value={name}
        testID='nameInput'
      />
      <TextInput
        label='Email'
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
        onPress={signupUser}
        disabled={showButton()}
        testID='submitButton'
      >
        Submit
      </Button>
      <TouchableOpacity
        onPress={() => props.navigation.navigate(AppRoute.SIGN_IN)}
      >
        <Text>Sign in</Text>
      </TouchableOpacity>
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

export default connect(null, mapDispatchToProps)(SignupScreen);

export const ADD_USER = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
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
