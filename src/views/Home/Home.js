import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'components/Button/Button';
import { useDispatch } from 'react-redux';
import { authActions } from 'core/auth/reducers';

export const Home = () => {
  const dispatch = useDispatch();

  return (
    <View>
      <Text style={{ fontSize: 40 }}>HOME</Text>

      <Button text="logout" onClick={() => dispatch(authActions.logout())} />
    </View>
  );
};
