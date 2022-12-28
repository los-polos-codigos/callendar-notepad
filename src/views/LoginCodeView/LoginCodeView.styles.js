import { Dimensions, StyleSheet } from 'react-native';
import theme from 'theme/theme';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  mainWrapper: {
    width: '100%',
    height,
    maxHeight: height,
  },
  insideWrapper: {
    height,
    backgroundColor: theme.colors.white_100,
    ...theme.padding([28, 39, 70, 39]),
  },
  contentWrapper: {
    flex: 1,
    paddingTop: '40%',
  },
  smsCodeTextBellow: {
    fontSize: 16,
    fontWeight: '700',
  },
  smsCodeInput: (isFocused) => ({
    width: 58,
    height: 73,
    borderRadius: 8,
    backgroundColor: theme.colors.gray_20,
    marginRight: 10,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    borderColor: theme.colors.blue,
    borderWidth: isFocused ? 1 : 0,
  }),
  smsCodeInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 17,
  },
});
