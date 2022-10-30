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
import {selectNumberOfTasksByMemberId} from '../models/tasksSlice';

export default MemberExcerpt = ({memberId, index, disabledLink}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  disabledLink = disabledLink ? true : false;

  const member = useSelector(state => selectMemberById(state, memberId));

  const numberOfTasks = useSelector(state =>
    selectNumberOfTasksByMemberId(state, memberId),
  );

  const handleClickMemberDetail = () => {
    navigation.navigate('MemberDetail', {
      memberId: memberId,
    });
  };

  // useEffect(() => {
  //   dispatch(resetMemberStateById(memberId));
  // }, []);

  return member ? (
    <View style={styles.itemViewContainer}>
      <View style={styles.item}>
        <View style={styles.titleContainerView}>
          <Text style={styles.title}>
            <TouchableOpacity
              disabled={disabledLink}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
              onPress={handleClickMemberDetail}>
              <Text style={styles.title}>
                {index + 1}
                {'. '}
                {member.name.length > 22
                  ? member.name.slice(0, 22) + '...'
                  : member.name}
              </Text>
            </TouchableOpacity>
          </Text>
          <Text style={styles.itemRight}>
            {numberOfTasks > 0 ? `${numberOfTasks} tasks` : `No task`}
          </Text>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.itemViewContainer}>
      <View style={styles.item}>
        <View style={styles.titleContainerView}>
          <Text style={styles.title}>Not deleted</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemViewContainer: {
    marginVertical: 8,
    marginHorizontal: 5,
    // backgroundColor: 'red',
    // width: '100%',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#c5c5c5',
    padding: 5,
    // height: 50,
    width: '100%',
    borderRadius: 5,
  },
  titleContainerView: {
    textAlignVertical: 'center',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    // flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  itemRight: {
    // flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    // backgroundColor: 'green',
    alignSelf: 'flex-end',
  },
});
