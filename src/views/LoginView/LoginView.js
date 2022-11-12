import React from 'react';
import { View } from 'react-native';

import Logo from 'icons/small_logo_text.svg';

import { styles } from './LoginVIew.styles';

// TODO: dodać views jako absolute import

export const LoginView = () => (
  <View style={styles.mainWrapper}>
    <Logo />
  </View>
);
