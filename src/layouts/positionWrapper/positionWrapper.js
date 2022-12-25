import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import PropTypes from 'prop-types';

export const PositionWrapper = ({ children }) => {
  const insets = useSafeAreaInsets();

  const viewStyles = {
    flex: 1,
    height: '100%',
    paddingTop: insets.top,
  };

  return <View style={viewStyles}>{children}</View>;
};

PositionWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
