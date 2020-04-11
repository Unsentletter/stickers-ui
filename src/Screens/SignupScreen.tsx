import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Button } from 'react-native';
import { Layout, Icon, Input } from '@ui-kitten/components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const SignupScreen = () => {
  //   const { loading, error, data } = useQuery(test);
  const [addUser, { data }] = useMutation(ADD_USER);
  // TODO - I will use this to toggle the password text
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  console.log('TEST', data);

  const renderIcon = (props) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    >
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const email = '123@email.com';
  const name = 'Rdoger';
  const password = '123456';

  return (
    <View>
      <Input label='Name' />
      <Input label='Email' />
      <Input
        label='Password'
        caption='Should be 6 or more characters'
        secureTextEntry={secureTextEntry}
        accessoryRight={renderIcon}
      />
      <Button
        title='Press'
        onPress={() => addUser({ variables: { name, email, password } })}
      />
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
