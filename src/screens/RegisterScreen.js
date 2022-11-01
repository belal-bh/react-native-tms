import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {
  registerUser,
  selectUserStatus,
  selectUserError,
  selectUserIsLoggedIn,
  resetUserState,
} from '../models/userSlice';

import {resetToScreen} from '../helpers/helpers';
import OverlaySpinner from '../components/OverlaySpinner';

export default RegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);

  const isLoading = Boolean(status === 'loading');
  const errorMessage = error;

  useEffect(() => {
    dispatch(resetUserState());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      resetToScreen(navigation, 'Home');
    }
  }, [isLoggedIn]);

  return (
    <View style={styles.mainContainer}>
      {isLoading && <OverlaySpinner color="green" message="Wait a second..." />}
      <Formik
        initialValues={{name: '', email: '', password: '', password2: ''}}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required.'),
          email: Yup.string().email().required('Email is required'),
          password: Yup.string().required('Password is required'),
          password2: Yup.string()
            .required('Confirmation Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        })}
        onSubmit={values => {
          console.log(values);
          dispatch(registerUser(values));
        }}>
        {({handleChange, handleBlur, handleSubmit, values, errors, touched}) =>
          !isLoading ? (
            <View style={styles.container}>
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

                <TextInput
                  style={styles.textInputView}
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {errors.email && touched.email && (
                  <Text style={styles.validationMessageView}>
                    {errors.email}
                  </Text>
                )}

                <TextInput
                  style={styles.textInputView}
                  secureTextEntry={true}
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                {errors.password && touched.password && (
                  <Text style={styles.validationMessageView}>
                    {errors.password}
                  </Text>
                )}

                <TextInput
                  style={styles.textInputView}
                  secureTextEntry={true}
                  placeholder="Confirm Password"
                  value={values.password2}
                  onChangeText={handleChange('password2')}
                  onBlur={handleBlur('password2')}
                />
                {errors.password2 && touched.password2 && (
                  <Text style={styles.validationMessageView}>
                    {errors.password2}
                  </Text>
                )}
              </View>
              <View style={styles.buttonViewContainer}>
                <TouchableOpacity
                  disabled={isLoading}
                  style={styles.buttonViewContainer}
                  onPress={
                    errors.name ||
                    errors.email ||
                    errors.password ||
                    errors.password2
                      ? null
                      : handleSubmit
                  }>
                  <Text style={styles.buttonTextView}>Signup</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainerView}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                    }}>
                    Already have an account ?
                  </Text>
                  <TouchableOpacity
                    disabled={isLoading}
                    style={{
                      paddingTop: 10,
                    }}
                    onPress={() => resetToScreen(navigation, 'Login')}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#00a0db',
                      }}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
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
    textAlign: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    marginTop: 10,
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
});
