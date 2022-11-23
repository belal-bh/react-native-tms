import React from 'react';

import {store, persistor, clearAsyncStorage} from './src/models/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Router from './src/router/Router';

import {QueryClient, QueryClientProvider} from 'react-query';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  // clearAsyncStorage();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
