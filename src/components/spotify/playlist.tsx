import {
  Avatar,
  Box,
  chakra,
  Container,
  Flex,
  HStack,
  Link,
} from '@chakra-ui/react';
import Image from 'next/image';

export const Playlist = ({
  playlist,
}: {
  playlist: Partial<SpotifyApi.PlaylistObjectSimplified>;
}) => {
  if (!playlist) return <></>;
  return (
    <Container
      w="full"
      py={4}
      maxW="container.lg"
      border="1px solid"
      bg="bg-panel"
      // borderColor="brand.200"
      borderColor="panel-border"
      borderRadius="md"
    >
      <Link href={playlist?.external_urls?.spotify} isExternal>
        <HStack w="full" border="Background" _hover={{ cursor: 'pointer' }}>
          <Box position="relative">
            {playlist &&
              playlist?.images?.length &&
              playlist?.images[0] &&
              playlist?.images[0].url && (
                <Image
                  src={playlist?.images[0]?.url || ''}
                  width="200px"
                  height="200px"
                  alt={playlist.name}
                />
              )}
            {playlist?.tracks?.total ? (
              <Flex
                position="absolute"
                top={4}
                right={4}
                bg="bg-panel"
                borderRadius="full"
                width={16}
                height={16}
                direction="column"
                align="center"
                justify="center"
              >
                <chakra.h4 mt={2} lineHeight={0.5}>
                  {playlist.tracks.total}
                </chakra.h4>
                <chakra.p>tracks</chakra.p>
              </Flex>
            ) : null}
          </Box>
          <Flex direction="column" pl={4} gap={4} w="full">
            <chakra.h2>{playlist.name}</chakra.h2>
            <chakra.p>{playlist.description}</chakra.p>
            <HStack mt={9} justify="flex-end">
              {!!playlist?.owner?.display_name &&
                playlist?.owner?.display_name !== 'undefined' && (
                  <HStack p={2} border="ActiveBorder">
                    <Avatar size="md" name={playlist?.owner?.display_name} />
                    <chakra.p textStyle="title">
                      {playlist?.owner?.display_name}
                    </chakra.p>
                  </HStack>
                )}
            </HStack>
          </Flex>
        </HStack>
      </Link>
    </Container>
  );
};
