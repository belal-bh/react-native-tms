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

import {resetTaskStateById, selectTaskById} from '../models/tasksSlice';

export default TaskExcerpt = ({taskId, index, disabledLink}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  disabledLink = disabledLink ? true : false;

  const task = useSelector(state => selectTaskById(state, taskId));
  // let task;
  // try {
  //   task = useSelector(state => selectTaskById(state, taskId));
  // } catch (e) {
  //   return null;
  // }

  console.log(`task [${taskId}]:`, task);

  const handleClickTaskDetail = () => {
    navigation.navigate('TaskDetail', {
      taskId: taskId,
    });
  };

  // useEffect(() => {
  //   if (task?.id) dispatch(resetTaskStateById(taskId));
  // }, [task?.id]);

  return task ? (
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
              onPress={handleClickTaskDetail}>
              <Text style={styles.title}>
                {index + 1}
                {'. '}
                {task.title.length > 22
                  ? task.title.slice(0, 22) + '...'
                  : task.title}
              </Text>
            </TouchableOpacity>
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
    width: '100%',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
});
