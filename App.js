import React from 'react';

import {store, persistor, clearAsyncStorage} from './src/models/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Router from './src/router/Router';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    // @ts-expect-error QueryClient has different types in react-query and @tanstack/react-query but we are good here
    const result = addPlugin({queryClient});

    console.log('React Query DevTools plugin added', {result});
  });
}

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
