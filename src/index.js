import React from 'react';
import { routes } from 'utils/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from 'views/Home/Home';
import { Loading } from 'views/Loading';
import { LoginPhoneView } from 'views/LoginPhoneView';
import { LoginCodeView } from 'views/LoginCodeView';
import { ErrorToast } from 'components/ErrorToast/ErrorToast';
import { useDeviceId } from 'hooks/useDeviceId';
import { authStatuses, useAuth } from './hooks/useAuth';

const Index = () => {
  const Stack = createNativeStackNavigator();

  useDeviceId();

  const status = useAuth();

  return (
    <>
      {status === authStatuses.LOADING && <Loading />}
      <ErrorToast />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {status === authStatuses.AUTHORIZED ? (
            <Stack.Screen name={routes.HOME} component={Home} />
          ) : (
            <>
              <Stack.Screen name={routes.LOGIN_PHONE_NUMBER} component={LoginPhoneView} />
              <Stack.Screen name={routes.LOGIN_CODE} component={LoginCodeView} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Index;
