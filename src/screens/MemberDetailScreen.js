import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

export default MemberDetailScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>MemberDetailScreen!</Text>
      <Button
        title="Go to MemberUpdateScreen"
        onPress={() => navigation.navigate('MemberUpdateScreen')}
      />
    </View>
  );
};
