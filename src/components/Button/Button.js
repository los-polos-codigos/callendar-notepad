import React from 'react';
import { Pressable, Text } from 'react-native';
import PropTypes from 'prop-types';
import { LoadingIcon } from 'components/LoadingIcon/LoadingIcon';
import theme from 'theme/theme';
import { styles } from './Button.styles';

export const Button = ({ text, type, onClick }) => {
  const styleModified = styles({ type });

  return (
    <Pressable style={styleModified.pressableButton} onPress={onClick}>
      {type === 'loading' && (
        <LoadingIcon bgColor={theme.colors.gray_20} color={theme.colors.gray_30} />
      )}
      <Text style={styleModified.textButton}>{text}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['disabled', 'loading']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  text: '',
  type: undefined,
  onClick: () => ({}),
};
