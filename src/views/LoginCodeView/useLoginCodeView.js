import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from 'core/auth/selectors';
import { apiStatuses } from 'utils/constants/apiStatuses';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, TextInput } from 'react-native';
import { request } from 'api/api';
import { endpoints } from 'api/endpoints';
import { authActions } from 'core/auth/reducers';
import { authStatuses } from 'hooks/useAuth';
import { errorsActions } from 'core/errors/reducers';
import { styles } from 'views/LoginCodeView/LoginCodeView.styles';

export const useLoginCodeView = (phone) => {
  const itemsRef = useRef([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const { deviceId } = useSelector(authSelector);

  const dispatch = useDispatch();

  const [status, setStatus] = useState(apiStatuses.DEFAULT);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm({
    defaultValues: {
      'code-0': '',
      'code-1': '',
      'code-2': '',
      'code-3': '',
    },
  });

  useEffect(() => {
    watch((data, { name }) => {
      const [, code] = name.split('-');
      if (data[name] !== '' && +code === 3) Keyboard.dismiss();
      else if (data[name] !== '') {
        setTimeout(() => {
          itemsRef.current[+code + 1].focus();
        });
      }
    });
  }, []);

  const onSubmit = async (data) => {
    const code = Object.entries(data)
      .map(([, v]) => v)
      .join('');

    try {
      const responseData = await request('post', endpoints.AUTH_CODE, {
        phone: `+48${phone}`,
        code,
        deviceId,
      });
      dispatch(authActions.loginSuccess(responseData));
      setStatus(authStatuses.DEFAULT);
    } catch (err) {
      dispatch(errorsActions.show({ content: 'Wytąpił nieoczekiwany błąd' }));
      setStatus(authStatuses.DEFAULT);
    }
  };

  useEffect(() => {
    setIsFormValid(isValid);
  }, [isValid]);

  const CustomInput = useCallback(
    // eslint-disable-next-line react/prop-types,react/no-unstable-nested-components
    React.forwardRef(({ index }, ref) => {
      const [isFocused, setIsFocused] = useState(false);
      return (
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              // eslint-disable-next-line no-param-reassign
              ref={(el) => (ref.current[index] = el)}
              maxLength={1}
              keyboardType="numeric"
              style={styles.smsCodeInput(isFocused)}
              onFocus={() => setIsFocused(true)}
              onBlur={(event) => {
                onBlur(event);
                setIsFocused(false);
              }}
              onChangeText={onChange}
              value={value}
            />
          )}
          name={`code-${index}`}
        />
      );
    }),
    []
  );

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
    if (!isFormValid) return 'disabled';
    return undefined;
  }, [isFormValid, status]);

  return {
    itemsRef,
    resendSms,
    buttonStatus,
    isFormValid,
    handleSubmit,
    onSubmit,
    CustomInput,
  };
};
