import { cancelRetry } from '@/utils/';
import { trpc } from '@/utils/trpc';
import { Box, chakra, VStack } from '@chakra-ui/react';
import { Track } from './track';

const mapTracks = (track: SpotifyApi.TrackObjectFull) => (
  <Track key={track.name} {...track} />
);

export const UserTopTracks: React.FC = (): JSX.Element => {
  const { data: topTracks } = trpc.spotify.myTopTracks.useQuery(undefined, {
    ...cancelRetry,
  });
  return (
    <Box
      p={4}
      w="50%"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
    >
      <Box as="header">
        <chakra.h2
          w="full"
          bg="white"
          fontSize="2xl"
          fontWeight={800}
          m={0}
          p={0}
        >
          Your Top Tracks
        </chakra.h2>
      </Box>
      <VStack w="full" align="flex-start" maxH={'675px'} overflowY="auto">
        {topTracks?.length && topTracks.map(mapTracks)}
      </VStack>
    </Box>
  );
};
