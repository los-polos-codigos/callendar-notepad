// eslint-disable-next-line import/no-unresolved
import { REACT_APP_BASE_API, REACT_APP_MOCKED } from '@env';

const addBaseUrl = (url) => {
  if (REACT_APP_MOCKED) return url;
  return `${REACT_APP_BASE_API}${url}`;
};

export const endpoints = {
  AUTH_PHONE: addBaseUrl('/auth/phone'),
};
