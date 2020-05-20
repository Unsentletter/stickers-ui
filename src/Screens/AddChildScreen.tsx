import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';

import { addChildToUser } from '../actions/UserActions';
import { IUser } from '../types/User';
import { AppState } from '../store/configureStore';

const AddChildScreen = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [children, setChildren] = useState<IUser[]>([]);
  const [createChildAccount, { data }] = useMutation(CREATE_CHILD_ACCOUNT, {
    onCompleted() {
      const childrenArray =
        children.length > 0
          ? [...children, createChildAccount]
          : [createChildAccount];
      setChildren(childrenArray);
    },
  });

  const addSingleChild = async () => {
    await createChildAccount({ variables: { name, password } });
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
        onChangeText={(value: string) => {
          return setName(value);
        }}
        value={name}
      />
      <TextInput
        label='Password'
        secureTextEntry={secureTextEntry}
        onChangeText={(value: string) => {
          return setPassword(value);
        }}
        value={password}
      />
      <Button onPress={addSingleChild}>Add child</Button>
      {children.length > 1
        ? children.map((child: IUser) => {
            return <Text key={child.id}>{child.name}</Text>;
          })
        : null}
    </View>
  );
};

const actionCreators = {
  addChildToUser,
};

const mapStateToProps = (state: AppState) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, actionCreators)(AddChildScreen);

const CREATE_CHILD_ACCOUNT = gql`
  mutation CreateChildAccount($name: String!, $password: String!) {
    createChildAccount(name: $name, password: $password) {
      id
      ischild
      name
    }
  }
`;
