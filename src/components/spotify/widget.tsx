import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
} from '@chakra-ui/react';

export interface CustomWidgetProps
  extends HTMLChakraProps<'div'>,
    ThemingProps {}

export const Widget = forwardRef<CustomWidgetProps, 'div'>((props, ref) => {
  const { children, title, ...rest } = props;
  const styles = useStyleConfig('Widget', {});

  return (
    <chakra.div ref={ref} __css={styles} {...rest}>
      <chakra.header>
        <chakra.h2 w="full">{title}</chakra.h2>
      </chakra.header>
      {children}
    </chakra.div>
  );
});
