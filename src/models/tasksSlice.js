import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import {
  API_URL_AUTH_LOGIN,
  API_URL_AUTH_REGISTER,
  API_URL_TASK,
  API_URL_MEMBER,
  WAITING_TIME,
} from '../config';
import {
  getTaskObjectListSerializable,
  getTaskObjectSerializable,
} from '../helpers/taskHelpers';
import {wait} from '../helpers/helpers';

import {selectUserToken} from './userSlice';
import {store} from './store';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
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
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const res = await response.json();
  // console.log('fetchTasks:', res);
  return getTaskObjectListSerializable(res.tasks);
});

export const addNewTask = createAsyncThunk('tasks/addNewTask', async data => {
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
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const res = await response.json();
  // return getTaskObjectSerializable(res);
  return res;
});

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({id, data}) => {
    const token = selectUserToken(store.getState());
    // console.log('token:', token);
    console.log(
      `id=${id}, data=${data?.title ? data.title : data?.description}`,
    );
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
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const res = await response.json();
    // return getTaskObjectSerializable(res);
    return res;
  },
);

export const deleteTask = createAsyncThunk('tasks/deleteTask', async ({id}) => {
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
    throw new Error(`${response.status} ${response.statusText}`);
  }
  // console.log(response);
});

const tasksAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

export const {
  selectAll: selectAllTasks,
  selectIds: selectTaskIds,
  selectById: selectTaskById,
} = tasksAdapter.getSelectors(state => state.tasks);

export const selectTaskStatusById = (state, taskId) => {
  const task = selectTaskById(state, taskId);
  return task.status;
};

export const selectTaskErrorById = (state, taskId) => {
  const task = selectTaskById(state, taskId);
  return task.error;
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksAdapter.getInitialState({
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
    resetAddTaskState(state, action) {
      state.extras.add.status = 'idle';
      state.extras.add.error = null;
    },
    resetTasksExtras(state, action) {
      state.extras.add.status = 'idle';
      state.extras.add.error = null;
    },
    tasksCleared: tasksAdapter.removeAll,
    resetTasksState(state, action) {
      if (state.status !== 'idle') state.status = 'idle';
      if (state.error !== null) state.error = null;
    },
    resetTaskStateById(state, action) {
      const taskId = action.payload;
      tasksAdapter.updateOne(state, {
        id: taskId,
        changes: {status: 'idle', error: null},
      });
    },
    resetTaskRequiredReloadById(state, action) {
      const taskId = action.payload;
      tasksAdapter.updateOne(state, {
        id: taskId,
        changes: {requiredReload: false},
      });
    },
  },
  extraReducers: {
    [fetchTasks.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTasks.fulfilled]: (state, action) => {
      if (state.status === 'loading') {
        tasksAdapter.upsertMany(state, action);
        state.status = 'succeeded';
      }
      state.requiredReload = false;
    },
    [fetchTasks.rejected]: (state, action) => {
      state.status = 'failed';
      console.log('fetchTasks error:', action.error);
      state.error = action.error.message;
    },
    [addNewTask.pending]: (state, action) => {
      state.extras.add.status = 'creating';
      state.extras.add.error = null;
    },
    [addNewTask.fulfilled]: (state, action) => {
      // tasksAdapter.addOne(state, action.payload);
      console.log('addNewTask.fulfilled:', action.payload);
      state.extras.add.status = 'created';
      state.requiredReload = true;
    },
    [addNewTask.rejected]: (state, action) => {
      state.extras.add.status = 'failed';
      console.log('addNewTask error:', action.error);
      state.extras.add.error = action.error.message;
    },
    [updateTask.pending]: (state, action) => {
      const id = action.meta.arg.id;
      tasksAdapter.updateOne(state, {
        id,
        changes: {
          status: 'loading',
          error: null,
        },
      });
    },
    [updateTask.fulfilled]: (state, action) => {
      const id = action.meta.arg.id;
      console.log('id======================', id);
      tasksAdapter.updateOne(state, {
        id,
        changes: {
          status: 'succeeded',
          error: null,
          requiredReload: true,
        },
      });
      state.requiredReload = true;
      console.log('updateTask.fulfilled:', action.payload);
    },
    [updateTask.rejected]: (state, action) => {
      const id = action.meta.arg.id;
      tasksAdapter.updateOne(state, {
        id,
        changes: {
          status: 'failed',
          error: action.error.message,
        },
      });
      console.log('updateTask error:', action.error);
    },
    [deleteTask.pending]: (state, action) => {
      const id = action.meta.arg.id;
      tasksAdapter.updateOne(state, {
        id,
        changes: {
          status: 'deleting',
          error: null,
        },
      });
    },
    [deleteTask.fulfilled]: (state, action) => {
      const id = action.meta.arg.id;
      tasksAdapter.updateOne(state, {
        id,
        changes: {
          status: 'deleted',
          error: null,
        },
      });
      // tasksAdapter.removeOne(state, id); // this line cause the problem
      state.requiredReload = true;
    },
    [deleteTask.rejected]: (state, action) => {
      const id = action.meta.arg.id;
      tasksAdapter.updateOne(state, {
        id,
        changes: {
          status: 'failed',
          error: action.error.message,
        },
      });
      console.log('deleteTask error:', action.error);
    },
  },
});

export const selectTasksRequiredReload = state => state.tasks.requiredReload;
export const selectTasksStatus = state => state.tasks.status;
export const selectTasksError = state => state.tasks.error;
export const selectTasksStatusLoading = state =>
  Boolean(state.tasks.status === 'loading');
export const selectTasksStatusSucceeded = state =>
  Boolean(state.tasks.status === 'succeeded');

export const selectTasksExtras = state => state.tasks.extras;
export const selectTasksExtrasAddStatus = state =>
  state.tasks.extras.add.status;
export const selectTasksExtrasAddError = state => state.tasks.extras.add.error;

export const selectTaskIdsByMemberId = (state, memberId) => {
  const tasks = selectAllTasks(state);
  const initialTaskIds = [];
  const taskIds = tasks.reduce((pre, cur) => {
    if (cur.memberId === memberId) pre.push(cur.id);
    return pre;
  }, initialTaskIds);
  console.log(taskIds);
  return taskIds;
};

export const selectNumberOfTasksByMemberId = (state, memberId) => {
  const tasks = selectAllTasks(state);
  let initialCount = 0;
  const numberOfTasks = tasks.reduce((pre, cur) => {
    if (cur.memberId === memberId) pre++;
    return pre;
  }, initialCount);
  console.log(numberOfTasks);
  return numberOfTasks;
};

export const {
  resetAddTaskState,
  resetTasksExtras,
  tasksCleared,
  resetTasksState,
  resetTaskStateById,
  resetTaskRequiredReloadById,
} = tasksSlice.actions;

export default tasksSlice.reducer;

export const reloadAllTasks = () => async dispatch => {
  dispatch(resetTasksState());
  dispatch(resetTasksExtras());
  dispatch(tasksCleared());
  dispatch(fetchTasks());
};

export const resetTasks = () => dispatch => {
  dispatch(resetTasksState());
  dispatch(resetTasksExtras());
  dispatch(tasksCleared());
};
