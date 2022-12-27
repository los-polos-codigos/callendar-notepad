import { Response } from 'miragejs';

export const authPhone = (base) =>
  base.post('/auth/phone', () => new Response(200), { timing: 500 });
