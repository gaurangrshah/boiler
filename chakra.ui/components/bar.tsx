import {
  Flex,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
} from '@chakra-ui/react';

export interface CustomBarProps extends HTMLChakraProps<'div'>, ThemingProps {}

export const Bar = forwardRef<CustomBarProps, 'div'>((props, ref) => {
  const { children, ...rest } = props;
  const styles = useStyleConfig('Bar', {});

  return (
    <Flex
      ref={ref}
      __css={styles}
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      {children}
    </Flex>
  );
});
