import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from 'core/auth/selectors';
import { request } from 'api/api';
import { endpoints } from 'api/endpoints';

export const authStatuses = {
  DEFAULT: 'default',
  AUTHORIZED: 'authorized',
  LOADING: 'loading',
  FAIL: 'fail',
};

export const useAuth = () => {
  const { accessToken, refreshToken } = useSelector(authSelector);
  const [status, setStatus] = useState(authStatuses.DEFAULT);

  const checkToken = async () => {
    try {
      await request('post', endpoints.TOKEN_VERIFY);
      setStatus(authStatuses.AUTHORIZED);
    } catch {
      setStatus(authStatuses.FAIL);
    }
  };

  useEffect(() => {
    setStatus(authStatuses.LOADING);

    if (accessToken && refreshToken) checkToken();
    else setStatus(authStatuses.FAIL);
  }, [accessToken]);

  return status;
};
