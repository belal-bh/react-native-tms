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

export default TaskExcerpt = ({taskId, index}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const task = useSelector(state => selectTaskById(state, taskId));

  // console.log(`task [${taskId}]:`, task);

  const handleClickTaskDetail = () => {
    navigation.navigate('TaskDetail', {
      taskId: taskId,
    });
  };

  useEffect(() => {
    dispatch(resetTaskStateById(taskId));
  }, []);

  return (
    <View style={styles.itemViewContainer}>
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.titleContainerView}
          onPress={handleClickTaskDetail}>
          <Text style={styles.title}>
            <Text>
              {index + 1}
              {'. '}
            </Text>
            <Text>
              {task.title.length > 22
                ? task.title.slice(0, 22) + '...'
                : task.title}
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
