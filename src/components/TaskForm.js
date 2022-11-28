import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {SelectCountry} from 'react-native-element-dropdown';

import OverlaySpinner from '../components/OverlaySpinner';

import {useAddNewTask, useUpdateTask, useMembers} from '../api/rqhooks';

export default TaskForm = ({task}) => {
  const navigation = useNavigation();

  const addNewTaskMutation = useAddNewTask();
  const updateTaskMutation = useUpdateTask();

  const taskId = task?.id;
  const hasTask = taskId && task ? true : false;

  const {
    data: members,
    isLoading: isMembersLoading,
    isError: isMembersError,
    error: membersError,
  } = useMembers();

  const error = addNewTaskMutation.isError
    ? addNewTaskMutation.error
    : updateTaskMutation.error;

  const isLoading =
    addNewTaskMutation.isLoading ||
    updateTaskMutation.isLoading ||
    isMembersLoading;
  const errorMessage = error?.message;

  useEffect(() => {
    if (addNewTaskMutation.isSuccess) {
      // dispatch(resetTasksExtras());
      navigation.pop();
    } else if (updateTaskMutation.isSuccess && hasTask) {
      // dispatch(resetTaskStateById(task.id));
      navigation.pop();
    }
  }, [addNewTaskMutation.isSuccess, updateTaskMutation.isSuccess, hasTask]);

  return (
    <View style={styles.mainContainer}>
      {isLoading && <OverlaySpinner color="green" message="Wait a second..." />}
      <Formik
        initialValues={{
          title: task?.title ? task.title : '',
          description: task?.description ? task.description : '',
          memberId: task?.memberId ? task.memberId : '',
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Title is required.'),
          description: Yup.string(),
          memberId: Yup.number().required('Member is required'),
        })}
        onSubmit={values => {
          console.log(values);
          if (hasTask) updateTaskMutation.mutate({id: task.id, data: values});
          else addNewTaskMutation.mutate(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) =>
          !isLoading ? (
            <View style={styles.container}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {hasTask ? 'Update Task' : 'Add task'}
              </Text>
              {errorMessage && (
                <View style={styles.errorMessageContainer}>
                  <Text style={styles.errorMessageTextView}>
                    {errorMessage}
                  </Text>
                </View>
              )}
              <View style={styles.inputContainerView}>
                <TextInput
                  style={styles.textInputView}
                  placeholder="Title"
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                />
                {errors.title && touched.title && (
                  <Text style={styles.validationMessageView}>
                    {errors.title}
                  </Text>
                )}

                <TextInput
                  style={styles.textInputView}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Description"
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                />
                {errors.description && touched.description && (
                  <Text style={styles.validationMessageView}>
                    {errors.description}
                  </Text>
                )}

                <SelectCountry
                  style={styles.textInputView}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  imageStyle={styles.imageStyle}
                  iconStyle={styles.iconStyle}
                  maxHeight={200}
                  value={values.memberId}
                  data={members}
                  valueField="id"
                  labelField="name"
                  imageField="image"
                  placeholder="Select Member"
                  searchPlaceholder="Search..."
                  onChange={e => {
                    // console.log('onChange:', e.id);
                    setFieldValue('memberId', e.id);
                  }}
                />
                {errors.memberId && touched.memberId && (
                  <Text style={styles.validationMessageView}>
                    {errors.memberId}
                  </Text>
                )}
              </View>
              <View style={styles.buttonViewContainer}>
                <TouchableOpacity
                  disabled={Boolean(
                    isLoading || errors.title || errors.memberId,
                  )}
                  style={styles.buttonViewContainer}
                  onPress={() => {
                    console.log('values:', values);
                    handleSubmit();
                  }}>
                  <Text style={styles.buttonTextView}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        }
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: 'red'
    paddingTop: 10,
  },
  container: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  inputContainerView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  textInputView: {
    borderColor: '#fefefe',
    borderRadius: 10,
    borderWidth: 1,
    width: '80%',
    // textAlign: 'center',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    paddingTop: 10,
    marginTop: 10,
    color: '#000',
  },
  buttonViewContainer: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: 30,
    backgroundColor: '#00a0db',
    borderRadius: 10,
  },
  buttonTextView: {
    color: 'white',
    fontSize: 20,
  },
  validationMessageView: {
    width: '80%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: 'green',
    paddingHorizontal: 10,
    color: 'red',
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

  dropdown: {
    margin: 16,
    height: 50,
    // width: 150,
    width: '80%',
    // backgroundColor: '#EEEEEE',
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
