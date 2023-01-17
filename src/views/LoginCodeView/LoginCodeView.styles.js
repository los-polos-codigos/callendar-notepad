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
  smsCodeInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 17,
  },
  inputCode: (isFocused) => ({
    width: '100%',
    height: 54,
    backgroundColor: theme.colors.gray_20,
    marginTop: 34,
    paddingLeft: 16,
    fontSize: 24,
    fontWeight: '700',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.blue,
    borderColor: theme.colors.blue,
    borderWidth: isFocused ? 1 : 0,
  }),
});
