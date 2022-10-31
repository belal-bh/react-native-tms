import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {resetToScreen} from '../helpers/helpers';

export default HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{'Welcome to TMS'}</Text>
        <Text style={styles.paraText}>
          A task management tool is used by an individual, team, or organization
          to complete projects efficiently by organizing and prioritizing
          related tasks. Task management tools come in many forms, like basic
          spreadsheets or online project management applications.
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.subtitleText}>Get started</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              resetToScreen(navigation, 'TasksTab');
              // navigation.navigate('Tasks');
            }}>
            <Text style={styles.buttonText}>Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              resetToScreen(navigation, 'MembersTab');
              // navigation.navigate('Members');
            }}>
            <Text style={styles.buttonText}>Members</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
    paddingTop: 10,
  },
  container: {
    // flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  paraText: {
    fontSize: 16,
    fontWeight: 'normal',
    paddingVertical: 10,
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 50,
    paddingBottom: 20,
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
});
