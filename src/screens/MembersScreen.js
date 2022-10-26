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

export default MembersScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>MembersScreen!</Text>
      <Button
        title="Go to MemberDetailScreen"
        onPress={() => navigation.navigate('MemberDetailScreen')}
      />
      <Button
        title="Go to MemberAddScreen"
        onPress={() => navigation.navigate('MemberAddScreen')}
      />
    </View>
  );
};
