import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {
  API_URL_AUTH_LOGIN,
  API_URL_AUTH_REGISTER,
  WAITING_TIME,
} from '../config';

import {wait} from '../helpers/helpers';
import {getUserObjectSerializable} from '../helpers/authHelpers';

import {resetTasks} from './tasksSlice';
import {resetMembers} from './membersSlice';

export const loginUser = createAsyncThunk('user/loginUser', async data => {
  await wait(WAITING_TIME);
  const response = await fetch(`${API_URL_AUTH_LOGIN}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const res = await response.json();
  const user = getUserObjectSerializable(res.user);
  const token = res.token;
  return {token, user};
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async data => {
    await wait(WAITING_TIME);
    const response = await fetch(`${API_URL_AUTH_REGISTER}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const res = await response.json();
    const user = getUserObjectSerializable(res.user);
    const token = res.token;
    return {token, user};
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    user: {
      id: NaN,
      name: '',
      email: '',
      createdAt: null,
      updatedAt: null,
    },
    isLoggedIn: false,

    status: 'idle',
    error: null,
  },
  reducers: {
    resetUserState(state, action) {
      state.status = 'idle';
      state.error = null;
    },
    logoutUser(state, action) {
      state.isLoggedIn = false;
      state.token = '';

      state.user.id = NaN;
      state.user.name = '';
      state.user.email = '';
      state.user.createdAt = null;
      state.user.updatedAt = null;

      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      const {token, user} = action.payload;
      state.token = token;
      state.user = user;
      state.isLoggedIn = true;

      state.status = 'succeeded';
      state.error = null;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
      console.log('login error:', action.error);
      state.error = action.error.message;
    },
    [registerUser.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      const {token, user} = action.payload;
      state.token = token;
      state.user = user;
      state.isLoggedIn = true;

      state.status = 'succeeded';
      state.error = null;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = 'failed';
      console.log('register error:', action.error);
      state.error = action.error.message;
    },
  },
});

export const selectUserToken = state => state.user.token;
export const selectUserIsLoggedIn = state => state.user.isLoggedIn;
export const selectUserStatus = state => state.user.status;
export const selectUserError = state => state.user.error;
export const selectUser = state => state.user.user;
export const selectUserId = state => state.user.user.id;

export const {resetUserState, logoutUser} = userSlice.actions;

export default userSlice.reducer;

export const logoutAndResetStore = () => async dispatch => {
  dispatch(logoutUser());
  dispatch(resetTasks());
  dispatch(resetMembers());
};
