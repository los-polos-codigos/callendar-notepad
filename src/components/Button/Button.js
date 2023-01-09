import React from 'react';
import { Pressable, Text } from 'react-native';
import PropTypes from 'prop-types';
import { LoadingIcon } from 'components/LoadingIcon/LoadingIcon';
import theme from 'theme/theme';
import { styles } from './Button.styles';

export const Button = ({ text, type, onClick, size }) => {
  const styleModified = styles({ type, size });

  return (
    <Pressable style={styleModified.pressableButton} onPress={onClick}>
      {type === 'loading' && (
        <LoadingIcon
          bgColor={theme.colors.gray_20}
          color={theme.colors.gray_30}
          size={size === 'small' ? 15 : undefined}
        />
      )}
      <Text style={styleModified.textButton}>{text}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['disabled', 'loading']),
  size: PropTypes.oneOf(['small', 'regular']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  text: '',
  type: undefined,
  onClick: () => ({}),
  size: 'regular',
};
