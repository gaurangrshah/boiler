import { debug as globalDebug, isDev } from './constants';
import { dev } from './logger';

const debug: boolean = globalDebug || (isDev && true);

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => null;

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

// const isObject = (item: unknown) => typeof item === 'object';

/**
 *
 *
 * @export
 * @template T
 * @param {(event: React.SyntheticEvent) => Promise<T>} promise
 * @return {*}
 */
export function onPromise<T>(
  // used to wrap react-hook-forms's submit handler
  // https://github.com/react-hook-form/react-hook-form/discussions/8020#discussioncomment-3429261
  promise: (event: React.SyntheticEvent) => Promise<T>
) {
  return (event: React.SyntheticEvent) => {
    if (promise) {
      promise(event).catch((error) => {
        dev.error('Unexpected error', error, debug);
      });
    }
  };
}

export const wait = (delay?: number) => {
  // https://appdividend.com/2022/06/10/javascript-wait/#:~:text=JavaScript%20wait%20To%20make%20your%20JavaScript%20code%20wait%2C,need%20to%20use%20the%20await%20keyword%20with%20it.
  return new Promise((r) => setTimeout(r, delay || 1000));
};

export function getUsernameFromEmail(
  email: string | null | undefined
): string | null {
  const splitEmail = email ? email.split('@')[0] : null;
  return splitEmail ?? null;
}

/**
 * @params {array} array - array of objects to flatten
 * @params {string} key - key to flatten on
 * @returns {array} - of objects
 */
export function flattenObjects<T, U>(arr: T[], key = 'label') {
  if (!arr?.length) throw new Error(`cannot flatten ${JSON.stringify(arr)}`);
  const object = arr?.reduce(
    // @ts-expect-error: item[key] - @TODO: implicit any - how to type?
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    (obj, item) => Object.assign(obj, { [item[key]]: item.value }),
    {}
  );
  return object as U;
}

export function truncateOnWord(str: string, limit: number): string {
  const trimmable =
    '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF';
  const reg = new RegExp('(?=[' + trimmable + '])');
  const words = str.split(reg);
  let count = 0;
  return (
    words
      .filter(function (word) {
        count += word.length;
        return count <= limit;
      })
      .join('') + '...'
  );
}

export function truncate(string: string, limit: number) {
  return string.length > limit ? truncateOnWord(string, limit) : string;
}
