import React from 'react';
import { StyleSheet, View } from 'react-native';
import Index from './src/index';

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
    <View style={styles.container}>
      <Index />
    </View>
  );
}
