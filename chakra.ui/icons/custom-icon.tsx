import { Box, ChakraProps } from '@chakra-ui/react';
import { paths } from './paths';

type CustomIconProps = {
  icon: string;
  size: string;
  color?: string;
  stroke?: string;
};

export const CustomIcon: React.FC<CustomIconProps> = ({
  icon = 'add',
  size = '1.25rem',
  color,
  stroke,
  ...rest
}) => {
  const Icon: React.FC<CustomIconProps & ChakraProps> = ({
    color,
    size,
    icon,
    stroke,
    ...rest
  }) => {
    return (
      <Box
        as="svg"
        viewBox={paths[icon]?.viewBox}
        width={size}
        height={size}
        fill={color}
        stroke={stroke}
        {...rest}
      >
        {paths[icon]?.d.map((d: string, i: number) => (
          <path key={i} d={d} transform={paths[icon]?.transform} />
        ))}
      </Box>
    );
  };

  return (
    <Icon color={color} size={size} icon={icon} stroke={stroke} {...rest} />
  );
};
