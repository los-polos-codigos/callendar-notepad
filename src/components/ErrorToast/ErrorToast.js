import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { errorsSelector } from 'core/errors/selectors';
import { Pressable, Text, View } from 'react-native';

import CloseIcon from 'icons/close.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { errorsActions } from 'core/errors/reducers';
import { styles } from './ErrorToast.styles';

export const ErrorToast = () => {
  const error = useSelector(errorsSelector);
  const dispatch = useDispatch();

  console.log(error);

  const insets = useSafeAreaInsets();

  if (!error.isActive) return <></>;

  return (
    <View style={{ ...styles.wrapper, top: 15 + insets.top }}>
      {/* <Text>{error.content}</Text> */}
      <Text style={styles.text}>{error.content}</Text>
      <Pressable onPress={() => dispatch(errorsActions.hide())}>
        <CloseIcon />
      </Pressable>
    </View>
  );
};
