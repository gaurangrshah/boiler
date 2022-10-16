import { Flex, FlexProps } from '@chakra-ui/react';

type ReactDefaultProps = {
  children: React.ReactNode;
};

export const Bar: React.FC<ReactDefaultProps & FlexProps> = ({
  children,
  ...rest
}) => {
  return (
    <Flex
      pos="relative"
      w="full"
      p={8}
      maxH="20"
      zIndex="tooltip"
      justify="space-between"
      align="center"
      bg="gray.900"
      {...rest}
    >
      {children}
    </Flex>
  );
};
