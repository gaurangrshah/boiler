// time helpers
export const ONE_SECOND = 1000;
export const ONE_MIN = 60 * ONE_SECOND;
export const ONE_HOUR = 60 * ONE_MIN;
export const ONE_DAY = 24 * ONE_HOUR;
// config settings
export const PORT = 3000;
export const ACCESS_TOKEN_EXPIRES_IN = 15;
export const REFRESH_TOKEN_EXPIRES_IN = 60;
export const REDIS_CACHE_EXPIRES_INT = 60;
// export const MAX_BATCH_SIZE = 10;

export const DEFAULT_STALE_TIME: number = 5 * ONE_SECOND; // 5secs

export const isBrowser = typeof window !== 'undefined';
