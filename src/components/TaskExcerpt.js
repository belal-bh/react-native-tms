import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default TaskExcerpt = ({task, index, disabledLink}) => {
  const navigation = useNavigation();

  disabledLink = disabledLink ? true : false;

  const taskId = task?.id;

  const handleClickTaskDetail = () => {
    navigation.navigate('TaskDetail', {
      taskId,
    });
  };

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
