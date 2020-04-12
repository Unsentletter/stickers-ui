import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import { Button, Icon, Input } from '@ui-kitten/components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  //   const { loading, error, data } = useQuery(test);
  const [addUser, { data }] = useMutation(ADD_USER);
  // TODO - I will use this to toggle the password text
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
    console.log('TOKEN', data.signup.token);
    await AsyncStorage.setItem('sessionToken', data.signup.token);
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
      <Button onPress={signupUser} disabled={showButton()}>
        Submit
      </Button>
    </View>
  );
};

export default SignupScreen;

const ADD_USER = gql`
  mutation SignupUser($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      user {
        id
        name
        email
        password
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
