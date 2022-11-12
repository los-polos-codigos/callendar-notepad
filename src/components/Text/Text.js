import React from 'react';
import PropTypes from 'prop-types';

import { Text as TextNative } from 'react-native';

// EXAMPLE TEXT COMPONENT - TO DELETE IN FEATURE
export const Text = ({ text }) => <TextNative>{text}</TextNative>;

Text.propTypes = {
  text: PropTypes.string.isRequired,
};
