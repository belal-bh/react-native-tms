import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {resetToScreen} from '../helpers/helpers';

import {selectUser, selectUserIsLoggedIn} from '../models/userSlice';

export default CustomHeaderTitle = ({children, tintColor}) => {
  // console.log('children=>', children, tintColor);
  const navigation = useNavigation();
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const user = useSelector(selectUser);

  console.log('T: isLoggedIn:', isLoggedIn, 'user: ', user);

  useEffect(() => {
    if (
      !Boolean(children === 'Login' || children === 'Register') &&
      !isLoggedIn
    ) {
      console.log('goint to login screen!');
      resetToScreen(navigation, 'Login');
    }
  }, [isLoggedIn, children]);

  return (
    <View style={{...styles.container, color: tintColor}}>
      <Image
        style={{...styles.logo, color: tintColor}}
        source={require('../assets/logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontWeight: 'bold',
    fontSize: 21,
    alignSelf: 'center',
    height: 50,
    width: 50,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
});
