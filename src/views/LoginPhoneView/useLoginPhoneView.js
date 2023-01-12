import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { routes } from 'utils/routes';
import { request } from 'api/api';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from 'core/auth/selectors';
import { errorsActions } from 'core/errors/reducers';
import { apiStatuses } from 'utils/constants/apiStatuses';
import { endpoints } from 'api/endpoints';

export const useLoginPhoneView = (navigation) => {
  const buttonRef = useRef();

  const dispatch = useDispatch();

  const { deviceId } = useSelector(authSelector);

  const [phoneNumberValue, setPhoneNumberValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [status, setStatus] = useState(apiStatuses.DEFAULT);

  const isPhoneNumberEntered = phoneNumberValue.length === 11;

  const buttonType = () => {
    if (status === apiStatuses.LOADING) return 'loading';
    if (!isPhoneNumberEntered) return 'disabled';
  };

  useEffect(() => {
    if (isPhoneNumberEntered) Keyboard.dismiss();
  }, [isPhoneNumberEntered]);

  const onChangePhoneNumber = useCallback(
    (text) => {
      const text2 = text
        .split('')
        .filter((e) => e !== ' ')
        .join('');
      const first3 = text2.slice(0, 3);
      const second3 = text2.slice(3, 6);
      const third3 = text2.slice(6, 9);

      const res = [];

      if (text.length > phoneNumberValue.length) {
        res.push(first3);

        if (text2.length > 2) res.push(' ', second3);
        if (text2.length > 5) res.push(' ', third3);
      } else {
        res.push(first3);

        if (text2.length > 3) res.push(' ', second3);
        if (text2.length > 6) res.push(' ', third3);
      }

      setPhoneNumberValue(res.join(''));
    },
    [phoneNumberValue]
  );

  const sendPhoneNumber = useCallback(async () => {
    try {
      setStatus(apiStatuses.LOADING);

      await request('post', endpoints.AUTH_PHONE, {
        phone: `+48${phoneNumberValue.replace(/\s/g, '')}`,
        deviceId,
      });

      navigation.navigate(routes.LOGIN_CODE, {
        phone: `+48${phoneNumberValue.replace(/\s/g, '')}`,
      });
      setStatus(apiStatuses.DEFAULT);
      setPhoneNumberValue('');
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
      setStatus(apiStatuses.DEFAULT);
    }
  }, [phoneNumberValue, deviceId]);

  return {
    phoneNumberValue,
    isInputFocused,
    onChangePhoneNumber,
    setIsInputFocused,
    buttonType,
    sendPhoneNumber,
    buttonRef,
  };
};
