import { millisToMinutesAndSeconds } from '@/utils';
import { Box, chakra, HStack } from '@chakra-ui/react';
import Image from 'next/image';

export const Track: React.FC<SpotifyApi.TrackObjectFull> = ({
  ...track
}): JSX.Element => {
  return (
    <HStack
      position="relative"
      w="full"
      h={36}
      p={6}
      gap={1}
      bg="brand.50"
      justify="flex-start"
      borderRadius="md"
    >
      <Box borderRadius="md" boxShadow="md">
        <Image
          src={String(track?.album?.images[0]?.url)}
          alt={track.name}
          width="150px"
          height="150px"
        />
      </Box>
      <Box w="full">
        <chakra.h2 fontSize="xl" fontWeight={700}>
          {track.name}
        </chakra.h2>
        <chakra.p fontSize="md">
          {track.artists.map((artist) => artist.name).join(', ')}
        </chakra.p>
        <chakra.p fontSize="sm" fontWeight={600}>
          {track.album.name}
        </chakra.p>
        <chakra.p>{millisToMinutesAndSeconds(track.duration_ms)}</chakra.p>
      </Box>
    </HStack>
  );
};
