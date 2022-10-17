import {
  Drawer as ChDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { useRef } from 'react';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onOpen?: () => void;
  Header?: React.ElementType; // throws an error with ReactNode
  Footer?: React.ElementType; // throws an error with ReactNode
};

export const Drawer = ({
  isOpen,
  // onOpen, // open onClick should be handled from parent.
  onClose,
  Header,
  Footer,
  children,
}: DrawerProps) => {
  const btnRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <ChDrawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton size="sm" />
            {Header && (
              <DrawerHeader>
                <Header />
              </DrawerHeader>
            )}

            <DrawerBody>{children}</DrawerBody>
            {Footer && (
              <DrawerFooter>
                <Footer />
              </DrawerFooter>
            )}
          </DrawerContent>
        </DrawerOverlay>
      </ChDrawer>
    </>
  );
};
