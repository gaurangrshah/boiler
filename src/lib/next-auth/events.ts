import { debug as globalDebug, dev, wait } from '@/utils';
import { type NextAuthOptions } from 'next-auth';
import { onCreateuser } from './handlers/onCreateUser';
// @link: https://next-auth.js.org/configuration/options#events

const debug = globalDebug || false;

export const events: NextAuthOptions['events'] = {
  // @link: https://next-auth.js.org/configuration/options#events
  async signIn(message) {
    await wait(50);
    dev.log('event:signIn | message', message, debug);
  },
  async signOut(message) {
    await wait(50);
    dev.log('event:signOut | message', message, debug);
  },
  async createUser(message) {
    dev.log('event:createUser | message', message, debug);
    await onCreateuser({
      id: message?.user?.id,
      name: String(message?.user?.name),
      email: String(message?.user?.email),
    });
  },
  async updateUser(message) {
    await wait(50);
    dev.log('event:updateUser | message', message, debug);
  },
  async linkAccount(message) {
    dev.log('event:linkAccount| message', message, debug);

    if (!message.account && !message.user.name) {
      await wait(50);
      dev.error('event:linkAccount | no account or user.name found');
    }
  },
  async session(message) {
    dev.log('event:session | message', message, debug);
    await wait(50);
    dev.log('event:session - active');
  },
};
