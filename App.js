import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// eslint-disable-next-line import/no-unresolved
import { REACT_APP_MOCKED } from '@env';
import mocks from 'utils/mocks';
import Index from './src/index';
import { PositionWrapper } from './src/layouts/positionWrapper/positionWrapper';

if (window.server) window.server.shutdown();

if (REACT_APP_MOCKED) window.server = mocks;

export default () => (
  <SafeAreaProvider>
    <PositionWrapper>
      <Index />
    </PositionWrapper>
  </SafeAreaProvider>
);
