import { cancelRetry } from '@/utils/';
import { trpc } from '@/utils/trpc';
import { Box, chakra, VStack } from '@chakra-ui/react';
import { Artist } from './artist';

const mapArtists = (artist: SpotifyApi.ArtistObjectFull) => (
  <Artist key={artist.name} {...artist} />
);

export const UserTopArtists: React.FC = (): JSX.Element => {
  const { data: topArtists } = trpc.spotify.myTopArtists.useQuery(undefined, {
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
          Your Top Artists
        </chakra.h2>
      </Box>
      <VStack w="full" alignItems="flex-start" maxH={'675px'} overflowY="auto">
        {topArtists?.length && topArtists?.map(mapArtists)}
      </VStack>
    </Box>
  );
};
