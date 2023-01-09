// eslint-disable-next-line import/no-unresolved
import { REACT_APP_BASE_API, REACT_APP_MOCKED } from '@env';
import axios from 'axios';
import { store } from 'core/store';
import { endpoints } from 'api/endpoints';
import { authActions } from 'core/auth/reducers';

const baseRequest = async (type, url, headers, body, accessToken) =>
  axios({
    method: type,
    url,
    data: body,
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

// eslint-disable-next-line default-param-last
export const request = async (type = 'get', url, body, headers) => {
  const fullUrl = REACT_APP_MOCKED === 'true' ? url : `${REACT_APP_BASE_API || ''}${url}`;

  const { accessToken, refreshToken } = store.getState().auth;

  try {
    const response = await baseRequest(type, fullUrl, headers, body, accessToken);

    return response.data;
  } catch (err) {
    if (err.response.status !== 403) throw err;

    try {
      const responseRefresh = await baseRequest(
        'post',
        `${REACT_APP_BASE_API || ''}${endpoints.TOKEN_REFRESH}`,
        {},
        { refreshToken }
      );

      store.dispatch(authActions.setNewTokens({ ...responseRefresh.data }));

      const response2 = await baseRequest(type, fullUrl, headers, body, accessToken);

      return response2.data;
    } catch (errRefreshToken) {
      store.dispatch(authActions.logout());
      throw errRefreshToken;
    }
  }
};
