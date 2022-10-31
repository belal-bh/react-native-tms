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

import {useSelector, useDispatch} from 'react-redux';

import {selectMemberById, deleteMember} from '../models/membersSlice';
import {selectTaskIdsByMemberId} from '../models/tasksSlice';

import OverlaySpinner from '../components/OverlaySpinner';
import TaskExcerpt from '../components/TaskExcerpt';

export default MemberDetailScreen = ({route}) => {
  const memberId = route.params.memberId;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const member = memberId
    ? useSelector(state => selectMemberById(state, memberId))
    : undefined;
  const hasMember = memberId && member ? true : false;

  const status = member?.status;
  const error = member?.error;

  const taskIds = hasMember
    ? useSelector(state => selectTaskIdsByMemberId(state, memberId))
    : [];

  const isLoading =
    Boolean(status === 'loading') || Boolean(status === 'deleting');
  const errorMessage = error;

  console.log('member:', member, 'status:', status);

  const handleClickEdit = () => {
    navigation.navigate('MemberUpdate', {memberId: member.id});
  };

  const handleClickDelete = () => {
    dispatch(deleteMember({id: member.id}));
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
    return <TaskExcerpt taskId={item} index={index} disabledLink={true} />;
  };

  useEffect(() => {
    if (hasMember && member?.requiredReload) {
      navigation.pop();
    }
  }, [hasMember, member?.requiredReload]);

  useEffect(() => {
    if (memberId && !hasMember) {
      navigation.pop();
    } else if (member?.status === 'deleted') {
      navigation.pop();
    }
  }, [memberId, hasMember, member?.status]);

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
        data={taskIds}
        renderItem={renderTaskItem}
        keyExtractor={(item, index) => item}
      />
    </View>
  ) : (
    <View>
      <Text>Member does not exist!</Text>
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
