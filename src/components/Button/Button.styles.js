import { StyleSheet } from 'react-native';
import theme from 'theme/theme';

export const styles = ({ type, size }) =>
  StyleSheet.create({
    pressableButton: {
      width: '100%',
      height: size === 'small' ? 34 : 54,
      maxHeight: '100%',
      borderRadius: 8,
      backgroundColor: type ? theme.colors.gray_20 : theme.colors.blue,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: size === 'small' ? 16 : 0,
      justifyContent: size === 'small' ? 'flex-start' : 'center',
      flexDirection: 'row',
    },
    textButton: {
      color: type ? theme.colors.gray_30 : theme.colors.white_100,
      fontSize: 15,
      fontWeight: '700',
      marginLeft: type === 'loading' ? 10 : 0,
    },
  });
