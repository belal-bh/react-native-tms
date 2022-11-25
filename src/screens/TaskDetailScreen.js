import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';

import OverlaySpinner from '../components/OverlaySpinner';

import {useTaskById, useDeleteTask, useMemberById} from '../api/rqhooks';

export default TaskDetailScreen = ({route}) => {
  const taskId = route.params.taskId;
  const navigation = useNavigation();

  const deleteTaskMutation = useDeleteTask();

  console.log(deleteTaskMutation.status);

  const {
    data: task,
    isLoading: taskLoading,
    isFetching: taskFetching,
    isError,
    error: taskError,
  } = useTaskById(taskId, !!taskId && deleteTaskMutation.isIdle);
  const hasTask = task?.id && task ? true : false;

  const {
    data: member,
    isLoading: isMemberLoading,
    isFetching: isMemberFetching,
    isError: isMemberError,
    error: memberError,
  } = useMemberById(task?.memberId, Boolean(task?.memberId));

  const error = taskError
    ? taskError
    : deleteTaskMutation.isError
    ? deleteTaskMutation.error
    : memberError;
  // const member = undefined;

  const isLoading =
    taskLoading ||
    taskFetching ||
    deleteTaskMutation.isLoading ||
    deleteTaskMutation.isFetching ||
    isMemberLoading ||
    isMemberFetching;

  const errorMessage = error;

  console.log('member:', member);

  console.log(
    'isLoading:',
    isLoading,
    'hasTask',
    hasTask,
    'task:',
    task,
    // 'status:',
    // status,
    'member:',
    member,
  );

  const handleClickEdit = () => {
    navigation.navigate('TaskUpdate', {task});
  };

  const handleClickDelete = () => {
    // dispatch(deleteTask({id: task.id}));
    deleteTaskMutation.mutate({id: task.id});
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
    if (taskId && !hasTask && !isLoading && !deleteTaskMutation.isLoading) {
      console.log('##################################');
      navigation.pop();
    } else if (deleteTaskMutation.isSuccess) {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      navigation.pop();
      console.log('==================');
    }
  }, [
    taskId,
    hasTask,
    isLoading,
    deleteTaskMutation.isLoading,
    deleteTaskMutation.isSuccess,
  ]);

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
    <View style={styles.mainContainer}>
      {isLoading && <OverlaySpinner color="green" message="Wait a second..." />}
      {errorMessage && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessageTextView}>{errorMessage}</Text>
        </View>
      )}
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
