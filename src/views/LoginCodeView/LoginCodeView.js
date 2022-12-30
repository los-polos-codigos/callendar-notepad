import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from 'icons/small_logo_text.svg';
import { Button } from 'components/Button/Button';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { authActions } from 'core/auth/reducers';
import { endpoints } from 'api/endpoints';
import { apiStatuses } from 'utils/constants';
import { authStatuses } from 'hooks/useAuth';
import { errorsActions } from 'core/errors/reducers';
import { styles } from './LoginCodeView.styles';

export const LoginCodeView = () => {
  const itemsRef = useRef([]);
  const [isFormValid, setIsFormValid] = useState(false);

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
      const response = request('post', endpoints.AUTH_CODE, { phone: '+48123123123', code });

      // const response = await fetch(endpoints.AUTH_CODE, {
      //   method: 'post',
      //   body: {
      //     // TODO: DODAĆ TUTAJ PRAISEWORTHY DANE Z POPRZEDNIEGO WIDOKU, MIEDZYWIDOKOWE SHEROWANIE DANYCH + Z TEGO
      //     phone: '+48123123123',
      //     code,
      //     // TODO: dodać IMEI code
      //   },
      // });

      const responseData = await response.json();

      console.log(responseData);

      dispatch(authActions.loginSuccess(responseData));
      setStatus(authStatuses.DEFAULT);
    } catch {
      console.log('error');
      dispatch(errorsActions.show({ content: 'Wytąpił nieoczekiwany błąd' }));
      setStatus(authStatuses.FAIL);
    }
  };

  useEffect(() => {
    setIsFormValid(isValid);
  }, [isValid]);

  const CustomInput = useCallback(
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

  const buttonStatus = useMemo(() => {
    if (status === apiStatuses.LOADING) return 'loading';
    if (!isFormValid) return 'disabled';
    return undefined;
  }, [isFormValid, status]);

  return (
    <KeyboardAwareScrollView
      style={styles.mainWrapper}
      behavior="height"
      enabled
      keyboardVerticalOffset={100}
    >
      <View style={styles.insideWrapper}>
        <Logo />
        <View style={styles.contentWrapper}>
          <Text style={styles.smsCodeTextBellow}>
            Wysłaliśmy do ciebie sms-a z kodem weryfikacyjnym
          </Text>
          <View style={styles.smsCodeInputWrapper}>
            {[0, 1, 2, 3].map((e, index) => (
              <CustomInput key={e} index={index} ref={itemsRef} />
            ))}
          </View>
          {/* <View style={{ height: 34, marginTop: 47 }}> */}
          {/*  <Button text="Wyślij ponowanie kod ( 10s )" /> */}
          {/* </View> */}
        </View>
        <Button
          text="Potwierdź"
          type={buttonStatus}
          onClick={() => isFormValid && handleSubmit(onSubmit)()}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
