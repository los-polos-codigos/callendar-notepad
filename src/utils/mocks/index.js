import { createServer } from 'miragejs';
import { authPhone } from 'utils/mocks/auth';

export default createServer({
  routes() {
    authPhone(this);
  },
});
