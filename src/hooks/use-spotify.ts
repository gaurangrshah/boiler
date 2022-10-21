import spotifyApi from '@/lib/spotify-web-api';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function useSpotify() {
  const { data: session } = useSession();
  const [spotifyUser, setspotifyUser] =
    useState<SpotifyApi.CurrentUsersProfileResponse | null>(null);

  useEffect(() => {
    if (spotifyUser) return;
    const fetchData = async () => {
      try {
        const { body: user } = await spotifyApi.getMe();
        setspotifyUser(user);
      } catch (error) {
        console.log('🚀 | file: use-spotify.ts | line 16 | error', error);
      }
    };

    void fetchData();

    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        void signIn();
      }

      spotifyApi.setAccessToken(String(session?.user?.accessToken));
    }
  }, [session, spotifyUser]);

  return { spotifyApi, spotifyUser };
}
