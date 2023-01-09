import { StyleSheet } from 'react-native';

export const styles = ({ bgColor, color, rotateAnimation, size }) =>
  StyleSheet.create({
    mainWrapper: {
      width: size,
      height: size,
      borderRadius: 1000,
      backgroundColor: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      transform: [{ rotate: rotateAnimation }],
    },
    inside: {
      width: '60%',
      height: '60%',
      backgroundColor: bgColor,
      borderRadius: 100,
    },
    outside: {
      backgroundColor: bgColor,
      width: '50%',
      height: '50%',
      left: 0,
      top: 0,
      position: 'absolute',
      borderRadius: 100,
    },
  });
