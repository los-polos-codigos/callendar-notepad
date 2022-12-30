import { Response } from 'miragejs';
import { endpoints } from 'api/endpoints';

// TODO: tutaj tez by się przydało brać endpointy z listy jak w reszcie miejsc
export const authPhone = (base) =>
  base.post('/auth/phone', () => new Response(200), { timing: 500 });

export const authCode = (base) =>
  base.post(
    endpoints.AUTH_CODE,
    (req, res) => {
      console.log(res.requestBody);
      return new Response(
        500,
        {},
        // {
        //   isUserAlreadyExist: true,
        //   accessToken: 'access-token',
        //   refreshToken: 'refresh-token',
        // }
        { errors: ['The database went on vacation'] }
      );
    },
    { timing: 500 }
  );

export const authTest = (base) =>
  base.get(
    '/auth/test',
    (req, res) => {
      console.log(res);
      return new Response(
        200,
        {},
        {
          userId: 1234,
          isUserAlreadyExist: true,
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        }
      );
    },
    { timing: 500 }
  );

export const tokenVerify = (base) =>
  base.get(
    '/token/verify',
    () =>
      new Response(
        200,
        {},
        {
          userId: 1234,
          isUserAlreadyExist: true,
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        }
      )
  );

export const authTestFail = (base) =>
  base.get('/auth/testFail', (req, res) => new Response(403), { timing: 500 });

export const authRefreshToken = (base) =>
  base.post(
    '/auth/refreshToken',
    (req, res) =>
      new Response(
        200,
        {},
        {
          accessToken: '123',
          refreshToken: '456',
        }
      ),
    { timing: 500 }
  );

export const authTestPass = (base) =>
  base.get('/auth/testPass', (req, res) => new Response(200), { timing: 500 });
