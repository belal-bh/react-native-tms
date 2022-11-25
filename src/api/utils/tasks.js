import {store} from '../../models/store';

import {API_URL_TASK, WAITING_TIME} from '../../config';
import {
  getTaskObjectListSerializable,
  getTaskObjectSerializable,
} from '../../helpers/taskHelpers';
import {wait} from '../../helpers/helpers';

import {selectUserToken, logoutAndResetStore} from '../../models/userSlice';

export const fetchTasks = async params => {
  const token = selectUserToken(store.getState());
  // console.log('token:', token);
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
  // console.log('fetchTasks:', res);
  return getTaskObjectListSerializable(res.tasks);
};

export const fetchTaskById = async ({queryKey: [, taskId]}) => {
  const token = selectUserToken(store.getState());
  console.log('taskId:', taskId, 'token:', token);
  await wait(WAITING_TIME);
  const response = await fetch(`${API_URL_TASK}${taskId}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    console.log('ERROR ======>:', error);
    if (response.status === 401) {
      store.dispatch(logoutAndResetStore());
      throw new Error(error?.msg);
    }
    throw new Error(error?.msg ? error.msg : 'Something went wrong.');
  }
  const res = await response.json();
  // console.log('fetchTaskById:', res);
  return getTaskObjectSerializable(res.task);
};

export const addNewTask = async data => {
  const token = selectUserToken(store.getState());
  // console.log('token:', token);
  await wait(WAITING_TIME);
  const response = await fetch(`${API_URL_TASK}`, {
    method: 'POST',
    body: JSON.stringify(data),
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
    } else if (response.status >= 400 && response.status < 500) {
      if (error?.errors) {
        const message = error?.errors.reduce((pre, cur) => {
          return `${pre} ${cur.msg}.`;
        }, '');
        throw new Error(message);
      }
    }
    throw new Error(error?.msg ? error.msg : 'Something went wrong.');
  }
  const res = await response.json();
  // return getTaskObjectSerializable(res);
  return res;
};

export const updateTask = async ({id, data}) => {
  const token = selectUserToken(store.getState());
  // console.log('token:', token);
  console.log(`id=${id}, data=${data?.title ? data.title : data?.description}`);
  await wait(WAITING_TIME);
  const response = await fetch(`${API_URL_TASK}${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
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
    } else if (response.status >= 400 && response.status < 500) {
      if (error?.errors) {
        const message = error?.errors.reduce((pre, cur) => {
          return `${pre} ${cur.msg}.`;
        }, '');
        throw new Error(message);
      }
    }
    throw new Error(error?.msg ? error.msg : 'Something went wrong.');
  }
  const res = await response.json();
  // return getTaskObjectSerializable(res);
  return res;
};

export const deleteTask = async ({id}) => {
  const token = selectUserToken(store.getState());
  // console.log('token:', token);
  console.log(`id=${id}`);
  await wait(WAITING_TIME);
  const response = await fetch(`${API_URL_TASK}${id}/`, {
    method: 'DELETE',
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
    } else if (response.status >= 400 && response.status < 500) {
      if (error?.errors) {
        const message = error?.errors.reduce((pre, cur) => {
          return `${pre} ${cur.msg}.`;
        }, '');
        throw new Error(message);
      }
    }
    throw new Error(error?.msg ? error.msg : 'Something went wrong.');
  }
  // console.log(response);
};
