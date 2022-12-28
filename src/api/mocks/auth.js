import { Response } from 'miragejs';

// TODO: tutaj tez by się przydało brać endpointy z listy jak w reszcie miejsc
export const authPhone = (base) =>
  base.post('/auth/phone', () => new Response(200), { timing: 500 });

export const authCode = (base) =>
  base.post(
    '/auth/code',
    (req, res) => {
      console.log(res.requestBody);
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
