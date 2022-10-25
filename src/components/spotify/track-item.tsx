import { millisToMinutesAndSeconds } from '@/utils';
import {
  Avatar,
  AvatarGroup,
  Box,
  chakra,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CustomIcon } from 'chakra.ui';
import Image from 'next/image';
import { truncate } from '../../utils/fns';
import { type TrackType } from './user-top-tracks';

export const TrackItem: React.FC<TrackType> = ({ ...track }): JSX.Element => {
  return (
    <HStack
      h={48}
      p={6}
      gap={6}
      justify="flex-start"
      bg="bg-panel"
      layerStyle="widget-panel"
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
        <chakra.h2 textStyle="title">{track.name}</chakra.h2>
        <HStack w="full" justify="space-between">
          <VStack w="full" align="flex-start">
            <HStack layerStyle="flex-center" color="text">
              <CustomIcon icon="record" size="1.35em" color="gray.300" />
              <chakra.p textStyle="stat">
                {truncate(track.album.name, 22)}
              </chakra.p>
            </HStack>
            <HStack>
              <CustomIcon icon="clock" size="1.35em" color="gray.300" />
              <chakra.p textStyle="stat">
                {millisToMinutesAndSeconds(track.duration_ms)}
              </chakra.p>
            </HStack>
            <TrackStats {...track} />
          </VStack>
          <ArtistAvatarGroup artists={track.artists} />
        </HStack>
      </VStack>
    </HStack>
  );
};

export const TrackStats: React.FC<TrackType> = ({
  audioFeatures,
}): JSX.Element => {
  return (
    <HStack>
      <chakra.p textStyle="stat">🪩: {audioFeatures?.danceability}</chakra.p>
      <chakra.p textStyle="stat">⚡️: {audioFeatures?.energy}</chakra.p>
      <chakra.p textStyle="stat">t: {audioFeatures?.tempo}</chakra.p>
      <chakra.p textStyle="stat">🎹: {audioFeatures?.key}</chakra.p>
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
