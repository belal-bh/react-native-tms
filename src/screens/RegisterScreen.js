import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

export default RegisterScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>RegisterScreen!</Text>
      <Button
        title="Go to Login Screen"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};
