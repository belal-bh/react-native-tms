import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default CustomHeaderLeft = ({canGoBack, label, tintColor}) => {
  // console.log('left=>', canGoBack, label, tintColor);
  const navigation = useNavigation();
  return (
    <View style={{...styles.container, color: tintColor}}>
      {canGoBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={24} color={tintColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontWeight: 'bold',
    fontSize: 21,
    alignSelf: 'center',
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});
