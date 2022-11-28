import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';

import OverlaySpinner from '../components/OverlaySpinner';
import TaskExcerpt from '../components/TaskExcerpt';

import {useMemberById, useDeleteMember, useTasks} from '../api/rqhooks';

export default MemberDetailScreen = ({route}) => {
  const memberId = route.params.memberId;
  const navigation = useNavigation();

  const deleteMemberMutation = useDeleteMember();

  console.log(deleteMemberMutation.status);

  const {
    data: member,
    isLoading: memberLoading,
    isFetching: memberFetching,
    isError: isMemberError,
    error: memberError,
  } = useMemberById(memberId, !!memberId && deleteMemberMutation.isIdle);
  const hasMember = member?.id && member ? true : false;

  const {
    data: allTasks,
    isLoading: tasksLoading,
    isFetching: tasksFetching,
    isError: isTasksError,
    error: tasksError,
  } = useTasks(!!member && !!memberId && deleteMemberMutation.isIdle);

  const tasks =
    allTasks && allTasks?.length > 0
      ? allTasks.filter(task => task?.memberId === memberId)
      : [];

  const error = isMemberError
    ? memberError
    : deleteMemberMutation.isError
    ? deleteMemberMutation.error
    : tasksError;

  const isLoading =
    memberLoading ||
    memberFetching ||
    deleteMemberMutation.isLoading ||
    deleteMemberMutation.isFetching ||
    tasksLoading ||
    tasksFetching;

  const errorMessage = error;

  const handleClickEdit = () => {
    navigation.navigate('MemberUpdate', {member});
  };

  const handleClickDelete = () => {
    deleteMemberMutation.mutate({id: member.id});
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Confirm Delete', 'Are you sure to delete Member?', [
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

  const renderTaskItem = ({item, index}) => {
    return <TaskExcerpt task={item} index={index} disabledLink={true} />;
  };

  useEffect(() => {
    if (
      memberId &&
      !hasMember &&
      !isLoading &&
      !deleteMemberMutation.isLoading
    ) {
      console.log('##################################');
      navigation.pop();
    } else if (deleteMemberMutation.isSuccess) {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      navigation.pop();
      console.log('==================');
    }
  }, [
    memberId,
    hasMember,
    isLoading,
    deleteMemberMutation.isLoading,
    deleteMemberMutation.isSuccess,
  ]);

  return hasMember ? (
    <View style={styles.mainContainer}>
      {isLoading && <OverlaySpinner color="green" message="Wait a second..." />}
      {errorMessage && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessageTextView}>{errorMessage}</Text>
        </View>
      )}
      <View style={styles.container}>
        <Text style={styles.headerStyle}>{member.name}</Text>
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

      <View style={styles.container}>
        <Text style={styles.headerStyle}>{'Tasks:'}</Text>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  ) : (
    <View style={styles.mainContainer}>
      {isLoading && <OverlaySpinner color="green" message="Wait a second..." />}
      {errorMessage && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessageTextView}>{errorMessage}</Text>
        </View>
      )}
      {!isLoading && <Text>Member does not exist!</Text>}
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
    // marginTop: 20,
  },
  deleteButtonContainer: {
    alignItems: 'flex-end',
    // marginTop: 20,
  },
  submitButtonView: {
    width: 80,
    height: 40,
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
