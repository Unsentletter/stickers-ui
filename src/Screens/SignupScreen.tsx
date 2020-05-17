import React, { useState } from 'react';
import { View, AsyncStorage, Text } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { createUser } from '../actions/UserActions';
import { AppRoute } from '../navigation/AppRoutes';
import { IUser } from '../types/User';

export const SignupScreen = (props: SignupScreenProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [createUserMutation] = useMutation(CREATE_USER_MUTATION, {
    onCompleted(userData) {
      saveUserDataLocally(userData);
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
    await createUserMutation({ variables: { name, email, password } });
  };

  const saveUserDataLocally = async ({ signup }: signupReturnObjectType) => {
    const { user } = signup;
    user.isSignedIn = true;
    props.createUser(user);
    await AsyncStorage.setItem('sessionToken', signup.token);
    props.navigation.navigate(AppRoute.HOME);
  };

  return (
    <View>
      <TextInput
        label='Name'
        onChangeText={(text: string) => {
          return setName(text);
        }}
        value={name}
        testID='nameInput'
      />
      <TextInput
        label='Email'
        onChangeText={(text: string) => {
          return setEmail(text);
        }}
        value={email}
        testID='emailInput'
      />
      <TextInput
        label='Password'
        // secureTextEntry={secureTextEntry}
        secureTextEntry
        onChangeText={(text: string) => {
          return setPassword(text);
        }}
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
        onPress={() => {
          return props.navigation.navigate(AppRoute.SIGN_IN);
        }}
      >
        <Text>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

// This is my mapStateToProps as an object
const actionCreators = {
  createUser,
};

// TODO - This is just an example for when I need it in the future
// const mapStateToProps = (state: AppState, ownProps: SignupScreenProps) => {
//   // Whatever goes in here
//   console.log(state);
//   console.log(ownProps);
// };

export default connect(null, actionCreators)(SignupScreen);

export const CREATE_USER_MUTATION = gql`
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

interface SignupScreenProps {
  navigation: any;
  createUser: any;
}

interface signupReturnObjectType {
  signup: {
    user: IUser;
    token: string;
  };
}
