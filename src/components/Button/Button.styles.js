import { StyleSheet } from 'react-native';
import theme from 'theme/theme';

export const styles = ({ type }) =>
  StyleSheet.create({
    pressableButton: {
      width: '100%',
      height: 54,
      borderRadius: 8,
      backgroundColor: type ? theme.colors.gray_20 : theme.colors.blue,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    textButton: {
      color: type ? theme.colors.gray_30 : theme.colors.white_100,
      fontSize: 15,
      fontWeight: '700',
      marginLeft: type === 'loading' ? 10 : 0,
    },
  });
