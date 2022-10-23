import { convertToShortString } from '@/utils';
import { Avatar, Badge, Box, chakra, HStack } from '@chakra-ui/react';

type BadgeColorSchemes =
  | 'whiteAlpha'
  | 'blackAlpha'
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'cyan'
  | 'purple'
  | 'pink'
  | 'linkedin'
  | 'facebook'
  | 'messenger'
  | 'whatsapp'
  | 'twitter'
  | 'telegram';

const colorSchemes: BadgeColorSchemes[] = [
  // 'whiteAlpha',
  // 'blackAlpha',
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
  'linkedin',
  'facebook',
  'messenger',
  'whatsapp',
  'twitter',
  'telegram',
];

const mapGenres = (genre: string, i: number) => {
  return (
    <Badge key={genre} borderRadius="md" colorScheme={colorSchemes[i]}>
      {genre}
    </Badge>
  );
};

export const Artist: React.FC<SpotifyApi.ArtistObjectFull> = ({
  ...artist
}): JSX.Element => {
  artist.genres.length = 3;
  return (
    <HStack
      w="full"
      px={2}
      py={4}
      border="1px solid"
      borderRadius="md"
      borderColor="gray.200"
    >
      <Avatar name={artist.name} src={String(artist?.images[0]?.url)} />
      <Box>
        <HStack>
          <chakra.p fontSize="md" fontWeight={700}>
            {artist.name}
          </chakra.p>
          <chakra.p>{convertToShortString(artist.followers.total)}</chakra.p>
        </HStack>
        <HStack gap={1}>{artist.genres.map(mapGenres)}</HStack>
      </Box>
    </HStack>
  );
};
