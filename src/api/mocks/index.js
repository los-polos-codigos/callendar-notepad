import { createServer } from 'miragejs';
// eslint-disable-next-line import/no-unresolved
import { REACT_APP_MOCKED } from '@env';
import { authPhone, authCode, tokenVerify } from './auth';

export default () => {
  if (REACT_APP_MOCKED === 'true') {
    return createServer({
      routes() {
        authPhone(this);
        authCode(this);
        tokenVerify(this);
      },
    });
  }
  return () => ({});
};
