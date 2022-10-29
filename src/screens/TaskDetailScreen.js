import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {SelectCountry} from 'react-native-element-dropdown';

import {
  addNewTask,
  selectTasksExtrasAddStatus,
  selectTasksExtrasAddError,
  resetTasksExtras,
  selectTaskStatusById,
  selectTaskErrorById,
  selectTaskById,
  resetTaskStateById,
  deleteTask,
  fetchTasks,
  reloadAllTasks,
} from '../models/tasksSlice';
import {
  selectAllMembers,
  selectMemberById,
  selectMemberIds,
} from '../models/membersSlice';

import {resetToScreen} from '../helpers/helpers';
import OverlaySpinner from '../components/OverlaySpinner';

export default TaskDetailScreen = ({route}) => {
  const taskId = route.params.taskId;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const task = taskId
    ? useSelector(state => selectTaskById(state, taskId))
    : undefined;
  const hasTask = taskId && task ? true : false;

  const status = task?.status;
  const error = task?.error;
  const member = task?.memberId
    ? useSelector(state => selectMemberById(state, task?.memberId))
    : undefined;

  const isLoading =
    Boolean(status === 'loading') || Boolean(status === 'deleting');
  const errorMessage = error;

  console.log('task:', task, 'status:', status);

  const handleClickEdit = () => {
    navigation.navigate('TaskUpdate', {taskId: task.id});
  };

  const handleClickDelete = () => {
    dispatch(deleteTask({id: task.id}));
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Confirm Delete', 'Are you sure to delete Task?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: handleClickDelete,
      },
    ]);

  useEffect(() => {
    if (hasTask && task?.requiredReload) {
      navigation.pop();
    }
  }, [hasTask, task?.requiredReload]);

  useEffect(() => {
    if (taskId && !hasTask) {
      navigation.pop();
    } else if (task?.status === 'deleted') {
      navigation.pop();
    }
  }, [taskId, hasTask, task?.status]);

  return hasTask ? (
    <View style={styles.mainContainer}>
      {isLoading && <OverlaySpinner color="green" message="Wait a second..." />}
      {errorMessage && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessageTextView}>{errorMessage}</Text>
        </View>
      )}
      <View style={styles.container}>
        <Text style={styles.headerStyle}>{'Title:'}</Text>
        <Text style={styles.contentStyle}>{task.title}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.headerStyle}>{'Description:'}</Text>
        <Text style={styles.contentStyle}>
          {task.description ? task.description : 'No description to show.'}
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.headerStyle}>{'Assigned to:'}</Text>
        <Text style={styles.contentStyle}>
          {member?.name ? member.name : 'Not assigned yet.'}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.editButtonContainer}>
          <TouchableOpacity
            style={styles.submitButtonView}
            onPress={handleClickEdit}>
            <Text style={styles.submitButtonTextView}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity
            style={styles.submitButtonView}
            onPress={createTwoButtonAlert}>
            <Text style={styles.submitButtonTextView}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    <View>
      <Text>Task does not exist!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: 'red'
    padding: 10,
  },
  container: {
    // flex: 1,
    textAlign: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
    paddingVertical: 10,
  },
  headerStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  contentStyle: {
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 10,
  },
  errorMessageContainer: {
    width: '100%',
    paddingHorizontal: 30,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  errorMessageTextView: {
    color: 'red',
    fontSize: 18,
  },
  buttonContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
  },
  editButtonContainer: {
    alignItems: 'flex-start',
    marginTop: 20,
  },
  deleteButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
  submitButtonView: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: 30,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  submitButtonTextView: {
    color: 'white',
    fontSize: 20,
  },
});
