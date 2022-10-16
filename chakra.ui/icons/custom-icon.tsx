import { Box, ChakraProps } from '@chakra-ui/react';
import { paths } from './paths';

type CustomIconProps = {
  icon: string;
  size: string;
  color: string;
};

export const CustomIcon: React.FC<CustomIconProps> = ({
  icon = 'add',
  size = '1.25rem',
  color = 'inherit',
  ...rest
}) => {
  const Icon: React.FC<CustomIconProps & ChakraProps> = ({
    color,
    size,
    icon,
    ...rest
  }) => {
    return (
      <Box
        as="svg"
        viewBox={paths[icon]?.viewBox}
        width={size}
        height={size}
        fill={color}
        {...rest}
      >
        {paths[icon]?.d.map((d: string, i: number) => (
          <path key={i} d={d} />
        ))}
      </Box>
    );
  };

  return <Icon color={color} size={size} icon={icon} {...rest} />;
};
