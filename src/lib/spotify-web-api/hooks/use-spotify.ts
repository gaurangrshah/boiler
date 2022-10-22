import spotifyApi from '@/lib/spotify-web-api';
import { dev } from '@/utils';
import { trpc } from '@/utils/trpc';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function useSpotify() {
  const { data: session } = useSession();
  const { data: user } = trpc.spotify.me.useQuery(undefined, {
    enabled: !!session?.user?.accessToken,
    onSuccess: (): void => dev.log('file: useSpotify | line 12 | spotifyuser', user),
  });

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        void signIn();
      }

      spotifyApi.setAccessToken(String(session?.user?.accessToken));
    }
  }, [session]);

  return { spotifyApi, spotifyUser: user };
}
