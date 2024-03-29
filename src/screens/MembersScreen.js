import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectMemberIds,
  selectMembersError,
  selectMembersStatusLoading,
  selectMembersRequiredReload,
  reloadAllMembers,
} from '../models/membersSlice';

import MemberExcerpt from '../components/MemberExcerpt';
import {reloadAllTasks} from '../models/tasksSlice';

export default MembersScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const memberIds = useSelector(selectMemberIds);
  console.log('memberIds:', memberIds);

  const requiredReload = useSelector(selectMembersRequiredReload);

  const isLoading = useSelector(selectMembersStatusLoading);
  const errorMessage = useSelector(selectMembersError);

  const renderMemberItem = ({item, index}) => {
    return <MemberExcerpt memberId={item} index={index} />;
  };

  useEffect(() => {
    dispatch(reloadAllTasks());
    dispatch(reloadAllMembers());
  }, []);

  useEffect(() => {
    if (requiredReload) {
      dispatch(reloadAllTasks());
      dispatch(reloadAllMembers());
    }
  }, [requiredReload]);

  return (
    <View style={styles.mainContainer}>
      {isLoading && <OverlaySpinner message="Loading Members" />}
      <View style={styles.container}>
        <Text style={styles.titleText}>{'All members'}</Text>
        <Text style={styles.paraText}>You will find all member here.</Text>
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
            Here is all members:
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
              navigation.navigate('MemberAdd');
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
        data={memberIds}
        renderItem={props => renderMemberItem(props)}
        keyExtractor={(item, index) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
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
