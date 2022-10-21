import { dev } from '@/utils';
import { JWT } from 'next-auth/jwt';
import spotifyApi from './index';

interface JWTWithTokens extends JWT {
  accessToken: string;
  refreshToken: string;
  username: string;
}

export async function refreshAccessToken(token: JWTWithTokens | JWT) {
  try {
    spotifyApi.setAccessToken(String(token?.accessToken));
    spotifyApi.setRefreshToken(String(token?.refreshToken));

    const { body } = await spotifyApi.refreshAccessToken();
    dev.log('refreshed token', body);

    return {
      ...token,
      accessToken: body.access_token,
      accessTokenExpires: body.expires_in * 1000,
      refreshToken: body.refresh_token ?? token.refreshToken,
      //replace if new one came back else fall back to old refresh token
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
