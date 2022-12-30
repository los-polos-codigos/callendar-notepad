// TODO: WYMAGANIA
// 1. dodawać automatycznie tokeny do żądań
// 2. jeśli żądanie nie przeszło bo dany token wygasł zrobić refresh token zapisać nowy tokeny oraz powtóżyć żądanie
// 3. doklejanie baseURL do żądań

// 4. czy powinniśmy łapac błędy związane z api globalnie ? NIE, to może już gdzie indziej

// eslint-disable-next-line import/no-unresolved
import { REACT_APP_BASE_API, REACT_APP_MOCKED } from '@env';
import axios from 'axios';

const baseRequest = async (type, url, headers, body, accessToken) =>
  axios({
    method: type,
    url,
    body,
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

// eslint-disable-next-line default-param-last
export const request = async (type = 'get', url, body, headers) => {
  const fullUrl = REACT_APP_MOCKED ? url : `${REACT_APP_BASE_API || ''}${url}`;

  // TODO: załużmy że to tutaj pobieramy z asyncStorage
  const accessToken = 'access-token';
  const refreshToken = 'refresh-token';

  try {
    console.log('1');
    const response = await baseRequest(type, fullUrl, headers, body, accessToken);

    console.log('request!');
    console.log(response.ok);

    // if (!response.ok) throw new Error('');
    //
    // console.log('przechodzi tutaj');

    return response.data;
  } catch (err) {
    if (err.response.status !== 403) {
      console.log('tatauj bład');
      throw Error(err);
    }

    try {
      // TODO:  dodać w przyszłości z pliku URL - oraz dodać base
      const responseRefresh = await baseRequest('post', '/auth/refreshToken', {}, { refreshToken });

      // TODO: tutaj wgrywamy nowe tokeny

      try {
        const response2 = await baseRequest(type, fullUrl, headers, body, accessToken);

        return response2.data;
      } catch (errSecondRequest) {
        throw Error(errSecondRequest);
      }
    } catch (errRefreshToken) {
      console.log(errRefreshToken);
      // ODŚWIEZENIE TOKENU NIE POWIODŁO SIE - wylogowanie użytkownika
    }
  }
};
