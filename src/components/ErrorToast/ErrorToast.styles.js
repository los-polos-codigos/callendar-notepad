import { Dimensions, StyleSheet } from 'react-native';
import theme from 'theme/theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.red_70,
    width: width - 30,
    position: 'absolute',
    height: 100,
    zIndex: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...theme.padding([0, 24, 0, 24]),
    left: 15,
    borderRadius: 8,
  },
  text: {
    color: theme.colors.white_100,
    fontWeight: '500',
    maxWidth: '90%',
    fontSize: 20,
  },
});
