import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';

import TaskExcerpt from '../components/TaskExcerpt';

import {useTasks} from '../api/rqhooks';

export default TasksScreen = () => {
  const {
    data: tasks,
    isLoading: tasksLoading,
    isFetching: tasksFetching,
    isError,
    error,
  } = useTasks();
  console.log(
    'RQ:',
    tasksLoading,
    tasksFetching,
    isError,
    error,
    tasks?.length,
  );

  const navigation = useNavigation();

  const isLoading = tasksLoading || tasksFetching;
  const errorMessage = error;

  const renderTaskItem = ({item, index}) => {
    return <TaskExcerpt task={item} index={index} />;
  };

  return (
    <View style={styles.mainContainer}>
      {isLoading && <OverlaySpinner message="Loading Tasks" />}
      <View style={styles.container}>
        <Text style={styles.titleText}>{'All tasks'}</Text>
        <Text style={styles.paraText}>You will find all task here.</Text>
      </View>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            marginTop: 20,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Here is all tasks:
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'gray',
              marginRight: 20,
              borderRadius: 5,
              padding: 5,
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('TaskAdd');
            }}>
            <Text style={{color: '#fff', fontSize: 16}}>Add new</Text>
          </TouchableOpacity>
        </View>
      </View>
      {errorMessage && (
        <View style={styles.loadingView}>
          <Text style={{color: 'red'}}>{errorMessage}</Text>
        </View>
      )}

      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
    padding: 10,
  },
  container: {
    // flex: 1,
    textAlign: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
  },
  listViewContainer: {
    flex: 1,
    // backgroundColor: 'red',
    width: '100%',
    height: '100%',
    paddingLeft: 20,
  },

  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  paraText: {
    fontSize: 16,
    fontWeight: 'normal',
    // paddingVertical: 10,
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#00a0db',
    width: 150,
    height: 60,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
  },
});
