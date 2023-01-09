import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'components/Button/Button';
import PropsType from 'prop-types';

export const ResendSmsButton = ({ onClick }) => {
  const DEFAULT_TIME_RESEND_SMS = 5;

  const [timeLeftToResendSms, setTimeLeftToResendSms] = useState(DEFAULT_TIME_RESEND_SMS);
  const [buttonStatus, setButtonStatus] = useState('disabled');

  const startTimeCountDown = useCallback(() => {
    setTimeLeftToResendSms(DEFAULT_TIME_RESEND_SMS);
    const counterDown = setInterval(() => {
      setTimeLeftToResendSms((prev) => {
        if (prev <= 1) {
          setButtonStatus(undefined);
          clearInterval(counterDown);
          return prev - 1;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const resendSms = useCallback(() => {
    if (onClick) onClick();
    setButtonStatus('disabled');
    startTimeCountDown();
  }, [onClick]);

  useEffect(() => {
    startTimeCountDown();
  }, []);

  return (
    <View style={{ marginTop: 47 }}>
      <Button
        text={`Wyślij ponowanie kod ${
          timeLeftToResendSms !== 0 ? `( ${timeLeftToResendSms}s )` : ''
        }`}
        type={buttonStatus}
        onClick={!buttonStatus ? resendSms : undefined}
        size="small"
      />
    </View>
  );
};

ResendSmsButton.propTypes = {
  onClick: PropsType.func.isRequired,
};
