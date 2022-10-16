import { chakra, ChakraProps } from '@chakra-ui/react';
import Image, { ImageProps } from 'next/image';

export const ChakraNextImage = chakra(Image, {
  shouldForwardProp: (prop) => {
    return ['width', 'height', 'src', 'alt', 'layout'].includes(prop);
  },
});

type ChNextImageProps = ImageProps & ChakraProps;

export const ChImage: React.FC<ChNextImageProps> = (
  props: ChNextImageProps
) => {
  return <ChakraNextImage {...props} />;
};
