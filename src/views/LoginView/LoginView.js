import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Text, TextInput, View } from 'react-native';
import Logo from 'icons/small_logo_text.svg';
import { Button } from 'components/Button/Button';
import Avatar from 'utils/images/login_view_avatar.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import theme from 'theme/theme';
import PropTypes from 'prop-types';
import { styles } from './LoginVIew.styles';

const BlueText = ({ children }) => <Text style={styles.textBlue}>{children}</Text>;

BlueText.propTypes = {
  children: PropTypes.string.isRequired,
};

export const LoginView = () => {
  const [phoneNumberValue, setPhoneNumberValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const isPhoneNumberEntered = phoneNumberValue.length === 11;

  useEffect(() => {
    if (isPhoneNumberEntered) Keyboard.dismiss();
  }, [isPhoneNumberEntered]);

  const onChangePhoneNumber = (text) => {
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
  };

  return (
    <KeyboardAwareScrollView style={styles.mainWrapper} behavior="height" enabled keyboardVerticalOffset={100}>
      <View style={styles.insideWrapper}>
        <Logo />
        <View style={styles.contentWrapper}>
          <Image source={Avatar} style={styles.image} resizeMode="contain" />
          <Text style={styles.textContent}>
            <BlueText>Przechowuj</BlueText>, <BlueText>planuj</BlueText> oraz <BlueText>zarządzaj</BlueText> {'\n'}
            wszystkimi zajęciami {'\n'} z jednego miejsca
          </Text>
          <Text style={styles.phoneNumberText}>Podaj swój number telefonu</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.areaCodeWrapper}>
              <Text style={styles.areaCodeText}>+48</Text>
            </View>
            <TextInput
              keyboardType="numeric"
              style={styles.phoneNumberInput(isInputFocused)}
              placeholder="000 000 000"
              value={phoneNumberValue}
              placeholderTextColor={theme.colors.gray_05}
              onChangeText={onChangePhoneNumber}
              maxLength={11}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </View>
        </View>
        <Button text="Dalej" />
      </View>
    </KeyboardAwareScrollView>
  );
};
