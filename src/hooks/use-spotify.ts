import spotifyApi from '@/lib/spotify-web-api';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        signIn();
      }

      // eslint-disable-next-line
      spotifyApi.setAccessToken(String(session?.user?.accessToken));
    }
  }, [session]);
  return spotifyApi;
}
export default useSpotify;
