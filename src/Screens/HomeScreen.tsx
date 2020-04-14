import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

const HomeScreen = ({ navigation, user }) => {
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

const mapStateToProps = (state) => {
  const user = state.user.user;
  console.log('MAPSTATETOPROPS', user);
  return { user };
};

export default connect(mapStateToProps)(HomeScreen);
