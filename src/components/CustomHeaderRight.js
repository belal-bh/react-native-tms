import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  logoutUser,
  selectUserIsLoggedIn,
  selectUser,
} from '../models/userSlice';

import {resetToScreen} from '../helpers/helpers';

export default CustomHeaderRight = ({canGoBack, tintColor}) => {
  // console.log('right=>', canGoBack, tintColor);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const user = useSelector(selectUser);

  console.log('R: isLoggedIn:', isLoggedIn, 'user: ', user);

  return isLoggedIn ? (
    <View style={{...styles.container, color: tintColor}}>
      <Text style={{...styles.username, color: tintColor}}>
        {user.name ? user.name : user.email}
      </Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(logoutUser());
          resetToScreen(navigation, 'Login');
        }}>
        <AntDesign name={'logout'} size={24} color={tintColor} />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{...styles.container, color: tintColor}}>
      <TouchableOpacity
        onPress={() => {
          resetToScreen(navigation, 'Login');
        }}>
        <AntDesign name={'login'} size={24} color={tintColor} />
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
