import { onPromise } from '@/utils';
import {
  Avatar,
  Box,
  chakra,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const defaultLinks = [
  { label: 'home', href: '/' },
  { label: 'profile', href: '/me' },
];

const ChNextLink = chakra(Link);

export function AvatarMenu() {
  const { data: session, status } = useSession();
  const handleSignOut = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await signOut();
  };

  const handleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await signIn('spotify');
  };

  return (
    <Box pos="fixed" top={6} right={6} zIndex="docked">
      <Menu placement="bottom-end" boundary="scrollParent" closeOnSelect>
        {status !== 'loading' ? (
          <MenuButton
            as={Avatar}
            name={session?.user?.email ?? ''}
            src={session?.user?.image ?? ''}
            _hover={{ cursor: 'pointer', border: 'lg' }}
            loading="lazy"
            outline="2px solid"
            outlineColor="brand.400"
          />
        ) : (
          <Spinner />
        )}
        <MenuList border="lg">
          {!session ? (
            <>
              <MenuItem onClick={onPromise(handleSignIn)}>Sign in</MenuItem>
              <MenuItem>
                <ChNextLink href="/auth/register">Sign up</ChNextLink>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem w="full">
                <ChNextLink href="/admin">Admin</ChNextLink>
              </MenuItem>
              <MenuItem onClick={onPromise(handleSignOut)}>Sign Out</MenuItem>
            </>
          )}
          <hr />
          <>
            {defaultLinks.map((link) => (
              <MenuItem key={link.href}>
                <ChNextLink href={link.href}>{link.label}</ChNextLink>
              </MenuItem>
            ))}
          </>
        </MenuList>
      </Menu>
    </Box>
  );
}
