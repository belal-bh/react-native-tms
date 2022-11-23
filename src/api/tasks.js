import {store} from '../models/store';

import {API_URL_TASK, WAITING_TIME} from '../config';
import {getTaskObjectListSerializable} from '../helpers/taskHelpers';
import {wait} from '../helpers/helpers';

import {selectUserToken, logoutAndResetStore} from '../models/userSlice';

export const fetchTasks = async params => {
  const token = selectUserToken(store.getState());
  console.log('token:', token);
  await wait(WAITING_TIME);
  const response = await fetch(`${API_URL_TASK}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    console.log('ERROR:', error);
    if (response.status === 401) {
      store.dispatch(logoutAndResetStore());
      throw new Error(error?.msg);
    }
    throw new Error(error?.msg ? error.msg : 'Something went wrong.');
  }
  const res = await response.json();
  console.log('fetchTasks:', res);
  return getTaskObjectListSerializable(res.tasks);
};
