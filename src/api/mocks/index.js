import { createServer } from 'miragejs';
import { REACT_APP_MOCKED } from '@env';
import {
  authPhone,
  authCode,
  authTest,
  authRefreshToken,
  authTestFail,
  authTestPass,
  tokenVerify,
} from './auth';

export default () => {
  if (REACT_APP_MOCKED === 'true') {
    return createServer({
      routes() {
        authPhone(this);
        authCode(this);
        authTest(this);
        authTestFail(this);
        authTestPass(this);
        authRefreshToken(this);
        tokenVerify(this);
      },
    });
  }
  return () => ({});
};
