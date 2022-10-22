import { debug as globalDebug, dev } from '@/utils';
import { JWT } from 'next-auth/jwt';
import spotifyApi from './index';

const debug: boolean = globalDebug || true;
export interface JWTWithTokens extends JWT {
  accessToken: string;
  refreshToken: string;
  username: string;
}

export async function refreshAccessToken(token: JWTWithTokens | JWT) {
  console.log('🎟 refreshing accessToken', token, debug);
  try {
    spotifyApi.setAccessToken(String(token?.accessToken));
    spotifyApi.setRefreshToken(String(token?.refreshToken));

    const { body } = await spotifyApi.refreshAccessToken();
    dev.log('🎫 refreshed token', body, debug);

    return {
      ...token,
      accessToken: body.access_token,
      accessTokenExpires: body.expires_in * 1000,
      refreshToken: body.refresh_token ?? token.refreshToken,
      //replace if new one came back else fall back to old refresh token
    };
  } catch (error) {
    dev.error('🔴 refreshAccessToken:error', error, debug);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
