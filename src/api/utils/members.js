import {store} from '../../models/store';

import {API_URL_MEMBER, WAITING_TIME} from '../../config';
import {
  getMemberObjectListSerializable,
  getMemberObjectSerializable,
} from '../../helpers/memberHelpers';
import {wait} from '../../helpers/helpers';

import {selectUserToken, logoutAndResetStore} from '../../models/userSlice';

export const fetchMembers = async params => {
  const token = selectUserToken(store.getState());
  // console.log('token:', token);
  await wait(WAITING_TIME);
  const response = await fetch(`${API_URL_MEMBER}`, {
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
  // console.log('fetchMembers:', res);
  return getMemberObjectListSerializable(res.members);
};

export const fetchMemberById = async ({queryKey: [, memberId]}) => {
  const token = selectUserToken(store.getState());
  // console.log('token:', token);
  await wait(WAITING_TIME);
  const response = await fetch(`${API_URL_MEMBER}${memberId}`, {
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
  // console.log('fetchMembers:', res);
  return getMemberObjectSerializable(res.member);
};
