import { createServer } from 'miragejs';
import { authPhone, authCode } from './auth';

export default createServer({
  routes() {
    authPhone(this);
    authCode(this);
  },
});
