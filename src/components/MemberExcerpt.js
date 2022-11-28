import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {useTasks} from '../api/rqhooks';
import {getNumberOfTasksByMemberId} from '../api/utils/members';

export default MemberExcerpt = ({member, index, disabledLink}) => {
  const navigation = useNavigation();

  disabledLink = disabledLink ? true : false;

  const memberId = member?.id;

  const {
    data: allTasks,
    isLoading: tasksLoading,
    isFetching: tasksFetching,
    isError,
    error,
  } = useTasks(!!memberId);

  const numberOfTasks = getNumberOfTasksByMemberId(allTasks, memberId);

  const handleClickMemberDetail = () => {
    navigation.navigate('MemberDetail', {
      memberId,
    });
  };

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
