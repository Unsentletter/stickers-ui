import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import { Button, Icon, Input } from '@ui-kitten/components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addUser } from '../actions/UserActions';
import { AppRoute } from '../navigation/AppRoutes';

const SignupScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addUser, { data }] = useMutation(ADD_USER);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const renderIcon = (props) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    >
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const showButton = () => {
    if (name && email && password.length > 5) {
      return false;
    }
    return true;
  };

  const signupUser = async () => {
    await addUser({ variables: { name, email, password } });
    data.signup.user.isSignedIn = true;
    props.addUser(data.signup.user);
    await AsyncStorage.setItem('sessionToken', data.signup.token);
    props.navigation.navigate(AppRoute.HOME);
  };

  return (
    <View>
      <Input
        label='Name'
        onChangeText={(nextValue) => setName(nextValue)}
        value={name}
      />
      <Input
        label='Email'
        onChangeText={(nextValue) => setEmail(nextValue)}
        value={email}
      />
      <Input
        label='Password'
        caption='Should be 6 or more characters'
        secureTextEntry={secureTextEntry}
        accessoryRight={renderIcon}
        onChangeText={(nextValue) => setPassword(nextValue)}
        value={password}
      />
      {/* <Button onPress={signupUser} disabled={showButton()}> */}
      <Button onPress={signupUser}>Submit</Button>
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

const ADD_USER = gql`
  mutation SignupUser($name: String!, $email: String!, $password: String!) {
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

const test = gql`
  {
    findAllUsers {
      email
    }
  }
`;
