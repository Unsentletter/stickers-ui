import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Layout, Icon, Input } from '@ui-kitten/components';

const SignupScreen = () => {
  // TODO - I will use this to toggle the password text
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const renderIcon = (props) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    >
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

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
    </View>
  );
};

export default SignupScreen;
