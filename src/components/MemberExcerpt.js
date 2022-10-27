import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {resetMemberStateById, selectMemberById} from '../models/membersSlice';

export default MemberExcerpt = ({memberId, index}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const member = useSelector(state => selectMemberById(state, memberId));

  const handleClickMemberDetail = () => {
    navigation.navigate('MemberDetail', {
      memberId: memberId,
    });
  };

  useEffect(() => {
    dispatch(resetMemberStateById(memberId));
  }, []);

  return (
    <View style={styles.itemViewContainer}>
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.titleContainerView}
          onPress={handleClickMemberDetail}>
          <Text style={styles.title}>
            <Text>
              {index + 1}
              {'. '}
            </Text>
            <Text>
              {member.name.length > 22
                ? member.name.slice(0, 22) + '...'
                : member.name}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemViewContainer: {
    marginVertical: 8,
    marginHorizontal: 5,
    // backgroundColor: 'red',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#c5c5c5',
    padding: 5,
    height: 50,
    borderRadius: 5,
  },
  titleContainerView: {
    textAlignVertical: 'center',
    // backgroundColor: 'red',
    width: '100%',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
});
