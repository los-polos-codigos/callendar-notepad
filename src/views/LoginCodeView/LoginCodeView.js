import React from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from 'icons/small_logo_text.svg';
import { Button } from 'components/Button/Button';

import { ResendSmsButton } from 'components/ResendSmsButton/ResendSmsButton';
import PropsType from 'prop-types';
import { useLoginCodeView } from 'views/LoginCodeView/useLoginCodeView';
import { styles } from './LoginCodeView.styles';

export const LoginCodeView = ({ navigation, route }) => {
  const { phone } = route.params;

  const { itemsRef, resendSms, buttonStatus, isFormValid, handleSubmit, onSubmit, CustomInput } =
    useLoginCodeView(phone, navigation);

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
          <ResendSmsButton onClick={resendSms} />
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

LoginCodeView.propTypes = {
  route: PropsType.any.isRequired,
  navigation: PropsType.any.isRequired,
};
