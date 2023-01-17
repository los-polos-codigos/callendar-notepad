import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from 'icons/small_logo_text.svg';
import { Button } from 'components/Button/Button';

import { ResendSmsButton } from 'components/ResendSmsButton/ResendSmsButton';
import PropsType from 'prop-types';
import { useLoginCodeView } from 'views/LoginCodeView/useLoginCodeView';
import theme from 'theme/theme';
import { styles } from './LoginCodeView.styles';

export const LoginCodeView = ({ navigation, route }) => {
  const { phone } = route.params;

  const { resendSms, buttonStatus, onSubmit, code, setCode, isInputFocused, setIsInputFocused } =
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
          <TextInput
            style={styles.inputCode(isInputFocused)}
            placeholderTextColor={theme.colors.gray_30}
            placeholder="0000"
            maxLength={4}
            onChangeText={setCode}
            value={code}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <ResendSmsButton onClick={resendSms} />
        </View>
        <Button
          text="Potwierdź"
          type={buttonStatus}
          onClick={() => code.length === 4 && onSubmit()}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

LoginCodeView.propTypes = {
  route: PropsType.any.isRequired,
  navigation: PropsType.any.isRequired,
};
