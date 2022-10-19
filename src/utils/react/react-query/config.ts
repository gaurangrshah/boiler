import { ONE_DAY, ONE_MIN } from '@/utils';

export const cancelRetry = {
  staleTime: ONE_DAY,
  retry: false,
  retryOnMount: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  refetchInterval: 6 * ONE_MIN,
};
