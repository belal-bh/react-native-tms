import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

import userReducer from './userSlice';
import tasksReducer from './tasksSlice';
import membersReducer from './membersSlice';

const rootReducer = combineReducers({
  user: persistReducer(
    {
      key: 'user',
      storage: AsyncStorage,
      blacklist: ['status', 'error', 'user.isLoggedIn', 'token'],
    },
    userReducer,
  ),
  tasks: persistReducer(
    {
      key: 'tasks',
      storage: AsyncStorage,
      blacklist: ['status', 'error', 'extras'],
    },
    tasksReducer,
  ),
  members: persistReducer(
    {
      key: 'members',
      storage: AsyncStorage,
      blacklist: ['status', 'error', 'extras'],
    },
    membersReducer,
  ),
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error(e);
  }
  console.log('Done clearAsyncStorage.');
};
