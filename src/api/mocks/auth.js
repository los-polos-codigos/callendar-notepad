import { Response } from 'miragejs';
import { endpoints } from 'api/endpoints';

export const authPhone = (base) =>
  base.post(endpoints.AUTH_PHONE, () => new Response(200), { timing: 500 });

export const authCode = (base) =>
  base.post(
    endpoints.AUTH_CODE,
    () =>
      new Response(
        200,
        {},
        {
          isUserAlreadyExist: true,
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        }
      ),
    { timing: 500 }
  );

export const tokenVerify = (base) => base.get(endpoints.TOKEN_VERIFY, () => new Response(200));
