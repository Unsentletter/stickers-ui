import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>HOME SCREEN</Text>
      <Button
        title='Next'
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

export default HomeScreen;
