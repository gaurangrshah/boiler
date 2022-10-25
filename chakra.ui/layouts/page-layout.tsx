import { SEOConfig } from '@/utils/seo/base';
import {
  ChakraProps,
  ContainerProps,
  Flex,
  FlexProps,
  Text,
} from '@chakra-ui/react';
import { transitionDown as variants, ScrollSlide } from '../framer';
import { MotionContainer } from '../framer/motion';
import { NextSeo } from 'next-seo';
import layout from '__data/layout.json';
import { AvatarMenu, Bar, ModeToggle } from '../components';
import { Sidebar } from '.';

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
  maxW: 'container.lg',
  px: [4, null, 0],
  ml: 'auto',
  centerContent: true,
};

export const PageLayout: React.FC<LayoutProps> = ({
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
      <MotionContainer
        as="main"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        sx={mainStyles}
      >
        {children}
      </MotionContainer>
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
