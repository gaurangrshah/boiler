import { millisToMinutesAndSeconds } from '@/utils';
import {
  Avatar,
  AvatarGroup,
  Box,
  chakra,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CustomIcon, useColor } from 'chakra.ui';
import Image from 'next/image';
import { truncate } from '../../utils/fns';
import { type Track as TrackType } from './user-top-tracks';

export const Track: React.FC<TrackType> = ({ ...track }): JSX.Element => {
  const { mode: textMode } = useColor('text-stat');
  const { mode: bgMode } = useColor('bg-panel');

  return (
    <HStack
      position="relative"
      w="full"
      h={48}
      p={6}
      gap={6}
      bg={bgMode}
      justify="flex-start"
      borderRadius="md"
      border="1px solid"
      borderColor="gray.100"
      color={textMode}
    >
      <Box borderRadius="md" boxShadow="md">
        <Image
          src={String(track?.album?.images[0]?.url)}
          alt={track.name}
          width="150px"
          height="150px"
        />
      </Box>
      <VStack w="full" align="flex-start">
        <chakra.h2 fontSize="xl" fontWeight={700} lineHeight="1.2">
          {track.name}
        </chakra.h2>
        <HStack w="full" justify="space-between">
          <VStack w="full" align="flex-start">
            <HStack align="center" justify="center">
              <CustomIcon
                icon="record"
                size="1em"
                color={String(textMode)}
                stroke="3px"
              />
              <chakra.p fontSize="sm" fontWeight={600}>
                {truncate(track.album.name, 22)}
              </chakra.p>
            </HStack>
            <HStack>
              <CustomIcon icon="clock" size="1em" color={String(textMode)} />
              <chakra.p>
                {millisToMinutesAndSeconds(track.duration_ms)}
              </chakra.p>
            </HStack>
            <HStack>
              <chakra.p>d:{track.audioFeatures?.danceability}</chakra.p>
              <chakra.p>e: {track.audioFeatures?.energy}</chakra.p>
              <chakra.p>t:{track.audioFeatures?.tempo}</chakra.p>
              <chakra.p>k: {track.audioFeatures?.key}</chakra.p>
            </HStack>
          </VStack>
          <ArtistAvatarGroup artists={track.artists} />
        </HStack>
      </VStack>
    </HStack>
  );
};

export const ArtistAvatarGroup: React.FC<{
  artists: TrackType['artists'];
}> = ({ artists }): JSX.Element => {
  return (
    <AvatarGroup size="md" max={3}>
      {artists.map((artist) => {
        const artistImage = artist?.details?.images[0]?.url;
        return (
          <Avatar
            key={artist.name}
            src={artistImage}
            name={artist.name}
            boxShadow="md"
          />
        );
      })}
    </AvatarGroup>
  );
};
