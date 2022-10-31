import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {
  addNewMember,
  selectMembersExtrasAddStatus,
  selectMembersExtrasAddError,
  resetMembersExtras,
  selectMemberById,
  resetMemberStateById,
  updateMember,
} from '../models/membersSlice';

import OverlaySpinner from '../components/OverlaySpinner';

export default MemberForm = ({memberId}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const member = memberId
    ? useSelector(state => selectMemberById(state, memberId))
    : undefined;
  const hasMember = memberId && member ? true : false;

  const status = hasMember
    ? member.status
    : useSelector(selectMembersExtrasAddStatus);

  const error = hasMember
    ? member.error
    : useSelector(selectMembersExtrasAddError);

  const isLoading =
    Boolean(status === 'loading') || Boolean(status === 'creating');
  const errorMessage = error;

  useEffect(() => {
    if (!hasMember) dispatch(resetMembersExtras());
  }, [hasMember]);

  useEffect(() => {
    if (Boolean(status === 'created')) {
      dispatch(resetMembersExtras());
      navigation.pop();
    } else if (Boolean(status === 'succeeded') && hasMember) {
      dispatch(resetMemberStateById(member.id));
      navigation.pop();
    }
  }, [status, hasMember, dispatch]);

  return (
    <View style={styles.mainContainer}>
      {isLoading && <OverlaySpinner color="green" message="Wait a second..." />}
      <Formik
        initialValues={{
          name: member?.name ? member.name : '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required.'),
        })}
        onSubmit={values => {
          console.log(values);
          if (hasMember) dispatch(updateMember({id: member.id, data: values}));
          else dispatch(addNewMember(values));
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
                {hasMember ? 'Update Member' : 'Add member'}
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
                  placeholder="Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                {errors.name && touched.name && (
                  <Text style={styles.validationMessageView}>
                    {errors.name}
                  </Text>
                )}
              </View>
              <View style={styles.buttonViewContainer}>
                <TouchableOpacity
                  disabled={Boolean(isLoading || errors.name)}
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
