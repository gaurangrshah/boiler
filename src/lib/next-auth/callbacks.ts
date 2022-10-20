import { PrismaUser } from '@/types/zod/prisma';
import { debug as globalDebug, dev, omit } from '@/utils';
import NextAuth, { type CallbacksOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

const debug: boolean = globalDebug || false;
// @TODO: add jwt handling from: https://tinyurl.com/2brculyw
// @TODO: integrate spotify web api
/**
 * Next Auth Callbacks
 * Order of operation: [redirect => signIn => jwt => session]
 */

export const redirectCallback: CallbacksOptions['redirect'] = ({
  url,
  baseUrl,
}) => {
  dev.log('callback:redirect', { url, baseUrl }, debug);

  return baseUrl;
};

export const jwtCallback: CallbacksOptions['jwt'] = ({
  token,
  account,
  user,
  profile,
  isNewUser,
}) => {
  dev.log('callback:jwt', { token, user, account, profile, isNewUser }, debug);

  const _user = omit(user as PrismaUser, 'password');
  user && (token.user = _user);

  if (isNewUser) {
    token.isNewUser = true;
  }
  return token;
};

export const signInCallback: CallbacksOptions['signIn'] = ({
  user,
  account,
  profile,
  email,
  credentials,
}) => {
  dev.log(
    'callback:signin',
    { user, account, profile, email, credentials },
    debug
  );

  if (!email?.verificationRequest) {
    // @TODO: add logic to ensure a verification message is shown, and should ideally block login
  } else if (!(user as PrismaUser)?.isActive) {
    //
  }
  return true;
};

export const sessionCallback: CallbacksOptions['session'] = ({
  session,
  user,
}) => {
  dev.log('callback:session', { session, user }, debug);
  if (session.user) {
    session.user.id = user.id;
    session.user = omit(session.user, 'password') as PrismaUser;
  }
  dev.log('callback:session | session-omit-pw', session, debug);
  return session;
};
