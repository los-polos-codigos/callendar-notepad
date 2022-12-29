import { createServer } from 'miragejs';
import {
  authPhone,
  authCode,
  authTest,
  authRefreshToken,
  authTestFail,
  authTestPass,
} from './auth';

export default createServer({
  routes() {
    authPhone(this);
    authCode(this);
    authTest(this);
    authTestFail(this);
    authTestPass(this);
    authRefreshToken(this);
  },
});
