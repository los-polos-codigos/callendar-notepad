import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from 'core/auth/selectors';
import { apiStatuses } from 'utils/constants/apiStatuses';
import { Keyboard } from 'react-native';
import { request } from 'api/api';
import { endpoints } from 'api/endpoints';
import { authActions } from 'core/auth/reducers';
import { authStatuses } from 'hooks/useAuth';
import { errorsActions } from 'core/errors/reducers';
import { routes } from 'utils/routes';

export const useLoginCodeView = (phone, navigation) => {
  const dispatch = useDispatch();

  const { deviceId } = useSelector(authSelector);

  const [status, setStatus] = useState(apiStatuses.DEFAULT);
  const [code, setCode] = useState('');

  const [isInputFocused, setIsInputFocused] = useState(false);

  const onSubmit = async () => {
    try {
      const responseData = await request('post', endpoints.AUTH_CODE, {
        phone: `${phone}`,
        code,
        deviceId,
      });
      dispatch(authActions.loginSuccess(responseData));
      setStatus(authStatuses.DEFAULT);
    } catch (err) {
      if (err?.response?.status === 429) {
        dispatch(errorsActions.show({ content: 'Za duża ilość prób!' }));
        navigation.navigate(routes.LOGIN_PHONE_NUMBER);
      } else {
        dispatch(errorsActions.show({ content: 'Błędny kod!' }));
      }
      setStatus(authStatuses.DEFAULT);
    }
  };

  const resendSms = useCallback(async () => {
    try {
      await request('post', endpoints.AUTH_PHONE, {
        phone,
        deviceId,
      });
    } catch (err) {
      const leftTimeInSeconds = err?.response?.data?.timeLeft;

      if (leftTimeInSeconds) {
        const minutesLeft = Math.floor(leftTimeInSeconds / 60);
        dispatch(
          errorsActions.show({
            content: `Za dużo nieudanych prób logowania, poczekaj: ${minutesLeft} min`,
          })
        );
      } else {
        dispatch(errorsActions.show({ content: 'Coś poszło nie tak!' }));
      }
    }
  }, [phone, deviceId]);

  const buttonStatus = useMemo(() => {
    if (status === apiStatuses.LOADING) return 'loading';
    if (code.length === 4) {
      Keyboard.dismiss();
      return undefined;
    }
    return 'disabled';
  }, [code, status]);

  return {
    resendSms,
    buttonStatus,
    onSubmit,
    code,
    setCode,
    isInputFocused,
    setIsInputFocused,
  };
};
