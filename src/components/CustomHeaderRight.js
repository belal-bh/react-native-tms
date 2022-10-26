import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default CustomHeaderRight = ({canGoBack, tintColor}) => {
  // console.log('right=>', canGoBack, tintColor);
  const navigation = useNavigation();
  return (
    <View style={{...styles.container, color: tintColor}}>
      <Text style={{...styles.username, color: tintColor}}>Belal Hossain</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        }}>
        <AntDesign name={'logout'} size={24} color={tintColor} />
        {/* <AntDesign name={'login'} size={24} color={tintColor} /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  username: {
    fontWeight: 'bold',
    fontSize: 21,
    alignSelf: 'center',
    marginRight: 10,
  },
  container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});
