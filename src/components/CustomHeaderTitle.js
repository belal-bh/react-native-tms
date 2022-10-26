import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

export default CustomHeaderTitle = ({children, tintColor}) => {
  // console.log('title=>', children, tintColor);
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
