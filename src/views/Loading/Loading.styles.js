import { Dimensions, StyleSheet } from 'react-native';
import theme from 'theme/theme';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  wrapper: {
    height,
    backgroundColor: theme.colors.white_100,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: theme.colors.blue,
  },
});
