import React from 'react';

import { routes } from 'utils/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginPhoneView } from './views/LoginPhoneView';
import { LoginCodeView } from './views/LoginCodeView';

const Index = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        // initialRouteName={routes.LOGIN_PHONE_NUMBER}
      >
        <Stack.Screen name={routes.LOGIN_PHONE_NUMBER} component={LoginPhoneView} />
        <Stack.Screen name={routes.LOGIN_CODE} component={LoginCodeView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
