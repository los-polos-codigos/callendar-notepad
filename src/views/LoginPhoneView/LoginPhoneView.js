import React, { useEffect } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import Logo from 'icons/small_logo_text.svg';
import { Button } from 'components/Button/Button';
import Avatar from 'utils/images/login_view_avatar.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import theme from 'theme/theme';
import PropTypes from 'prop-types';
import { styles } from './LoginPhoneVIew.styles';
import { useLoginPhoneView } from './useLoginPhoneView';
import { request } from '../../api/api';

const BlueText = ({ children }) => <Text style={styles.textBlue}>{children}</Text>;

BlueText.propTypes = {
  children: PropTypes.string.isRequired,
};

export const LoginPhoneView = ({ navigation }) => {
  const {
    phoneNumberValue,
    isInputFocused,
    onChangePhoneNumber,
    setIsInputFocused,
    buttonType,
    sendPhoneNumber,
    buttonRef,
  } = useLoginPhoneView(navigation);

  const getRequest = async () => {
    const res = await request('get', '/auth/testFail');
    console.log(res);
  };

  useEffect(() => {
    getRequest();
  }, []);

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
          <Image source={Avatar} style={styles.image} resizeMode="contain" />
          {/* THIS ELEMENT HELP TO LOSE FOCUS AFTER HIDDEN KEYBOARD */}
          <View style={{ position: 'absolute', opacity: 0 }}>
            <Text>x</Text>
          </View>
          <Text style={styles.textContent} ref={buttonRef}>
            <BlueText>Przechowuj</BlueText>, <BlueText>planuj</BlueText> oraz{' '}
            <BlueText>zarządzaj</BlueText> {'\n'}
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
        <Button
          type={buttonType()}
          text="Dalej"
          onClick={() => !buttonType() && sendPhoneNumber()}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
LoginPhoneView.propTypes = {
  navigation: PropTypes.any.isRequired,
};
