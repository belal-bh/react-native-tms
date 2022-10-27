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

export default TasksScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>TasksScreen!</Text>
      <Button
        title="Go to TaskDetail"
        onPress={() => navigation.navigate('TaskDetail')}
      />
      <Button
        title="Go to TaskAdd"
        onPress={() => navigation.navigate('TaskAdd')}
      />
    </View>
  );
};
