import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { mount } from 'cypress/react';

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
      <Text>App</Text>
      <StatusBar />
    </View>
  );
}
