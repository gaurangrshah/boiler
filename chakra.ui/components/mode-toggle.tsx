import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';

export const ModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      size="lg"
      position="fixed"
      bottom="10em"
      right="4"
      onClick={toggleColorMode}
      border="1px solid"
      borderColor="text"
      aria-label="toggle dark mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      zIndex={10}
    />
  );
};
