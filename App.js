import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// eslint-disable-next-line import/no-unresolved
import { REACT_APP_MOCKED } from '@env';

import { Provider } from 'react-redux';

import { PositionWrapper } from 'layouts/positionWrapper/positionWrapper';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persist } from './src/core/store';
import mocks from './src/api/mocks';
import Index from './src/index';

if (window.server) window.server.shutdown();

if (REACT_APP_MOCKED) window.server = mocks;

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persist}>
      <SafeAreaProvider>
        <PositionWrapper>
          <Index />
        </PositionWrapper>
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);
