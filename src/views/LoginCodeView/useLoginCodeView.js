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
import { routes } from 'utils/routes';

export const useLoginCodeView = (phone, navigation) => {
  const itemsRef = useRef([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const { deviceId } = useSelector(authSelector);

  const dispatch = useDispatch();

  const [status, setStatus] = useState(apiStatuses.DEFAULT);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      'code-0': '',
      'code-1': '',
      'code-2': '',
      'code-3': '',
    },
  });

  const onSubmit = async (data) => {
    const code = Object.entries(data)
      .map(([, v]) => v)
      .join('');

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
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={(event) => {
                onBlur(event);
                setIsFocused(false);
              }}
              onChangeText={(text) => {
                if (text !== '' && index !== 3) itemsRef.current[index + 1].focus();
                if (text !== '' && index === 3) Keyboard.dismiss();
                onChange(text);
              }}
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
