import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import {API_URL_MEMBER, WAITING_TIME} from '../config';
import {getMemberObjectListSerializable} from '../helpers/memberHelpers';
import {wait} from '../helpers/helpers';

import {selectUserToken, logoutAndResetStore} from './userSlice';
import {store} from './store';

export const fetchMembers = createAsyncThunk(
  'members/fetchMembers',
  async (params, {dispatch, getState}) => {
    const token = selectUserToken(getState());
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
        dispatch(logoutAndResetStore());
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
  },
);

export const addNewMember = createAsyncThunk(
  'members/addNewMember',
  async (data, {dispatch, getState}) => {
    const token = selectUserToken(getState());
    // console.log('token:', token);
    await wait(WAITING_TIME);
    const response = await fetch(`${API_URL_MEMBER}`, {
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
        dispatch(logoutAndResetStore());
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
    // return getMemberObjectSerializable(res);
    return res;
  },
);

export const updateMember = createAsyncThunk(
  'members/updateMember',
  async ({id, data}, {dispatch, getState}) => {
    const token = selectUserToken(getState());
    // console.log('token:', token);
    console.log(`id=${id}, data=${data?.name ? data.name : data?.id}`);
    await wait(WAITING_TIME);
    const response = await fetch(`${API_URL_MEMBER}${id}/`, {
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
        dispatch(logoutAndResetStore());
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
    // return getMemberObjectSerializable(res);
    return res;
  },
);

export const deleteMember = createAsyncThunk(
  'members/deleteMember',
  async ({id}, {dispatch, getState}) => {
    const token = selectUserToken(getState());
    // console.log('token:', token);
    console.log(`id=${id}`);
    await wait(WAITING_TIME);
    const response = await fetch(`${API_URL_MEMBER}${id}/`, {
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
        dispatch(logoutAndResetStore());
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
  },
);

const membersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

export const {
  selectAll: selectAllMembers,
  selectIds: selectMemberIds,
  selectById: selectMemberById,
} = membersAdapter.getSelectors(state => state.members);

export const selectMemberStatusById = (state, memberId) => {
  const member = selectMemberById(state, memberId);
  return member.status;
};

export const selectMemberErrorById = (state, memberId) => {
  const member = selectMemberById(state, memberId);
  return member.error;
};

const membersSlice = createSlice({
  name: 'members',
  initialState: membersAdapter.getInitialState({
    status: 'idle',
    error: null,
    extras: {
      add: {
        status: 'idle',
        error: null,
      },
    },
    requiredReload: true,
  }),
  reducers: {
    resetAddMemberState(state, action) {
      state.extras.add.status = 'idle';
      state.extras.add.error = null;
    },
    resetMembersExtras(state, action) {
      state.extras.add.status = 'idle';
      state.extras.add.error = null;
    },
    membersCleared: membersAdapter.removeAll,
    resetMembersState(state, action) {
      if (state.status !== 'idle') state.status = 'idle';
      if (state.error !== null) state.error = null;
    },
    resetMemberStateById(state, action) {
      const memberId = action.payload;
      membersAdapter.updateOne(state, {
        id: memberId,
        changes: {status: 'idle', error: null},
      });
    },
    resetMemberRequiredReloadById(action, state) {
      const memberId = action.payload;
      membersAdapter.updateOne(state, {
        id: memberId,
        changes: {requiredReload: false},
      });
    },
  },
  extraReducers: {
    [fetchMembers.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchMembers.fulfilled]: (state, action) => {
      if (state.status === 'loading') {
        membersAdapter.upsertMany(state, action);
        state.status = 'succeeded';
      }
      state.requiredReload = false;
    },
    [fetchMembers.rejected]: (state, action) => {
      state.status = 'failed';
      console.log('fetchMembers error:', action.error.message);
      state.error = action.error.message;
    },
    [addNewMember.pending]: (state, action) => {
      state.extras.add.status = 'creating';
      state.extras.add.error = null;
    },
    [addNewMember.fulfilled]: (state, action) => {
      // membersAdapter.addOne(state, action.payload);
      console.log('addNewMember.fulfilled:', action.payload);
      state.extras.add.status = 'created';
      state.requiredReload = true;
    },
    [addNewMember.rejected]: (state, action) => {
      state.extras.add.status = 'failed';
      console.log('addNewMember error:', action.error.message);
      state.extras.add.error = action.error.message;
    },
    [updateMember.pending]: (state, action) => {
      const id = action.meta.arg.id;
      membersAdapter.updateOne(state, {
        id,
        changes: {
          status: 'loading',
          error: null,
        },
      });
    },
    [updateMember.fulfilled]: (state, action) => {
      const id = action.meta.arg.id;
      membersAdapter.updateOne(state, {
        id,
        changes: {
          status: 'succeeded',
          error: null,
          requiredReload: true,
        },
      });
      state.requiredReload = true;
      console.log('updateMember.fulfilled:', action.payload);
    },
    [updateMember.rejected]: (state, action) => {
      const id = action.meta.arg.id;
      membersAdapter.updateOne(state, {
        id,
        changes: {
          status: 'failed',
          error: action.error.message,
        },
      });
      console.log('updateMember error:', action.error.message);
    },
    [deleteMember.pending]: (state, action) => {
      const id = action.meta.arg.id;
      membersAdapter.updateOne(state, {
        id,
        changes: {
          status: 'deleting',
          error: null,
        },
      });
    },
    [deleteMember.fulfilled]: (state, action) => {
      const id = action.meta.arg.id;
      membersAdapter.updateOne(state, {
        id,
        changes: {
          status: 'deleted',
          error: null,
        },
      });
      state.requiredReload = true;
    },
    [deleteMember.rejected]: (state, action) => {
      const id = action.meta.arg.id;
      membersAdapter.updateOne(state, {
        id,
        changes: {
          status: 'failed',
          error: action.error.message,
        },
      });
      console.log('deleteMember error:', action.error.message);
    },
  },
});

export const selectMembersRequiredReload = state =>
  state.members.requiredReload;
export const selectMembersStatus = state => state.members.status;
export const selectMembersError = state => state.members.error;
export const selectMembersStatusLoading = state =>
  Boolean(state.members.status === 'loading');
export const selectMembersStatusSucceeded = state =>
  Boolean(state.members.status === 'succeeded');

export const selectMembersExtras = state => state.members.extras;
export const selectMembersExtrasAddStatus = state =>
  state.members.extras.add.status;
export const selectMembersExtrasAddError = state =>
  state.members.extras.add.error;

export const {
  resetAddMemberState,
  resetMembersExtras,
  membersCleared,
  resetMembersState,
  resetMemberStateById,
  resetMemberRequiredReloadById,
} = membersSlice.actions;

export default membersSlice.reducer;

export const reloadAllMembers = () => async dispatch => {
  dispatch(resetMembersState());
  dispatch(resetMembersExtras());
  dispatch(membersCleared());
  dispatch(fetchMembers());
};

export const resetMembers = () => async dispatch => {
  dispatch(resetMembersState());
  dispatch(resetMembersExtras());
  dispatch(membersCleared());
};
