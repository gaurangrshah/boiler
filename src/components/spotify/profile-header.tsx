import {
  Avatar,
  Badge,
  chakra,
  HStack,
  Link as ChLink,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const ChNextLink = chakra(Link);

export const ProfileHeader: React.FC<{
  user: SpotifyApi.CurrentUsersProfileResponse | null | undefined;
}> = ({ user }): JSX.Element => {
  return (
    <VStack
      w="full"
      h="30vh"
      layerStyle="flex-center"
      bgGradient="linear(to-b, bg-panel, transparent)"
    >
      {user && user?.images && (
        <>
          <Avatar src={String(user?.images[0]?.url)} size="2xl" />
          <ChNextLink
            as={ChLink}
            href={`https://open.spotify.com/user/${String(user?.display_name)}`}
            isExternal
          >
            <chakra.h1>{user?.display_name}</chakra.h1>
          </ChNextLink>
          <HStack gap={3}>
            <Badge p={1} borderRadius="md" size="lg" colorScheme="orange">
              {user?.followers?.total} followers
            </Badge>
            <chakra.p>|</chakra.p>
            <Badge p={1} borderRadius="md" size="lg" colorScheme="facebook">
              #following
            </Badge>
            <chakra.p>|</chakra.p>
            <Badge p={1} borderRadius="md" size="lg" colorScheme="whatsapp">
              {' '}
              #public playlists
            </Badge>
          </HStack>
        </>
      )}
    </VStack>
  );
};
