import React, { useState, useEffect } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';

import { addChildToUser } from '../actions/UserActions';
import { IUser } from '../types/User';

const AddChildScreen = ({ user, addChildToUser }: AddChildScreenProps) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [createChildAccount, { data }] = useMutation(CREATE_CHILD_ACCOUNT);

  useEffect(() => {
    console.log('PROPS', user);
  }, [user]);

  const addSingleChild = async () => {
    await createChildAccount({ variables: { name, password } });
    console.log('DATA', data);
    addChildToUser(data.createChildAccount);
  };

  // const renderIcon = (props) => (
  //   <TouchableWithoutFeedback
  //     onPress={() => setSecureTextEntry(!secureTextEntry)}
  //   >
  //     <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
  //   </TouchableWithoutFeedback>
  // );

  return (
    <View>
      <Text>Add Child screen</Text>
      <TextInput
        label='Name'
        onChangeText={(nextValue) => setName(nextValue)}
        value={name}
      />
      <TextInput
        label='Password'
        secureTextEntry={secureTextEntry}
        onChangeText={(nextValue) => setPassword(nextValue)}
        value={password}
      />
      <Button onPress={addSingleChild}>Add child</Button>
    </View>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addChildToUser,
    },
    dispatch,
  );

const mapStateToProps = (state) => {
  const user = state.user;
  console.log('MSTP', state);
  return { user };
};

type AddChildScreenProps = {
  user: IUser;
};

export default connect(mapStateToProps, mapDispatchToProps)(AddChildScreen);

const CREATE_CHILD_ACCOUNT = gql`
  mutation CreateChildAccount($name: String!, $password: String!) {
    createChildAccount(name: $name, password: $password) {
      id
      ischild
      name
    }
  }
`;
