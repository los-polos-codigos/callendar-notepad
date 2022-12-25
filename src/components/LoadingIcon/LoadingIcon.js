import React, { useEffect, useRef } from 'react';
import PropsType from 'prop-types';
import theme from 'theme/theme';
import { styles } from 'components/LoadingIcon/LoadingIcon.styles';
import { Animated, Easing, View } from 'react-native';

export const LoadingIcon = ({ color, bgColor }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 2,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const spin = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const stylesModified = styles({ rotateAnimation: spin, color, bgColor });

  return (
    <Animated.View style={stylesModified.mainWrapper}>
      <View style={stylesModified.inside} />
      <View style={stylesModified.outside} />
    </Animated.View>
  );
};

LoadingIcon.propTypes = {
  color: PropsType.string,
  bgColor: PropsType.string,
};

LoadingIcon.defaultProps = {
  color: theme.colors.black_100,
  bgColor: theme.colors.white_100,
};
