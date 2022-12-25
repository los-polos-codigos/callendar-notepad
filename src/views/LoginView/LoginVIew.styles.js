import { StyleSheet, Dimensions } from 'react-native';
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
    ...theme.padding([28, 39, 60, 29]),
  },
  logoWrapper: {},
  contentWrapper: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 'auto',
    paddingBottom: 47,
  },
  image: {
    flex: 1,
  },
  textContent: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 56,
    textAlign: 'center',
  },
  textBlue: {
    color: theme.colors.blue,
  },
  inputWrapper: {
    display: 'flex',
    marginTop: 14,
    flexDirection: 'row',
  },
  areaCodeWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
    height: 54,
    backgroundColor: theme.colors.gray_20,
    borderRadius: 8,
  },
  areaCodeText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.gray_80,
  },
  phoneNumberInput: (isFocused) => ({
    backgroundColor: theme.colors.gray_20,
    marginLeft: 10,
    borderRadius: 8,
    height: 54,
    flex: 1,
    ...theme.padding([18, 18, 18, 18]),
    fontWeight: '700',
    fontSize: 16,
    borderWidth: isFocused ? 1 : 0,
    borderColor: theme.colors.blue,
  }),
  phoneNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.gray_80,
    alignSelf: 'flex-start',
    marginTop: 53,
  },
});
