import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Index from './src/index';
import { PositionWrapper } from './src/layouts/positionWrapper/positionWrapper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    _backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <PositionWrapper>
        <View style={styles.container}>
          <Index />
        </View>
      </PositionWrapper>
    </SafeAreaProvider>
  );
}
