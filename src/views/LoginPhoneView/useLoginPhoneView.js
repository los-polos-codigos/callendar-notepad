import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { routes } from 'utils/routes';

const statuses = {
  DEFAULT: 'default',
  LOADING: 'loading',
  SUCCESS: 'success',
};

export const useLoginPhoneView = (navigation) => {
  const buttonRef = useRef();

  const [phoneNumberValue, setPhoneNumberValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [status, setStatus] = useState(statuses.DEFAULT);

  const isPhoneNumberEntered = phoneNumberValue.length === 11;

  const buttonType = () => {
    if (status === statuses.LOADING) return 'loading';
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

  const sendPhoneNumber = async () => {
    setStatus(statuses.LOADING);
    const response = await fetch('/auth/phone', { method: 'post' });

    if (response.status === 200) {
      navigation.navigate(routes.LOGIN_CODE);
      setStatus(statuses.DEFAULT);
      setPhoneNumberValue('');
    }
  };

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
