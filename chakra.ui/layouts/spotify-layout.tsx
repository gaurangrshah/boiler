import { SEOConfig } from '@/utils/seo/base';
import {
  ChakraProps,
  ContainerProps,
  Flex,
  FlexProps,
  Text,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import layout from '__data/layout.json';
import { Sidebar } from '.';
import { AvatarMenu, Bar, ModeToggle } from '../components';
import { ScrollSlide, transitionDown as variants } from '../framer';
import { MotionBox } from '../framer/motion';

type LayoutProps = {
  title: string;
  type?: string;
  subtitle?: string;
  description?: string;
  children: React.ReactNode;
};

const mainStyles: ChakraProps & ContainerProps & FlexProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  w: 'full',
  px: [4, null, 0],
  ml: 'auto',
  centerContent: true,
};

export const SpotifyLayout: React.FC<LayoutProps> = ({
  type = 'default',
  title = 'Site Title',
  subtitle = '',
  description = '',
  children,
}) => {
  const displayHeader = layout?.structure?.header.show !== 'false';
  const displayFooter = layout?.structure?.footer.show !== 'false';

  return (
    <Flex flexDirection="column">
      <NextSeo {...SEOConfig(title, subtitle, description)} />
      <ModeToggle />
      <AvatarMenu />
      {displayHeader && (
        <ScrollSlide dir="up" from="top">
          <Bar as="header" position="sticky" top={0}>
            <Text color="white" fontSize="2xl">
              Company Name
            </Text>
          </Bar>
        </ScrollSlide>
      )}
      <Sidebar />
      <MotionBox
        as="main"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        sx={mainStyles}
      >
        {children}
      </MotionBox>
      {displayFooter && (
        <ScrollSlide dir="down" from="bottom">
          <Bar as="footer" position="sticky" bottom={0} h="36" maxH={'200px'}>
            <Text color="white" fontSize="2xl">
              Company Name
            </Text>
          </Bar>
        </ScrollSlide>
      )}
    </Flex>
  );
};
