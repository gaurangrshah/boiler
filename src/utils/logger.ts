import { debug as globalDebug, isProd } from '@/utils';

const debug: boolean = globalDebug || false;

const logColors = {
  red: '\x1b[31m%s\x1b[0m',
  green: '\x1b[32m%s\x1b[0m',
  yellow: '\x1b[33m%s\x1b[0m',
  blue: '\x1b[34m%s\x1b[0m',
  magenta: '\x1b[35m%s\x1b[0m',
  cyan: '\x1b[36m%s\x1b[0m',
};

export const dev = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log: (str: string, obj?: any, d?: boolean) => {
    if ((!debug && !d) || isProd) return;
    console.log(logColors.yellow, str, obj);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (str: string, obj?: any, d?: boolean) => {
    if ((!debug && !d) || isProd) return;
    console.warn(logColors.red, str, obj);
  },
};
