import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './Loading.styles';

export const Loading = () => (
  <View style={styles.wrapper}>
    <Text style={styles.text}>Trwa ładowanie</Text>
  </View>
);
