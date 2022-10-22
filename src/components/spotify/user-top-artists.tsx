import { cancelRetry } from '@/utils/';
import { trpc } from '@/utils/trpc';
import { chakra, VStack } from '@chakra-ui/react';

export const UserTopArtists: React.FC = (): JSX.Element => {
  const { data: topArtists } = trpc.spotify.myTopArtists.useQuery(undefined, {
    ...cancelRetry,
  });
  return (
    <VStack w="full" alignItems="flex-start" border="1px solid" p={4}>
      <chakra.h2 textAlign="center" fontSize="2xl" fontWeight={800}>
        Your Top Artists
      </chakra.h2>
      {topArtists?.length &&
        topArtists?.map((artist) => <p key={artist.name}>{artist.name}</p>)}
    </VStack>
  );
};
