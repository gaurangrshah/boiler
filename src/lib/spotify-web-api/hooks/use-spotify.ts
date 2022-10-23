import spotifyApi from '@/lib/spotify-web-api';
import { dev } from '@/utils';
import { trpc } from '@/utils/trpc';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function useSpotify() {
  const { data: session } = useSession();
  const { data: user } = trpc.spotify.me.useQuery(undefined, {
    enabled: !!session?.user?.accessToken,
    onSuccess: (): void =>
      dev.log('file: useSpotify | line 12 | spotifyuser', user),
  });

  useEffect(() => {
    if (session) {
      if (
        session.error === 'RefreshAccessTokenDenied' ||
        session.error === 'RefreshAccessTokenError'
      ) {
        dev.log('🎫 trpc refreshToken', null, true);
        spotifyApi.setAccessToken(String(session?.user?.accessToken));
        spotifyApi.setRefreshToken(String(session?.user?.refreshToken));
        if (session?.user?.accessToken) {
          spotifyApi.refreshAccessToken().then(console.log).catch(console.log);
        }
      }
    }
  }, [session]);

  return { spotifyApi, spotifyUser: user };
}
