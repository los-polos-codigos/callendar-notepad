import { useEffect } from 'react';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';

import { authSelector } from 'core/auth/selectors';
import { authActions } from 'core/auth/reducers';

export const useDeviceId = () => {
  const { deviceId } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!deviceId) dispatch(authActions.setDeviceId({ deviceId: uuid.v4() }));
  }, [deviceId]);
};
