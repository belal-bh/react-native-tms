import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

export default OverlaySpinner = ({
  size = 'large',
  color = '#0000ff',
  message = '',
}) => {
  return (
    <View style={styles.spinnerView}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerView: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88', // 'transparent',
  },
});
