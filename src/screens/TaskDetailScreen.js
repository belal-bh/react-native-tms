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

export default TaskDetailScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>TaskDetailScreen!</Text>
      <Button
        title="Go to TaskUpdateScreen"
        onPress={() => navigation.navigate('TaskUpdateScreen')}
      />
    </View>
  );
};
